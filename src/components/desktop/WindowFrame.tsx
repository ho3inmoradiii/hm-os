import React, { useEffect, useState } from 'react';
import { X, Minus, Square, Copy } from 'lucide-react';
import { useSettingsStore, useWindowStore } from '@store';
import { useDraggable, useResizable } from '@hooks';
import { cn } from '@utils';
import { Tooltip, ResizeHandle, SnapMenu } from '@components';

import { WindowControlBtn } from '../ui/WindowControlBtn';

interface WindowFrameProps {
    id: string;
    children: React.ReactNode;
}

export const WindowFrame = ({ id, children }: WindowFrameProps) => {
    const { display } = useSettingsStore();

    const windowState = useWindowStore((state) => state.windows[id]);

    const [isMobile, setIsMobile] = useState(false);

    const activeWindowId = useWindowStore((state) => state.activeWindowId);
    const isActive = activeWindowId === id;

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const {
        focusWindow,
        closeWindow,
        moveWindow,
        minimizeWindow,
        resizeWindow,
        toggleMaximize,
        snapWindow
    } = useWindowStore();

    const [isSnapMenuOpen, setIsSnapMenuOpen] = useState(false);

    const { isDragging, handleMouseDown, elementRef } = useDraggable({
        initialPosition: windowState?.position || { x: 0, y: 0 },
        onDragEnd: (pos) => moveWindow(id, pos),
        enabled: !windowState?.isMaximized && !isMobile
    });

    const { initResize, isResizing } = useResizable({
        nodeRef: elementRef as React.RefObject<HTMLDivElement>,

        initialSize: windowState?.size || { width: 600, height: 400 },
        initialPosition: windowState?.position || { x: 0, y: 0 },
        enabled: !windowState?.isMaximized && !isMobile,
        onResizeEnd: (newSize, newPos) => {
            resizeWindow(id, newSize);
            moveWindow(id, newPos);
        }
    });

    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (windowState.allowMaximize) snapWindow(id, 'left');
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (windowState.allowMaximize) snapWindow(id, 'right');
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (windowState.allowMaximize) {
                            snapWindow(id, 'maximize');
                        }
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        minimizeWindow(id);
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [isActive, id, snapWindow, minimizeWindow, windowState.allowMaximize]);

    useEffect(() => {
        const handleBrowserResize = () => {
            if (!windowState || windowState.isMaximized || windowState.isMinimized) return;

            const viewportW = window.innerWidth;
            const viewportH = window.innerHeight;

            const PADDING = 10;
            const HEADER_OFFSET = 48;

            let newW = windowState.size.width as number;
            let newH = windowState.size.height as number;
            let newX = windowState.position.x;
            let newY = windowState.position.y;

            let hasChanged = false;

            if (newW > viewportW - (PADDING * 2)) {
                newW = viewportW - (PADDING * 2);
                hasChanged = true;
            }

            if (newX + newW > viewportW - PADDING) {
                newX = viewportW - newW - PADDING;
                hasChanged = true;
            }

            if (newX < PADDING) {
                newX = PADDING;
                hasChanged = true;
            }

            if (newH > viewportH - HEADER_OFFSET - PADDING) {
                newH = viewportH - HEADER_OFFSET - PADDING;
                hasChanged = true;
            }

            if (newY + newH > viewportH - PADDING) {
                newY = viewportH - newH - PADDING;
                hasChanged = true;
            }

            if (newY < HEADER_OFFSET + PADDING) {
                newY = HEADER_OFFSET + PADDING;
                hasChanged = true;
            }

            if (hasChanged) {
                resizeWindow(id, { width: newW, height: newH });
                moveWindow(id, { x: newX, y: newY });
            }
        };

        window.addEventListener('resize', handleBrowserResize);

        return () => window.removeEventListener('resize', handleBrowserResize);
    }, [windowState, id, resizeWindow, moveWindow]);


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
                transform: windowState.isMaximized
                    ? 'none'
                    : `translate(${windowState.position.x}px, ${windowState.position.y}px)`,

                width: windowState.isMaximized ? '100%' : windowState.size.width,
                height: windowState.isMaximized ? '100%' : windowState.size.height,

                top: windowState.isMaximized ? 0 : undefined,
                left: windowState.isMaximized ? 0 : undefined,

                zIndex: windowState.zIndex,
            }}
            className={cn(
                "absolute flex flex-col overflow-hidden pointer-events-auto",
                "shadow-2xl transition-all duration-200",
                "backdrop-blur-xl",
                "bg-os-tertiary-bg/95 dark:bg-[#1d1f27]/95",
                "border border-os-primary-border",
                "max-md:!fixed max-md:!inset-0 max-md:!w-full max-md:!h-full max-md:!transform-none max-md:!rounded-none max-md:border-0",
                windowState.isMaximized ? "rounded-none border-0" : "rounded-lg",
                (isDragging || isResizing) ? "select-none shadow-none transition-none" : ""
            )}
            onMouseDownCapture={() => focusWindow(id)}
        >
            {!windowState.isMaximized && !isMobile && (
                <>
                    <ResizeHandle dir="s" onInit={initResize} />
                    <ResizeHandle dir="e" onInit={initResize} />
                    <ResizeHandle dir="w" onInit={initResize} />
                    <ResizeHandle dir="ne" onInit={initResize} />
                    <ResizeHandle dir="nw" onInit={initResize} />
                    <ResizeHandle dir="se" onInit={initResize} />
                    <ResizeHandle dir="sw" onInit={initResize} />
                </>
            )}

            {/* --- Window Header --- */}
            <div
                onDoubleClick={() => windowState.allowMaximize && toggleMaximize(id)}
                onMouseDown={handleMouseDown}
                className={cn(
                    "flex items-center justify-between px-3 py-3 select-none mt-12 md:mt-0",
                    "bg-os-primary-bg/30 border-b border-os-primary-border",
                    !windowState.isMaximized && headerCursorClass
                )}
            >
                <div className="flex items-center gap-2 text-os-primary-text opacity-90">
                    {windowState.icon && <windowState.icon size={14}/>}
                    <span className="text-xs font-bold tracking-wide">{windowState.title}</span>
                </div>

                <div className="flex items-center gap-1">

                    <div className="hidden md:flex items-center gap-1">
                        <WindowControlBtn
                            icon={Minus}
                            onClick={(e) => {
                                e.stopPropagation();
                                minimizeWindow(id);
                            }}
                        />

                        {windowState.allowMaximize && (
                            <div className="relative flex items-center">
                                <Tooltip
                                    enabled={!isSnapMenuOpen}
                                    content="Right click for snap options"
                                    side="top"
                                >
                                    <WindowControlBtn
                                        icon={windowState.isMaximized ? Copy : Square}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMaximize(id);
                                        }}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsSnapMenuOpen(true);
                                        }}
                                    />
                                </Tooltip>

                                {isSnapMenuOpen && (
                                    <SnapMenu
                                        onSnap={(dir) => snapWindow(id, dir)}
                                        onClose={() => setIsSnapMenuOpen(false)}
                                    />
                                )}
                            </div>
                        )}
                    </div>

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
