import { useEffect } from 'react';
import { useShallow } from "zustand/react/shallow";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Ghost } from "lucide-react";
import { useWindowStore, useUIStore } from "@store";
import { cn } from "@utils";

export const MinimizedWindowsContainer = () => {
    const { isWindowSidebarOpen, toggleWindowSidebar } = useUIStore();
    const { focusWindow, closeWindow } = useWindowStore();

    const minimizedWindows = useWindowStore(
        useShallow((state) =>
            Object.values(state.windows).filter(w => w.isMinimized)
        )
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isWindowSidebarOpen && e.key === 'Escape') {
                toggleWindowSidebar(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isWindowSidebarOpen, toggleWindowSidebar]);

    const handleRestore = (id: string) => {
        focusWindow(id);
        toggleWindowSidebar(false);
    };

    const handleCloseAll = () => {
        minimizedWindows.forEach(w => closeWindow(w.id));
    };

    return (
        <AnimatePresence>
            {isWindowSidebarOpen && (
                <>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
                        onClick={() => toggleWindowSidebar(false)}
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{x: "100%"}}
                        animate={{x: 0}}
                        exit={{x: "100%"}}
                        transition={{type: "spring", damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed right-4 top-16 bottom-4 z-[9999] rounded",
                            "w-[320px] shadow-2xl backdrop-blur-xl",
                            "bg-os-tertiary-bg/95 dark:bg-[#1d1f27]/95",
                            "border border-os-primary-border",
                            "flex flex-col overflow-hidden"
                        )}
                    >
                        {/* --- Header --- */}
                        <div
                            className="flex items-center justify-between px-4 py-3 border-b border-os-primary-border bg-os-primary-bg/30">
                            <h2 className="text-sm font-bold text-os-primary-text">
                                Minimized windows
                            </h2>

                            {minimizedWindows.length > 0 && (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleCloseAll}
                                        className="flex items-center gap-1 text-xs font-medium text-os-primary-text hover:text-ph-orange transition-colors"
                                    >
                                        Close all
                                    </button>
                                    <button
                                        onClick={() => toggleWindowSidebar(false)}
                                    >
                                        <ArrowRight size={15}/>
                                    </button>
                                </div>

                            )}
                        </div>

                        {/* --- List --- */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            <AnimatePresence mode='popLayout'>
                                {minimizedWindows.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center h-40 text-os-primary-muted opacity-50"
                                    >
                                        <Ghost size={32} className="mb-2" />
                                        <span className="text-xs">All clear!</span>
                                    </motion.div>
                                ) : (
                                    minimizedWindows.map((win) => (
                                        <motion.button
                                            layout
                                            key={win.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                                            onClick={() => handleRestore(win.id)}
                                            className={cn(
                                                "w-full text-left px-3 py-3 rounded-lg transition-all duration-200",
                                                "flex items-center gap-3 group relative overflow-hidden",
                                                "bg-os-primary-bg/50 hover:bg-os-primary-accent border border-transparent hover:border-os-primary-border"
                                            )}
                                        >
                                            <div className="text-os-primary-text opacity-70 group-hover:opacity-100 transition-opacity">
                                                {win.icon ? <win.icon size={16} /> : <div className="w-4 h-4 bg-gray-400 rounded-sm" />}
                                            </div>

                                            <span className="text-xs font-medium text-os-primary-text truncate flex-1">
                                                {win.title}
                                            </span>

                                            <div
                                                className="text-os-primary-text-sec opacity-0 group-hover:opacity-100 p-1.5 hover:text-os-primary-text transition-all absolute right-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    closeWindow(win.id);
                                                }}
                                            >
                                                <X size={14} />
                                            </div>
                                        </motion.button>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>

                        {/* --- Footer Hint --- */}
                        <div className="p-3 border-t border-os-primary-border bg-os-primary-bg/20 text-center">
                            <p className="text-[10px] text-os-primary-muted font-mono">
                                Press <kbd
                                className="px-1.5 py-0.5 border border-os-primary-border rounded bg-os-primary-bg text-os-primary-text font-sans mx-1 shadow-sm">Esc</kbd> to
                                close
                            </p>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
