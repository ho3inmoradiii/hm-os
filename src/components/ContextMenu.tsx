import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@store/uiStore';
import { RefreshCw, Layout, Command, Settings } from 'lucide-react';

interface MenuItemProps {
    icon: React.ElementType;
    label: string;
    shortcut?: string;
    onClick: () => void;
}

const MenuItem = ({ icon: Icon, label, shortcut, onClick }: MenuItemProps) => (
    <button
        onClick={onClick}
        className="flex items-center justify-between w-full px-3 py-2 text-xs text-gray-300 hover:bg-[#2d2d2d] hover:text-white transition-colors text-left group"
    >
        <div className="flex items-center gap-2 cursor-pointer">
            <Icon size={14} className="text-ph-gray group-hover:text-ph-orange" />
            <span>{label}</span>
        </div>
        {shortcut && <span className="text-[10px] text-gray-500 font-mono bg-[#222] px-1 rounded border border-[#333]">{shortcut}</span>}
    </button>
);

export const ContextMenu = () => {
    const { contextMenu } = useUIStore();
    const menuRef = useRef<HTMLDivElement>(null);

    const [adjustedPos, setAdjustedPos] = useState(contextMenu.position);

    useLayoutEffect(() => {
        if (contextMenu.isOpen && menuRef.current) {
            const { x, y } = contextMenu.position;
            const { width, height } = menuRef.current.getBoundingClientRect();
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;

            const newX = x + width > screenW ? x - width : x;
            const newY = y + height > screenH ? y - height : y;

            setAdjustedPos({ x: newX, y: newY });
        }
    }, [contextMenu.position, contextMenu.isOpen]);

    return (
        <AnimatePresence>
            {contextMenu.isOpen && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, duration: 0.1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{
                        top: adjustedPos.y,
                        left: adjustedPos.x,
                        position: 'fixed',
                        zIndex: 9999
                    }}
                    className="min-w-[220px] bg-[#151515] border border-[#333] shadow-2xl rounded-lg overflow-hidden py-1 font-mono"
                >
                    <div className="px-3 py-2 border-b border-[#333] mb-1">
                        <span className="text-[10px] text-ph-gray uppercase tracking-wider font-bold">System</span>
                    </div>

                    <MenuItem icon={Settings} label="Display options" shortcut="," onClick={() => alert('Settings coming soon')} />
                    <MenuItem icon={Command} label="Keyboard shortcuts" shortcut="." onClick={() => alert('Shortcuts coming soon')} />

                    <div className="h-[1px] bg-[#333] my-1 mx-2" />

                    <MenuItem icon={Layout} label="Align Icons" onClick={() => alert('Aligning...')} />
                    <MenuItem icon={RefreshCw} label="Reset Desktop" onClick={() => window.location.reload()} />

                </motion.div>
            )}
        </AnimatePresence>
    );
};
