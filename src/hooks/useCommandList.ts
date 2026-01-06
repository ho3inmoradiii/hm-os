import { useMemo, useEffect, useState } from 'react';
import {
    Monitor, Moon, Sun, Laptop,
    Trash2, ExternalLink,
    MousePointer, Image as ImageIcon,
    type LucideIcon
} from 'lucide-react';
import { useUIStore, useSettingsStore, useWindowStore } from '@store';
import { LINKS, WALLPAPER_META, WALLPAPERS } from '@constants';

export interface CommandItem {
    id: string;
    label: string;
    icon: LucideIcon;
    action: () => void;
    show: boolean;
    shortcut?: string;
}

export const useCommandList = () => {
    const { setScreensaverActive } = useUIStore();

    const {
        setDisplayMode,
        display,
        setWallpaper,
        setCursor
    } = useSettingsStore();

    const { closeWindow, openWindow, windows } = useWindowStore();

    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch(window.matchMedia('(pointer: coarse)').matches);
        };

        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    const commands = useMemo<CommandItem[]>(() => {
        const baseCommands: CommandItem[] = [
            {
                id: 'theme-light',
                label: 'Theme: Light Mode',
                icon: Sun,
                shortcut: 'L',
                action: () => setDisplayMode('light'),
                show: display.mode !== 'light'
            },
            {
                id: 'theme-dark',
                label: 'Theme: Dark Mode',
                icon: Moon,
                shortcut: 'D',
                action: () => setDisplayMode('dark'),
                show: display.mode !== 'dark'
            },
            {
                id: 'theme-auto',
                label: 'Theme: System Default',
                icon: Laptop,
                action: () => setDisplayMode('system'),
                show: display.mode !== 'system'
            },
            {
                id: 'open-settings',
                label: 'Open Display Settings',
                icon: Monitor,
                action: () => openWindow('settings', {
                    title: 'Display Settings',
                    icon: Monitor,
                    size: { width: 350, height: 'auto' }
                }),
                show: !isTouch
            },
            {
                id: 'close-all',
                label: 'Close All Windows',
                icon: Trash2,
                action: () => Object.keys(windows).forEach(id => closeWindow(id)),
                show: !isTouch && Object.keys(windows).length > 0
            },
            {
                id: 'screensaver',
                label: 'Start Screensaver',
                icon: Monitor,
                action: () => setScreensaverActive(true),
                show: true
            },
            {
                id: 'github',
                label: 'Visit GitHub Repo',
                icon: ExternalLink,
                action: () => window.open(LINKS.GITHUB_REPO, '_blank'),
                show: true
            },
        ];

        const cursorCommands = isTouch ? [] : [
            {
                id: 'cursor-default',
                label: 'Cursor: Default',
                icon: MousePointer,
                action: () => setCursor('default'),
                show: display.cursor !== 'default'
            },
            {
                id: 'cursor-big',
                label: 'Cursor: Big Mac',
                icon: MousePointer,
                action: () => setCursor('big'),
                show: display.cursor !== 'big'
            },
            {
                id: 'cursor-rick',
                label: 'Cursor: Rick Sanchez',
                icon: MousePointer,
                action: () => setCursor('rick'),
                show: display.cursor !== 'rick'
            }
        ];

        const wallpaperCommands = (Object.keys(WALLPAPERS) as Array<keyof typeof WALLPAPERS>).map(id => ({
            id: `wallpaper-${id}`,
            label: `Wallpaper: ${WALLPAPER_META[id].label}`,
            icon: ImageIcon,
            action: () => setWallpaper(id),
            show: display.wallpaper !== id
        }));

        return [
            ...baseCommands,
            ...cursorCommands,
            ...wallpaperCommands
        ];

    }, [
        display.mode,
        display.cursor,
        display.wallpaper,
        windows,
        setDisplayMode,
        openWindow,
        closeWindow,
        setScreensaverActive,
        setCursor,
        setWallpaper,
        isTouch
    ]);

    return commands;
};
