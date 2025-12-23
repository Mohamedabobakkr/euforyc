import { json, type ActionFunctionArgs } from '@shopify/remix-oxygen';

// Simple in-memory rate limiting (per IP)
// In production, consider using a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // Per 60 seconds

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return true;
    }

    record.count++;
    return false;
}

// Email validation with proper regex
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Sanitize email input
function sanitizeEmail(email: string): string {
    return email.trim().toLowerCase().slice(0, 254);
}

export async function action({ request, context }: ActionFunctionArgs) {
    // Only allow POST requests
    if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, { status: 405 });
    }

    // Get client IP for rate limiting
    const clientIP =
        request.headers.get('CF-Connecting-IP') ||
        request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
        request.headers.get('X-Real-IP') ||
        'unknown';

    // Check rate limit
    if (isRateLimited(clientIP)) {
        console.warn('Rate limit exceeded for IP:', clientIP);
        return json(
            { error: 'Too many requests. Please try again in a minute.' },
            { status: 429 },
        );
    }

    try {
        const formData = await request.formData();
        const rawEmail = formData.get('email');

        // Type check and validate email
        if (typeof rawEmail !== 'string' || !rawEmail) {
            return json({ error: 'Please enter a valid email address' }, { status: 400 });
        }

        const email = sanitizeEmail(rawEmail);

        // Validate email format
        if (!isValidEmail(email)) {
            return json({ error: 'Please enter a valid email address' }, { status: 400 });
        }

        // Get Klaviyo credentials from environment (server-side only)
        const klaviyoApiKey = context.env.KLAVIYO_PRIVATE_API_KEY;
        const listId = context.env.KLAVIYO_LIST_ID;

        if (!klaviyoApiKey || !listId) {
            console.error('Klaviyo credentials not configured');
            return json(
                { error: 'Waitlist is temporarily unavailable' },
                { status: 500 },
            );
        }

        // Step 1: Create the profile using the Profiles API
        const createProfileResponse = await fetch(
            'https://a.klaviyo.com/api/profiles/',
            {
                method: 'POST',
                headers: {
                    Authorization: `Klaviyo-API-Key ${klaviyoApiKey}`,
                    accept: 'application/json',
                    'content-type': 'application/json',
                    revision: '2024-10-15',
                },
                body: JSON.stringify({
                    data: {
                        type: 'profile',
                        attributes: {
                            email: email,
                            properties: {
                                source: 'Euforyc Coming Soon Waitlist',
                                signed_up_at: new Date().toISOString(),
                            },
                        },
                    },
                }),
            },
        );

        let profileId: string | null = null;

        if (createProfileResponse.status === 201) {
            // Profile created successfully
            const profileData = await createProfileResponse.json();
            profileId = profileData.data?.id;
            // Only log non-sensitive info in production
            if (process.env.NODE_ENV === 'development') {
                console.log('Created new profile ID:', profileId);
            }
        } else if (createProfileResponse.status === 409) {
            // Profile already exists - get the profile ID from the response
            const conflictData = await createProfileResponse.json();
            profileId = conflictData.errors?.[0]?.meta?.duplicate_profile_id;
            // Already subscribed is still a success from user perspective
        } else {
            const errorText = await createProfileResponse.text();
            console.error(
                'Failed to create profile:',
                createProfileResponse.status,
                // Don't log full error in production
                process.env.NODE_ENV === 'development' ? errorText : '[redacted]',
            );
            return json(
                { error: 'Failed to join waitlist. Please try again.' },
                { status: 500 },
            );
        }

        // Step 2: Add profile to the list
        if (profileId && listId) {
            const addToListResponse = await fetch(
                `https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Klaviyo-API-Key ${klaviyoApiKey}`,
                        accept: 'application/json',
                        'content-type': 'application/json',
                        revision: '2024-10-15',
                    },
                    body: JSON.stringify({
                        data: [
                            {
                                type: 'profile',
                                id: profileId,
                            },
                        ],
                    }),
                },
            );

            if (!addToListResponse.ok && addToListResponse.status !== 204) {
                // Log warning but don't fail - profile was still created
                console.warn(
                    'Could not add to list:',
                    addToListResponse.status,
                );
            }
        }

        return json({ success: true, message: "You're on the list!" });
    } catch (error) {
        console.error('Waitlist error:', error instanceof Error ? error.message : 'Unknown error');
        return json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 },
        );
    }
}

// Loader to handle non-POST requests
export async function loader() {
    return json({ error: 'Method not allowed' }, { status: 405 });
}
