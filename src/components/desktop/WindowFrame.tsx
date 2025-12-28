import React from 'react';
import { X, Minus, Square } from 'lucide-react';
import { useSettingsStore, useWindowStore } from '@store';
import { useDraggable, useResizable, type ResizeDirection } from '@hooks';
import { cn } from '@utils';

import { WindowControlBtn } from '../ui/WindowControlBtn';

interface WindowFrameProps {
    id: string;
    children: React.ReactNode;
}

const ResizeHandle = ({
                          dir,
                          onInit
                      }: {
    dir: ResizeDirection;
    onInit: (e: React.MouseEvent, dir: ResizeDirection) => void
}) => {
    const positionClasses = {
        n: "top-0 left-2 right-2 h-2 cursor-ns-resize z-50",
        s: "bottom-0 left-2 right-2 h-2 cursor-ns-resize z-50",
        e: "right-0 top-2 bottom-2 w-2 cursor-ew-resize z-50",
        w: "left-0 top-2 bottom-2 w-2 cursor-ew-resize z-50",

        ne: "top-0 right-0 w-4 h-4 cursor-nesw-resize z-50",
        nw: "top-0 left-0 w-4 h-4 cursor-nwse-resize z-50",
        se: "bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50",
        sw: "bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-50",
    };

    return (
        <div
            className={cn("absolute bg-transparent hover:bg-ph-orange/50 transition-colors", positionClasses[dir])}
            onMouseDown={(e) => onInit(e, dir)}
        />
    );
};

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
                "absolute flex flex-col bg-os-input-bg rounded-xl shadow-2xl overflow-hidden transition-shadow duration-200 pointer-events-auto",
                (isDragging || isResizing) ? "shadow-2xl select-none" : "shadow-xl transition-all duration-200",
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

            <div className="flex-1 bg-os-input-bg relative w-full overflow-hidden">
                {(isDragging || isResizing) && <div className="absolute inset-0 z-50 bg-transparent"/>}
                {children}
            </div>
        </div>
    );
};
