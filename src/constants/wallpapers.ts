import { type WallpaperId } from '@store';

type AdaptiveColor = string | { light: string; dark: string };

export const WALLPAPERS: Record<WallpaperId, string> = {
    zilla: '/wallpapers/zilla.png',
    nightCoding: '/wallpapers/nightCoding.png',
};

export const WALLPAPER_META: Record<WallpaperId, { label: string; color: AdaptiveColor }> = {
    zilla: {
        label: 'Zilla',
        color: {
            light: '#F3F4EF',
            dark: '#1D1F27'
        }
    },
    nightCoding: { label: 'Night Shift', color: 'rgb(84 97 142)' },
};
