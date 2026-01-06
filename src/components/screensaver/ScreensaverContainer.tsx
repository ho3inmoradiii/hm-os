import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { useUIStore } from '@store';
import { useScreensaverPhysics } from '@hooks';
import { cn } from '@utils';

export const ScreensaverContainer = () => {
    const active = useUIStore((state) => state.isScreensaverActive);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    useScreensaverPhysics(
        active && !isMobile,
        containerRef as React.RefObject<HTMLDivElement>,
        logoRef as React.RefObject<HTMLDivElement>
    );

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "fixed inset-0 z-[9999] bg-black overflow-hidden cursor-none",
                        isMobile ? "flex items-center justify-center" : "block"
                    )}
                >
                    <div
                        ref={logoRef}
                        className={cn(
                            "flex flex-col items-center justify-center p-6 text-center",
                            isMobile
                                ? "relative animate-pulse"
                                : "absolute top-0 left-0 will-change-transform"
                        )}
                        style={{
                            transition: 'color 0.3s ease',
                            transform: isMobile ? 'none' : undefined
                        }}
                    >
                        <Monitor
                            size={isMobile ? 48 : 64}
                            strokeWidth={1.5}
                            className="mb-4 opacity-90 text-ph-orange"
                        />

                        <h1 className={cn(
                            "font-black tracking-wider font-mono uppercase whitespace-nowrap",
                            isMobile ? "text-xl" : "text-3xl"
                        )}>
                            Hossein Moradi
                        </h1>

                        <p className={cn(
                            "font-bold opacity-75 mt-2 tracking-[0.2em] uppercase",
                            isMobile ? "text-xs" : "text-sm"
                        )}>
                            Front-End Architect
                        </p>
                    </div>

                    <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                        <p className="text-white/20 text-xs font-mono animate-pulse">
                            {isMobile ? "Tap to unlock" : "Press any key or move mouse to unlock"}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
