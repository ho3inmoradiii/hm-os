import { useState, useEffect, useRef } from 'react';

interface Position {
    x: number;
    y: number;
}

interface UseDraggableProps {
    initialPosition: Position;
    onDragEnd: (pos: Position) => void;
    enabled?: boolean;
    snapThreshold?: number;
}

export const useDraggable = ({ initialPosition, onDragEnd, enabled = true }: UseDraggableProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const offset = useRef({ x: 0, y: 0 });
    const currentPos = useRef(initialPosition);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!enabled) return;
        if (e.button !== 0) return;
        if (!elementRef.current) return;

        elementRef.current.style.transition = 'none';

        setIsDragging(true);

        offset.current = {
            x: e.clientX - currentPos.current.x,
            y: e.clientY - currentPos.current.y
        };

        e.preventDefault();
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!elementRef.current) return;

            const newX = e.clientX - offset.current.x;
            const newY = e.clientY - offset.current.y;

            currentPos.current = { x: newX, y: newY };
            elementRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            if (!elementRef.current) return;

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;

            const TASKBAR_HEIGHT = 48;
            const PADDING = 10;

            const BOTTOM_LIMIT = screenH - TASKBAR_HEIGHT - PADDING;

            const { width, height } = elementRef.current.getBoundingClientRect();

            let finalX = currentPos.current.x;
            let finalY = currentPos.current.y;

            if (finalX < PADDING) finalX = PADDING;
            if (finalX + width > screenW - PADDING) finalX = screenW - width - PADDING;

            if (finalY < PADDING) finalY = PADDING;

            if (finalY + height > BOTTOM_LIMIT) {
                finalY = BOTTOM_LIMIT - height;
            }

            if (finalX !== currentPos.current.x || finalY !== currentPos.current.y) {
                elementRef.current.style.transition = "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
                elementRef.current.style.transform = `translate(${finalX}px, ${finalY}px)`;

                currentPos.current = { x: finalX, y: finalY };

                setTimeout(() => {
                    if (elementRef.current) {
                        elementRef.current.style.transition = "";
                    }
                }, 300);
            }

            onDragEnd(currentPos.current);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, onDragEnd]);

    useEffect(() => {
        currentPos.current = initialPosition;
    }, [initialPosition, initialPosition.x, initialPosition.y]);

    return {
        isDragging,
        handleMouseDown,
        elementRef,
    };
};
