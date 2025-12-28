import { useState, useEffect } from 'react';
import { useSettingsStore } from '@store';

export const useResolvedTheme = () => {
    const { display } = useSettingsStore();
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        if (display.mode !== 'system') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResolvedTheme(display.mode);
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const update = () => {
            setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
        };

        update();

        mediaQuery.addEventListener('change', update);
        return () => mediaQuery.removeEventListener('change', update);

    }, [display.mode]);

    return resolvedTheme;
};
