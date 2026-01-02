import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@utils';

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: 'top' | 'bottom';
    enabled?: boolean;
    className?: string;
    delay?: number;
}

export const Tooltip = ({
                            children,
                            content,
                            side = 'bottom',
                            enabled = true,
                            className,
                            delay = 0.2
                        }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const [coords, setCoords] = useState({ top: 0, left: 0, arrowOffset: 0 });

    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const padding = 10;

            const triggerCenter = triggerRect.left + triggerRect.width / 2;

            let top = 0;
            if (side === 'top') {
                top = triggerRect.top - 8;
            } else {
                top = triggerRect.bottom + 8;
            }

            let left = triggerCenter - tooltipRect.width / 2;

            if (left < padding) {
                left = padding;
            }
            else if (left + tooltipRect.width > window.innerWidth - padding) {
                left = window.innerWidth - tooltipRect.width - padding;
            }

            const arrowOffset = triggerCenter - left;

            setCoords({ top, left, arrowOffset });
        }
    }, [isVisible, side]);

    return (
        <>
            {/* Trigger */}
            <div
                ref={triggerRef}
                className="relative inline-flex"
                onMouseEnter={() => enabled && setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onWheel={() => setIsVisible(false)}
            >
                {children}
            </div>

            {/* Portal */}
            {createPortal(
                <AnimatePresence>
                    {isVisible && enabled && (
                        <motion.div
                            ref={tooltipRef}
                            initial={{ opacity: 0, scale: 0.95, y: side === 'top' ? 10 : -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15, delay: delay }}
                            style={{
                                position: 'fixed',
                                top: coords.top,
                                left: coords.left,
                                zIndex: 99999,
                                pointerEvents: 'none',
                            }}
                            className={cn(
                                "p-2 min-w-[max-content] max-w-xs",
                                "bg-[#f3f4ef] dark:bg-[#1d1f27]",
                                "border border-os-primary-border rounded-md shadow-xl",
                                "text-xs text-os-primary-text text-center leading-relaxed",
                                side === 'top' ? "-translate-y-full" : "",
                                className
                            )}
                        >
                            <div className="relative z-10">
                                {content}
                            </div>

                            {/* Arrow */}
                            <div
                                style={{
                                    left: coords.arrowOffset
                                }}
                                className={cn(
                                    "absolute w-3 h-3 rotate-45 -translate-x-1/2",
                                    "bg-[#f3f4ef] dark:bg-[#1d1f27]",
                                    "border-os-primary-border",
                                    side === 'top'
                                        ? "bottom-[-5px] border-b border-r"
                                        : "top-[-5px] border-t border-l"
                                )}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};
