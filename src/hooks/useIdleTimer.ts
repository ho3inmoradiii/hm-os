import { useEffect, useRef, useCallback } from 'react';
import { useSettingsStore, useToastStore, useUIStore } from '@store';

export const useIdleTimer = () => {
    const { display, toggleScreensaver } = useSettingsStore();
    const { setScreensaverActive, isScreensaverActive } = useUIStore();
    const { addToast } = useToastStore();

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const activationTimeRef = useRef<number>(0);

    useEffect(() => {
        if (isScreensaverActive) {
            activationTimeRef.current = Date.now();
        }
    }, [isScreensaverActive]);

    const resetTimer = useCallback(() => {

        if (isScreensaverActive) {
            const now = Date.now();
            const timeSinceActivation = now - activationTimeRef.current;

            if (timeSinceActivation < 1500) {
                return;
            }

            console.log('Wake up! Deactivating screensaver.');
            setScreensaverActive(false);

            const isMobile = window.innerWidth < 768;

            addToast({
                title: 'Screensaver dismissed',
                description: isMobile ? undefined : 'Want to disable it permanently?',
                type: 'info',
                duration: isMobile ? 3000 : 8000,

                action: isMobile ? undefined : {
                    label: 'Disable screensaver',
                    onClick: () => {
                        toggleScreensaver(false);

                        addToast({
                            title: 'Screensaver disabled',
                            description: 'Change this setting in Display options.',
                            type: 'success',
                            action: {
                                label: 'Undo',
                                onClick: () => toggleScreensaver(true)
                            }
                        });
                    }
                }
            });
        }


        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (display.isScreensaverEnabled) {
            const timeoutDuration = display.screensaverTimeout || 60000;

            timerRef.current = setTimeout(() => {
                setScreensaverActive(true);
                activationTimeRef.current = Date.now();
                console.log(`System is idle (${display.screensaverTimeout}ms). Engaging screensaver protocol.`);
            }, timeoutDuration);
        }
    }, [
        addToast,
        display.isScreensaverEnabled,
        display.screensaverTimeout,
        isScreensaverActive,
        setScreensaverActive,
        toggleScreensaver
    ]);


    useEffect(() => {
        if (!display.isScreensaverEnabled) {
            if (timerRef.current) clearTimeout(timerRef.current);
            return;
        }

        const events = ['mousemove', 'mousedown', 'keypress', 'wheel', 'touchstart'];

        events.forEach(event => {
            document.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach(event => {
                document.removeEventListener(event, resetTimer);
            });
        };
    }, [resetTimer, display.isScreensaverEnabled]);
};
