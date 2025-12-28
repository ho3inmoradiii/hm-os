import React from 'react';
import { X, Minus, Square } from 'lucide-react';
import { useSettingsStore, useWindowStore } from '@store';
import { useDraggable } from '@hooks';
import { cn } from '@utils';

import { WindowControlBtn } from '../ui/WindowControlBtn';

interface WindowFrameProps {
    id: string;
    children: React.ReactNode;
}

export const WindowFrame = ({ id, children }: WindowFrameProps) => {
    const { display } = useSettingsStore();

    const windowState = useWindowStore((state) => state.windows[id]);
    const { focusWindow, closeWindow, moveWindow, minimizeWindow } = useWindowStore();

    const { isDragging, handleMouseDown, elementRef } = useDraggable({
        initialPosition: windowState?.position || { x: 0, y: 0 },
        onDragEnd: (pos) => moveWindow(id, pos),
        enabled: !windowState?.isMaximized
    });

    if (!windowState || windowState.isMinimized) return null;

    const cursorStyles = {
        big: "cursor-[url('/cursors/big-drag.svg')_10_10,move]",
        rick: "cursor-[url('/cursors/rick-cursor.png')]",
        default: "cursor-all-scroll"
    };

    const headerCursorClass = cursorStyles[display.cursor] || cursorStyles.default;

    return (
        <div
            ref={elementRef}
            style={{
                transform: `translate(${windowState.position.x}px, ${windowState.position.y}px)`,
                width: windowState.size.width,
                height: windowState.size.height,
                zIndex: windowState.zIndex,
            }}
            className={cn(
                "absolute flex flex-col bg-os-input-bg rounded-xl shadow-2xl overflow-hidden transition-shadow duration-200 pointer-events-auto",
                isDragging ? "shadow-2xl select-none" : "shadow-xl"
            )}
            onMouseDownCapture={() => focusWindow(id)}
        >
            <div
                onMouseDown={handleMouseDown}
                className={cn(
                    "flex items-center justify-between px-3 py-2 bg-os-tertiary-bg/50 border-b border-os-tertiary-border select-none",
                    headerCursorClass
                )}
            >
                <div className="flex items-center gap-2 text-os-main opacity-80">
                    {windowState.icon && <windowState.icon size={14} />}
                    <span className="text-xs font-bold tracking-wide">{windowState.title}</span>
                </div>

                <div className="flex items-center gap-1">
                    <WindowControlBtn
                        icon={Minus}
                        onClick={(e) => {
                            e.stopPropagation();
                            minimizeWindow(id);
                        }}
                    />
                    {windowState.allowMaximize && (
                        <WindowControlBtn
                            icon={Square}
                            onClick={(e) => e.stopPropagation()}
                            className="opacity-50"
                        />
                    )}
                    <WindowControlBtn
                        icon={X}
                        onClick={(e) => {
                            e.stopPropagation();
                            closeWindow(id);
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 bg-os-input-bg relative h-auto">
                {isDragging && <div className="absolute inset-0 z-50 bg-transparent" />}
                {children}
            </div>
        </div>
    );
};
