import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { useUIStore } from '@store';
import { useScreensaverPhysics } from '@hooks';

export const ScreensaverContainer = () => {
    const active = useUIStore((state) => state.isScreensaverActive);

    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useScreensaverPhysics(active, containerRef, logoRef);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-black overflow-hidden cursor-none"
                >
                    <div
                        ref={logoRef}
                        className="absolute top-0 left-0 flex flex-col items-center justify-center p-6 will-change-transform text-center"
                        style={{ transition: 'color 0.3s ease' }}
                    >
                        <Monitor size={64} strokeWidth={1.5} className="mb-4 opacity-90"/>
                        <h1 className="text-3xl font-black tracking-wider font-mono uppercase whitespace-nowrap">
                            Hossein Moradi
                        </h1>

                        <p className="text-sm font-bold opacity-75 mt-2 tracking-[0.2em] uppercase">
                            Front-End Architect
                        </p>
                    </div>

                    <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                        <p className="text-white/20 text-xs font-mono animate-pulse">
                            Press any key or move mouse to unlock
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
