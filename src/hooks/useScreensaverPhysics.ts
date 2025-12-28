import { useEffect, useRef } from 'react';
import { SCREENSAVER_COLORS, SCREENSAVER_CONFIG } from '@constants';

interface PhysicsState {
    x: number;
    y: number;
    dx: number;
    dy: number;
    colorIndex: number;
}

export const useScreensaverPhysics = (
    active: boolean,
    containerRef: React.RefObject<HTMLDivElement>,
    elementRef: React.RefObject<HTMLDivElement>
) => {
    const physics = useRef<PhysicsState>({
        x: 0,
        y: 0,
        dx: SCREENSAVER_CONFIG.INITIAL_SPEED,
        dy: SCREENSAVER_CONFIG.INITIAL_SPEED,
        colorIndex: 0
    });

    useEffect(() => {
        if (!active) return;

        let animationFrameId: number;
        let initTimeout: NodeJS.Timeout;

        const cycleColor = (element: HTMLDivElement) => {
            const p = physics.current;
            p.colorIndex = (p.colorIndex + 1) % SCREENSAVER_COLORS.length;

            const newColor = SCREENSAVER_COLORS[p.colorIndex];
            element.style.color = newColor;
            element.style.filter = `drop-shadow(0 0 10px ${newColor})`;
        };

        const loop = () => {
            const container = containerRef.current;
            const element = elementRef.current;

            if (container && element) {
                const { width: containerW, height: containerH } = container.getBoundingClientRect();
                const { width: elementW, height: elementH } = element.getBoundingClientRect();

                const p = physics.current;

                p.x += p.dx;
                p.y += p.dy;

                if (p.x + elementW >= containerW || p.x <= 0) {
                    p.dx = -p.dx;
                    p.x = Math.max(0, Math.min(p.x, containerW - elementW));
                    cycleColor(element);
                }

                if (p.y + elementH >= containerH || p.y <= 0) {
                    p.dy = -p.dy;
                    p.y = Math.max(0, Math.min(p.y, containerH - elementH));
                    cycleColor(element);
                }

                element.style.transform = `translate(${p.x}px, ${p.y}px)`;
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        const init = () => {
            if (containerRef.current && elementRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                const { width: elW, height: elH } = elementRef.current.getBoundingClientRect();

                physics.current.x = Math.random() * (width - elW);
                physics.current.y = Math.random() * (height - elH);

                // رنگ اولیه
                elementRef.current.style.color = SCREENSAVER_COLORS[0];

                loop();
            }
        };

        initTimeout = setTimeout(init, SCREENSAVER_CONFIG.INIT_DELAY);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(initTimeout);
        };
    }, [active, containerRef, elementRef]);
};
