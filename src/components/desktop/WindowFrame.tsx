import React from 'react';
import { X, Minus, Square } from 'lucide-react';
import { useSettingsStore, useWindowStore } from '@store';
import { useDraggable, useResizable } from '@hooks';
import { cn } from '@utils';
import { Tooltip, ResizeHandle } from '@components';

import { WindowControlBtn } from '../ui/WindowControlBtn';

interface WindowFrameProps {
    id: string;
    children: React.ReactNode;
}

export const WindowFrame = ({ id, children }: WindowFrameProps) => {
    const { display } = useSettingsStore();

    const windowState = useWindowStore((state) => state.windows[id]);
    const { focusWindow, closeWindow, moveWindow, minimizeWindow, resizeWindow } = useWindowStore();

    const { isDragging, handleMouseDown, elementRef } = useDraggable({
        initialPosition: windowState?.position || { x: 0, y: 0 },
        onDragEnd: (pos) => moveWindow(id, pos),
        enabled: !windowState?.isMaximized
    });

    const { initResize, isResizing } = useResizable({
        nodeRef: elementRef,
        initialSize: windowState?.size || { width: 600, height: 400 },
        initialPosition: windowState?.position || { x: 0, y: 0 },
        enabled: !windowState?.isMaximized,
        onResizeEnd: (newSize, newPos) => {
            resizeWindow(id, newSize);
            moveWindow(id, newPos);
        }
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
                "absolute flex flex-col overflow-hidden pointer-events-auto",
                "shadow-2xl transition-shadow duration-200",
                "backdrop-blur-xl",
                "bg-os-tertiary-bg/95 dark:bg-[#1d1f27]/95",
                "border border-os-primary-border",
                "rounded",

                (isDragging || isResizing) ? "select-none shadow-none" : ""
            )}
            onMouseDownCapture={() => focusWindow(id)}
        >
            {!windowState.isMaximized && (
                <>
                    <ResizeHandle dir="n" onInit={initResize} />
                    <ResizeHandle dir="s" onInit={initResize} />
                    <ResizeHandle dir="e" onInit={initResize} />
                    <ResizeHandle dir="w" onInit={initResize} />
                    <ResizeHandle dir="ne" onInit={initResize} />
                    <ResizeHandle dir="nw" onInit={initResize} />
                    <ResizeHandle dir="se" onInit={initResize} />
                    <ResizeHandle dir="sw" onInit={initResize} />
                </>
            )}
            <div
                onMouseDown={handleMouseDown}
                className={cn(
                    "flex items-center justify-between px-3 py-3 select-none",
                    "bg-os-primary-bg/30 border-b border-os-primary-border",
                    headerCursorClass
                )}
            >
                <div className="flex items-center gap-2 text-os-primary-text opacity-90">
                    {windowState.icon && <windowState.icon size={14}/>}
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
                    <Tooltip
                        content="Close (Alt + W)"
                        side="top"
                        align="center"
                    >
                        <WindowControlBtn
                            icon={X}
                            onClick={(e) => {
                                e.stopPropagation();
                                closeWindow(id);
                            }}
                        />
                    </Tooltip>

                </div>
            </div>

            <div className="flex-1 relative w-full overflow-hidden bg-transparent">
                {(isDragging || isResizing) && <div className="absolute inset-0 z-50 bg-transparent"/>}
                {children}
            </div>
        </div>
    );
};
