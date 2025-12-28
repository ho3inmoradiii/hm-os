import { useEffect } from 'react';
import { useSettingsStore } from '@store';
import { useResolvedTheme } from "@hooks";

export const useSystemAppearance = () => {
    const { display } = useSettingsStore();
    const currentTheme = useResolvedTheme();

    useEffect(() => {
        const body = document.body;
        body.classList.remove('cursor-default', 'cursor-big', 'cursor-rick');
        body.classList.add(`cursor-${display.cursor}`);
    }, [display.cursor]);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(currentTheme);
    }, [currentTheme]);
};
