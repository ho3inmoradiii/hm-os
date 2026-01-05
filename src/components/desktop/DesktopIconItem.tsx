import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@utils';
import { type DesktopItem } from '@constants';

interface DesktopIconItemProps {
    item: DesktopItem;
    onOpen: (item: DesktopItem) => void;
}

export const DesktopIconItem = ({ item, onOpen }: DesktopIconItemProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const isDraggingRef = useRef(false);
    const dragStartPos = useRef<{ x: number; y: number } | null>(null);
    const initialDelta = useRef({ x: 0, y: 0 });

    const mouseOffset = useRef({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Grid CSS Configuration
    const isRight = item.col < 0;
    const colIndex = Math.abs(item.col) - (isRight ? 1 : 0);
    const gridStyle: React.CSSProperties = {
        top: 80 + (item.row * 110),
        [isRight ? 'right' : 'left']: 24 + (colIndex * 100),
    };

    // --- Window Resize Handler (Keeping items in view) ---
    useEffect(() => {
        const handleResize = () => {
            if (!buttonRef.current || isDragging) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const viewportW = window.innerWidth;
            const viewportH = window.innerHeight;
            const PADDING = 10;
            const HEADER_H = 48;
            const SAFE_TOP = HEADER_H + PADDING;

            let adjustmentX = 0;
            let adjustmentY = 0;

            if (rect.right > viewportW - PADDING) adjustmentX = (viewportW - PADDING) - rect.right;
            else if (rect.left < PADDING) adjustmentX = PADDING - rect.left;

            if (rect.bottom > viewportH - PADDING) adjustmentY = (viewportH - PADDING) - rect.bottom;
            else if (rect.top < SAFE_TOP) adjustmentY = SAFE_TOP - rect.top;

            if (adjustmentX !== 0 || adjustmentY !== 0) {
                setPosition(prev => ({
                    x: prev.x + adjustmentX,
                    y: prev.y + adjustmentY
                }));
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [isDragging]);

    // --- Drag Logic ---

    const handlePointerDown = (e: React.PointerEvent) => {
        if (window.innerWidth < 768) return;

        if (e.button !== 0) return;

        e.preventDefault();
        e.stopPropagation();

        if (!buttonRef.current) return;

        isDraggingRef.current = false;
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        initialDelta.current = { ...position };

        const rect = buttonRef.current.getBoundingClientRect();
        mouseOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const handlePointerMove = (e: PointerEvent) => {
        if (!dragStartPos.current) return;

        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        if (!isDraggingRef.current) {
            const distance = Math.hypot(deltaX, deltaY);
            if (distance > 5) {
                isDraggingRef.current = true;
                setIsDragging(true);
            }
        }

        if (isDraggingRef.current) {
            setPosition({
                x: initialDelta.current.x + deltaX,
                y: initialDelta.current.y + deltaY
            });
        }
    };

    const handlePointerUp = (e: PointerEvent) => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);

        if (!isDraggingRef.current) {
            onOpen(item);
        } else {
            applyBoundaryConstraints();
        }

        setIsDragging(false);
        isDraggingRef.current = false;
        dragStartPos.current = null;
    };

    const applyBoundaryConstraints = () => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;

        const PADDING = 10;
        const HEADER_H = 48;
        const SAFE_TOP = HEADER_H + PADDING;

        let newX = rect.left;
        let newY = rect.top;

        if (newX < PADDING) newX = PADDING;
        else if (newX + rect.width > viewportW - PADDING) newX = viewportW - rect.width - PADDING;

        if (newY < SAFE_TOP) newY = SAFE_TOP;
        else if (newY + rect.height > viewportH - PADDING) newY = viewportH - rect.height - PADDING;

        const correctionX = newX - rect.left;
        const correctionY = newY - rect.top;

        if (correctionX !== 0 || correctionY !== 0) {
            setPosition(prev => ({
                x: prev.x + correctionX,
                y: prev.y + correctionY
            }));
        }
    };

    return (
        <button
            ref={buttonRef}
            onPointerDown={handlePointerDown}
            onClick={() => {
                if (window.innerWidth < 768) {
                    onOpen(item);
                }
            }}
            className={cn(
                "absolute flex flex-col items-center gap-1 p-2 rounded",
                "w-[84px] pointer-events-auto",
                "transition-colors duration-200",
                "hover:bg-white/10",
                "focus:outline-none focus:bg-white/15",
                isDragging ? "z-50 cursor-grabbing" : "z-10 cursor-pointer",
                "active:opacity-80"
            )}
            style={{
                ...gridStyle,
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s'
            }}
        >
            {/* Icon Container */}
            <div className={cn(
                "w-12 h-12 flex items-center justify-center",
                item.type === 'image' ? "drop-shadow-md" : "rounded backdrop-blur-sm border bg-white/5 border-white/10"
            )}>
                {item.type === 'image' ? (
                    <img
                        src={item.icon as string}
                        alt={item.label}
                        className="w-full h-full object-contain pointer-events-none select-none"
                        draggable={false}
                    />
                ) : (
                    React.createElement(item.icon as React.ElementType, {
                        size: 28,
                        strokeWidth: 1.5,
                        className: "text-white"
                    })
                )}
            </div>

            {/* Label */}
            <span className={cn(
                "text-xs font-medium text-center leading-tight tracking-wide",
                "rounded px-1 py-0.5",
                "backdrop-blur-[2px]",
                "bg-white/80 text-black border border-black/5 shadow-sm",
                "dark:bg-black/80 dark:text-white dark:border-white/10 select-none"
            )}>
                {item.label}
            </span>
        </button>
    );
};
