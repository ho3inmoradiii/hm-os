import { useEffect, useRef } from 'react';
import { ArrowLeftToLine, ArrowRightToLine, Maximize } from 'lucide-react';
import { cn } from '@utils';

interface SnapMenuProps {
    onSnap: (dir: 'left' | 'right' | 'maximize') => void;
    onClose: () => void;
}

export const SnapMenu = ({ onSnap, onClose }: SnapMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className={cn(
                "absolute top-full right-0 mt-2 z-[9999] w-48",
                "bg-os-primary-bg/95 backdrop-blur-xl border border-os-primary-border",
                "rounded-lg shadow-2xl p-1.5 flex flex-col gap-1",
                "animate-in fade-in zoom-in-95 duration-100 origin-top-right"
            )}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <span className="px-2 py-1 text-[10px] font-semibold text-os-primary-muted uppercase tracking-wider">
                Snap to...
            </span>

            {/* Left Half */}
            <button
                onClick={() => { onSnap('left'); onClose(); }}
                className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-os-tertiary-bg transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <ArrowLeftToLine size={14} className="text-os-primary-text" />
                    <span className="text-xs text-os-primary-text">Left half</span>
                </div>
                <div className="flex gap-1 opacity-50">
                    <kbd className="text-[9px] border border-os-primary-border rounded px-1 bg-os-primary-bg">Shift</kbd>
                    <kbd className="text-[9px] border border-os-primary-border rounded px-1 bg-os-primary-bg">←</kbd>
                </div>
            </button>

            {/* Right Half */}
            <button
                onClick={() => { onSnap('right'); onClose(); }}
                className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-os-tertiary-bg transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <ArrowRightToLine size={14} className="text-os-primary-text" />
                    <span className="text-xs text-os-primary-text">Right half</span>
                </div>
                <div className="flex gap-1 opacity-50">
                    <kbd className="text-[9px] border border-os-primary-border rounded px-1 bg-os-primary-bg">Shift</kbd>
                    <kbd className="text-[9px] border border-os-primary-border rounded px-1 bg-os-primary-bg">→</kbd>
                </div>
            </button>

            <div className="h-[1px] bg-os-primary-border my-0.5 opacity-50" />

            {/* Maximize */}
            <button
                onClick={() => { onSnap('maximize'); onClose(); }}
                className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-os-tertiary-bg transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <Maximize size={14} className="text-os-primary-text" />
                    <span className="text-xs text-os-primary-text">Maximize</span>
                </div>
                <div className="flex gap-1 opacity-50">
                    <kbd className="text-[9px] border border-os-primary-border rounded px-1 bg-os-primary-bg">Shift</kbd>
                    <kbd className="text-[9px] border border-os-primary-border rounded px-1 bg-os-primary-bg">↑</kbd>
                </div>
            </button>
        </div>
    );
};
