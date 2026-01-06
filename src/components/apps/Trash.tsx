import { useState } from 'react';
import { Trash2, FileText, FileCode, Image as ImageIcon, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@utils';

const TRASH_ITEMS = [
    { id: 1, name: 'jquery-v1.js', type: 'code', icon: FileCode, size: '256 KB', date: '2019-01-10' },
    { id: 2, name: 'project-ideas-2020.txt', type: 'text', icon: FileText, size: '12 KB', date: '2020-05-14' },
    { id: 3, name: 'how-to-center-div.png', type: 'image', icon: ImageIcon, size: '2.4 MB', date: '2021-02-20' },
    { id: 4, name: 'startup-that-failed.zip', type: 'archive', icon: AlertTriangle, size: '1.2 GB', date: '2022-11-08' },
];

export const Trash = () => {
    const [items, setItems] = useState(TRASH_ITEMS);
    const [isEmptying, setIsEmptying] = useState(false);

    const handleEmptyTrash = () => {
        if (items.length === 0) return;
        setIsEmptying(true);
        setTimeout(() => {
            setItems([]);
            setIsEmptying(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1d1f27] text-gray-900 dark:text-gray-100">

            {/* Toolbar */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#1d1f27]">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-lg">
                        <Trash2 size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">Recycle Bin</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {items.length} items
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleEmptyTrash}
                    disabled={items.length === 0 || isEmptying}
                    className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                        items.length === 0
                            ? "bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-red-500/20"
                    )}
                >
                    {isEmptying ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    Empty Trash
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 gap-4">
                        <Trash2 size={64} strokeWidth={1} className="opacity-20" />
                        <p className="text-sm">Trash is empty. Your code is clean!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                                    className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-white/5 border border-transparent hover:border-blue-200 dark:hover:border-white/10 transition-all cursor-default"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
                                        <item.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col items-center text-center gap-0.5 w-full">
                                        <span className="text-xs font-medium truncate w-full px-2">
                                            {item.name}
                                        </span>
                                        <span className="text-[10px] text-gray-400">
                                            {item.size} • {item.type}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Footer Status Bar */}
            <div className="px-4 py-2 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#1d1f27] text-[10px] text-gray-400 flex justify-between">
                <span>Total size: {items.length > 0 ? '1.2 GB' : '0 KB'}</span>
                <span>/trash</span>
            </div>
        </div>
    );
};
