import React, { useState, useEffect, useRef } from 'react';

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface UseResizableProps {
    nodeRef: React.RefObject<HTMLDivElement>;
    initialSize: { width: number | string; height: number | string };
    initialPosition: { x: number; y: number };
    minSize?: { width: number; height: number };
    onResizeEnd: (size: { width: number; height: number }, position: { x: number; y: number }) => void;
    enabled?: boolean;
}

export const useResizable = ({
                                 nodeRef,
                                 initialPosition,
                                 minSize = { width: 300, height: 200 },
                                 onResizeEnd,
                                 enabled = true
                             }: UseResizableProps) => {
    const [isResizing, setIsResizing] = useState(false);

    // دیتاهای لحظه شروع
    const startData = useRef({ x: 0, y: 0, w: 0, h: 0, winX: 0, winY: 0 });
    const activeDir = useRef<ResizeDirection | null>(null);

    // دیتاهای لحظه ای (برای اینکه موقع ول کردن داشته باشیمشون)
    const currentData = useRef({ w: 0, h: 0, x: 0, y: 0 });

    const initResize = (e: React.MouseEvent, dir: ResizeDirection) => {
        if (!enabled || !nodeRef.current) return;
        e.preventDefault();
        e.stopPropagation();

        setIsResizing(true);
        activeDir.current = dir;

        const rect = nodeRef.current.getBoundingClientRect();

        startData.current = {
            x: e.clientX,
            y: e.clientY,
            w: rect.width,
            h: rect.height,
            winX: initialPosition.x, // فرض میکنیم سینکه
            winY: initialPosition.y
        };

        // مقدار اولیه کارنت هم ست میشه
        currentData.current = {
            w: rect.width, h: rect.height,
            x: initialPosition.x, y: initialPosition.y
        };
    };

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!nodeRef.current) return;

            const deltaX = e.clientX - startData.current.x;
            const deltaY = e.clientY - startData.current.y;
            const dir = activeDir.current;
            const start = startData.current;

            let newW = start.w;
            let newH = start.h;
            let newX = start.winX;
            let newY = start.winY;

            // 1. محاسبات
            if (dir?.includes('e')) newW = start.w + deltaX;
            if (dir?.includes('w')) { newW = start.w - deltaX; newX = start.winX + deltaX; }
            if (dir?.includes('s')) newH = start.h + deltaY;
            if (dir?.includes('n')) { newH = start.h - deltaY; newY = start.winY + deltaY; }

            // 2. محدودیت ها
            if (newW < minSize.width) {
                newW = minSize.width;
                if (dir?.includes('w')) newX = start.winX + (start.w - minSize.width);
            }
            if (newH < minSize.height) {
                newH = minSize.height;
                if (dir?.includes('n')) newY = start.winY + (start.h - minSize.height);
            }

            // 3. اعمال به DOM
            nodeRef.current.style.width = `${newW}px`;
            nodeRef.current.style.height = `${newH}px`;
            nodeRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

            // 4. ذخیره
            currentData.current = { w: newW, h: newH, x: newX, y: newY };
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            activeDir.current = null;
            // آپدیت نهایی استور
            onResizeEnd(
                { width: currentData.current.w, height: currentData.current.h },
                { x: currentData.current.x, y: currentData.current.y }
            );
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, minSize, onResizeEnd]);

    return { initResize, isResizing };
};
