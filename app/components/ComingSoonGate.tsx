import { useState, useRef, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ComingSoonGate - A full-screen coming soon page that blocks access to the entire site.
 * This component should be rendered at the root level to prevent users from accessing
 * any part of the store before launch.
 */
export function ComingSoonGate() {
    const fetcher = useFetcher<{ success: boolean; message?: string; error?: string }>();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [wantsSms, setWantsSms] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const isLoading = fetcher.state === 'submitting';
    const data = fetcher.data;

    // Detect mobile/desktop based on screen aspect ratio
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerHeight > window.innerWidth);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (data?.success) {
            setIsSubmitted(true);
        }
    }, [data]);

    // Play video when user signs up
    useEffect(() => {
        if (isSubmitted && videoRef.current) {
            videoRef.current.play().catch(console.error);
        }
    }, [isSubmitted]);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-dark-brown z-[9999]">
            {/* Video Background - Only shows after signup */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                    opacity: isSubmitted ? 0.6 : 0,
                    scale: isSubmitted ? 1 : 1.1
                }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="absolute inset-0"
            >
                <video
                    ref={videoRef}
                    key={isMobile ? 'mobile' : 'desktop'}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src={isMobile
                        ? 'https://cdn.shopify.com/videos/c/o/v/00aac01a24f14e89a04a5c6508c6bdeb.mp4'
                        : 'https://cdn.shopify.com/videos/c/o/v/d6fa297e09ac40a98ee33ad43f70efbf.mp4'
                    }
                />
            </motion.div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-brown/40 via-transparent to-dark-brown/80" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-8 pb-20 text-center">
                {/* Logo / Brand */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="mb-6"
                >
                    <img
                        src="/assets/euforyc-logo.png"
                        alt="Euforyc"
                        className="h-40 md:h-52 lg:h-60 w-auto mx-auto brightness-0 invert"
                    />
                    <div className="w-12 h-px bg-cream/40 mx-auto mt-3" />
                </motion.div>

                {/* FOMO Tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-10 text-center"
                >
                    <p className="text-cream text-lg md:text-xl font-light tracking-wide mb-4">
                        Your everyday cute sets are almost here.
                    </p>
                    <p className="text-cream/50 text-xs md:text-sm uppercase tracking-[0.2em]">
                        Sign up for early access • Exclusive drops • Free goodies
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
                            <fetcher.Form method="post" action="/api/waitlist" className="relative">
                                {/* Glassmorphism Container */}
                                <div
                                    className="relative backdrop-blur-xl bg-white/10 rounded-full p-1 sm:p-1.5 shadow-2xl"
                                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            autoComplete="email"
                                            style={{
                                                outline: 'none',
                                                boxShadow: 'none',
                                                border: 'none',
                                                background: 'transparent',
                                                WebkitTextFillColor: '#FAF9F6',
                                                WebkitBackgroundClip: 'text',
                                                backgroundClip: 'text'
                                            }}
                                            className="flex-1 min-w-0 text-cream placeholder:text-cream/50 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:shadow-[0_0_0_1000px_transparent_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#FAF9F6]"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            style={{ outline: 'none', boxShadow: 'none' }}
                                            className="bg-cream text-dark-brown px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-50 whitespace-nowrap flex-shrink-0 focus:outline-none"
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

                                {/* SMS Toggle */}
                                <label className="flex items-center gap-3 mt-4 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={wantsSms}
                                            onChange={(e) => setWantsSms(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-cream/20 rounded-full peer-checked:bg-cream/40 transition-colors" />
                                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-cream/60 rounded-full peer-checked:translate-x-4 peer-checked:bg-cream transition-all" />
                                    </div>
                                    <span className="text-cream/60 text-sm group-hover:text-cream/80 transition-colors">
                                        Also text me the launch alert
                                    </span>
                                </label>

                                {/* Phone Input - Shows when SMS is enabled */}
                                <AnimatePresence>
                                    {wantsSms && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div
                                                className="relative backdrop-blur-xl bg-white/10 rounded-full p-1 sm:p-1.5"
                                                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                            >
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="Phone number"
                                                    autoComplete="tel"
                                                    style={{
                                                        outline: 'none',
                                                        boxShadow: 'none',
                                                        border: 'none',
                                                        background: 'transparent',
                                                        WebkitTextFillColor: '#FAF9F6',
                                                        WebkitBackgroundClip: 'text',
                                                        backgroundClip: 'text'
                                                    }}
                                                    className="w-full text-cream placeholder:text-cream/50 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:shadow-[0_0_0_1000px_transparent_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#FAF9F6]"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

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

                            {/* CTA Note */}
                            <p className="text-cream/50 text-sm mt-6 tracking-wide font-light">
                                By joining, you agree to receive marketing {wantsSms ? 'emails & texts' : 'emails'}. Unsubscribe anytime.
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
                        href="https://www.instagram.com/euforyc/"
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
                    © 2026 EUFORYC
                </motion.p>
            </div>
        </div>
    );
}
