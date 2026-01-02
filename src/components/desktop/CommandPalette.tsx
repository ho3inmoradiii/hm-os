import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useUIStore } from '@store';
import { useCommandList } from '@hooks';
import { cn } from '@utils';
import { CornerEnterIcon } from '@components';

export const CommandPalette = () => {
    const { isCommandPaletteOpen, toggleCommandPalette } = useUIStore();

    const commands = useCommandList();

    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredCommands = useMemo(() => {
        return commands.filter(cmd =>
            cmd.show && cmd.label.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, commands]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        if (!isCommandPaletteOpen) {
            const timeout = setTimeout(() => setQuery(''), 200);
            return () => clearTimeout(timeout);
        }
    }, [isCommandPaletteOpen]);

    // (Navigation)
    useEffect(() => {
        if (!isCommandPaletteOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredCommands[selectedIndex]) {
                        filteredCommands[selectedIndex].action();
                        toggleCommandPalette(false);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCommandPaletteOpen, filteredCommands, selectedIndex, toggleCommandPalette]);

    return (
        <AnimatePresence>
            {isCommandPaletteOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[99999]"
                        onClick={() => toggleCommandPalette(false)}
                    />

                    {/* Palette Container */}
                    <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[20vh] pointer-events-none">
                        <motion.div
                            initial={{opacity: 0, scale: 0.95, y: -20}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            exit={{opacity: 0, scale: 0.95, y: -20}}
                            transition={{duration: 0.2}}
                            className={cn(
                                "w-full max-w-lg overflow-hidden pointer-events-auto",
                                "backdrop-blur-xl",
                                "bg-os-tertiary-bg/95 dark:bg-[#1d1f27]/95",
                                "border border-os-primary-border rounded shadow-2xl",
                                "flex flex-col"
                            )}
                        >
                            {/* --- Input Area --- */}
                            <div
                                className="flex items-center px-4 py-3 border-b border-os-primary-border gap-3 bg-os-primary-bg/30">
                                <Search className="text-os-primary-muted w-5 h-5"/>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent border-none outline-none text-os-primary-text placeholder:text-os-primary-muted text-sm h-6"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <div className="flex gap-1">
                                    <span
                                        className="px-1.5 py-0.5 rounded text-[10px] bg-os-primary-bg border border-os-primary-border text-os-primary-muted font-mono">
                                        ESC
                                    </span>
                                </div>
                            </div>

                            {/* --- Results List --- */}
                            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">

                                {filteredCommands.length === 0 ? (
                                    <div className="p-8 text-center text-os-primary-muted text-sm">
                                        No results found.
                                    </div>
                                ) : (
                                    filteredCommands.map((cmd, index) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => {
                                                cmd.action();
                                                toggleCommandPalette(false);
                                                setQuery('');
                                            }}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors text-sm",
                                                index === selectedIndex
                                                    ? "bg-os-input-border text-os-primary-text"
                                                    : "hover:bg-os-input-border"
                                            )}
                                        >
                                            <cmd.icon
                                                size={16}
                                                className="text-os-primary-text"
                                            />

                                            <span className="flex-1 font-medium">{cmd.label}</span>

                                            {cmd.shortcut && (
                                                <span className={cn(
                                                    "text-[10px] font-mono opacity-60 text-os-primary-text",
                                                )}>
                                                    {cmd.shortcut}
                                                </span>
                                            )}

                                            {index === selectedIndex && (
                                                <CornerEnterIcon className="w-3 h-3 text-os-primary-text opacity-70"/>
                                            )}
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* --- Footer (Optional) --- */}
                            <div
                                className="px-4 py-2 border-t border-os-primary-border flex justify-between items-center text-[10px] text-os-primary-muted bg-os-primary-bg/20">
                                <span>Product OS v1.0</span>
                                <div className="flex gap-2">
                                    <span>Navigate <span className="font-bold">↑↓</span></span>
                                    <span>Select <span className="font-bold">↵</span></span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
