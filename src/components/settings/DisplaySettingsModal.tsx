import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@store';
import { DisplayOptions } from '@components';

export const DisplaySettingsModal = () => {
    const { modals } = useUIStore();

    if (!modals.isDisplayOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                    className="relative z-10"
                >

                    <DisplayOptions />

                </motion.div>
            </div>
        </AnimatePresence>
    );
};
