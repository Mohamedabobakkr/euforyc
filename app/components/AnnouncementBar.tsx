import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const MESSAGES = [
    <span key="1">Free Shipping on Orders <span className="font-bold">Over $100</span></span>,
    <span key="2">New Drop: <span className="font-bold">Euforyc Essentials</span></span>,
    <span key="3"><span className="font-bold">Worldwide</span> Shipping</span>
];

export function AnnouncementBar() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-8 bg-dark-brown text-cream flex items-center justify-center text-xs font-medium tracking-widest uppercase z-50 relative overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                >
                    {MESSAGES[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
