import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Layout, Command, Settings, Trash2, Monitor } from 'lucide-react';
import { useUIStore, useWindowStore } from '@store';
import { MenuItem } from "@components";

export const ContextMenu = () => {
    const { contextMenu, closeContextMenu } = useUIStore();
    const { openWindow } = useWindowStore();
    const menuRef = useRef<HTMLDivElement>(null);

    const [adjustedPos, setAdjustedPos] = useState(contextMenu.position);

    const handleOpenSettings = () => {
        openWindow('settings', {
            title: 'Display Settings',
            icon: Monitor,
            size: { width: 350, height: 'auto' },
            allowMaximize: false,
        });
    };

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
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, duration: 0.1 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    style={{
                        top: adjustedPos.y,
                        left: adjustedPos.x,
                        position: 'fixed',
                        zIndex: 9999
                    }}
                    className="min-w-[220px] bg-os-primary-bg border border-os-primary-border shadow-2xl rounded-lg overflow-hidden font-sans select-none p-[5px]"

                    onContextMenu={(e) => e.preventDefault()}
                >
                    <MenuItem
                        icon={Settings}
                        label="Display options"
                        shortcut=","
                        onClick={() => handleOpenSettings()}
                    />
                    <MenuItem
                        icon={Command}
                        label="Shortcuts"
                        shortcut="."
                        onClick={() => alert('Coming Soon')}
                    />

                    {/* (Separator) */}
                    <div className="h-[1px] bg-os-primary-border my-1 mx-2 opacity-50" />

                    <MenuItem
                        icon={Layout}
                        label="Align Icons"
                        onClick={() => console.log('Align')}
                    />

                    <MenuItem
                        icon={RefreshCw}
                        label="Reload System"
                        onClick={() => window.location.reload()}
                    />

                    {/* (Separator) */}
                    <div className="h-[1px] bg-os-primary-border my-1 mx-2 opacity-50" />

                    <MenuItem
                        intent="danger"
                        icon={Trash2}
                        label="Close Menu"
                        onClick={() => closeContextMenu()}
                    />

                </motion.div>
            )}
        </AnimatePresence>
    );
};
