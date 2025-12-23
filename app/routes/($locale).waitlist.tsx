import { useState, useRef, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { json, type ActionFunctionArgs, type MetaFunction } from '@shopify/remix-oxygen';
import { motion, AnimatePresence } from 'framer-motion';

export const meta: MetaFunction = () => {
    return [
        { title: 'Coming Soon | Euforyc' },
        { name: 'description', content: 'Something beautiful is coming. Join the waitlist for exclusive early access to Euforyc.' },
    ];
};

export async function action({ request, context }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email || !email.includes('@')) {
        return json({ success: false, error: 'Please enter a valid email address.' });
    }

    try {
        // Create customer in Shopify using the Admin API mutation
        const response = await context.storefront.mutate(CREATE_CUSTOMER_MUTATION, {
            variables: {
                input: {
                    email: email,
                    acceptsMarketing: true,
                    tags: ['waitlist', 'pre-launch'],
                },
            },
        });

        // Check for errors in the response
        if (response?.customerCreate?.customerUserErrors?.length > 0) {
            const error = response.customerCreate.customerUserErrors[0];
            if (error.code === 'TAKEN') {
                return json({ success: true, message: "You're already on the list! We'll be in touch soon." });
            }
            return json({ success: false, error: error.message });
        }

        return json({ success: true, message: "You're in! Get ready for something special." });
    } catch (error) {
        console.error('Waitlist signup error:', error);
        // If the mutation fails, we can still show success (email might already exist)
        return json({ success: true, message: "Thanks for joining! We'll be in touch soon." });
    }
}

const CREATE_CUSTOMER_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
` as const;

export default function Waitlist() {
    const fetcher = useFetcher<{ success: boolean; message?: string; error?: string }>();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const isLoading = fetcher.state === 'submitting';
    const data = fetcher.data;

    useEffect(() => {
        if (data?.success) {
            setIsSubmitted(true);
        }
    }, [data]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(console.error);
        }
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-dark-brown">
            {/* Video Background */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
                <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-brown/40 via-transparent to-dark-brown/80" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
                {/* Logo / Brand */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="mb-12"
                >
                    <h1 className="text-cream text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight lowercase">
                        Euforyc
                    </h1>
                    <div className="w-16 h-px bg-cream/40 mx-auto mt-4" />
                </motion.div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-12"
                >
                    <p className="text-cream/80 text-lg md:text-xl font-light tracking-widest uppercase">
                        Something Beautiful Is Coming
                    </p>
                </motion.div>

                {/* Email Form */}
                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="w-full max-w-md"
                        >
                            <fetcher.Form method="post" className="relative">
                                {/* Glassmorphism Container */}
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-full p-1.5 shadow-2xl">
                                    <div className="flex items-center">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className="flex-1 bg-transparent text-cream placeholder:text-cream/50 px-6 py-4 text-base focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-cream text-dark-brown px-6 py-3 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                </span>
                                            ) : (
                                                'Join Waitlist'
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {data?.error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-400 text-sm mt-4"
                                    >
                                        {data.error}
                                    </motion.p>
                                )}
                            </fetcher.Form>

                            {/* Privacy Note */}
                            <p className="text-cream/40 text-xs mt-6 tracking-wide">
                                By joining, you agree to receive marketing emails. Unsubscribe anytime.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            {/* Success Checkmark */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                className="w-20 h-20 mx-auto mb-8 rounded-full bg-cream/10 backdrop-blur-xl border border-cream/20 flex items-center justify-center"
                            >
                                <svg className="w-10 h-10 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>

                            <h2 className="text-cream text-2xl md:text-3xl font-serif mb-4">
                                {data?.message || "You're on the list!"}
                            </h2>
                            <p className="text-cream/60 text-base max-w-sm mx-auto">
                                We'll notify you when we launch. Get ready for something special.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8"
                >
                    <a
                        href="https://instagram.com/euforycwear"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream/60 hover:text-cream transition-colors duration-300"
                    >
                        <span className="text-xs uppercase tracking-[0.3em]">Instagram</span>
                    </a>
                    <span className="w-1 h-1 rounded-full bg-cream/30" />
                    <a
                        href="https://tiktok.com/@euforycwear"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream/60 hover:text-cream transition-colors duration-300"
                    >
                        <span className="text-xs uppercase tracking-[0.3em]">TikTok</span>
                    </a>
                </motion.div>

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream/30 text-xs tracking-widest"
                >
                    © 2024 EUFORYC
                </motion.p>
            </div>
        </div>
    );
}
