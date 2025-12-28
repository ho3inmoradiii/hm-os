import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type ThemeMode = 'light' | 'dark' | 'system';
export type CursorType = 'default' | 'big' | 'rick';
export type WallpaperId = 'zilla' | 'nightCoding';

interface SettingsState {
    display: {
        mode: ThemeMode;
        theme: 'modern' | 'classic';
        cursor: CursorType;
        wallpaper: WallpaperId;
        isScreensaverEnabled: boolean;
        screensaverTimeout: number;
    };

    // Actions
    setDisplayMode: (mode: ThemeMode) => void;
    setCursor: (cursor: CursorType) => void;
    setWallpaper: (id: WallpaperId) => void;
    toggleScreensaver: (enabled: boolean) => void;
    setScreensaverTimeout: (ms: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        immer((set) => ({
            display: {
                mode: 'dark',
                theme: 'modern',
                cursor: 'default',
                wallpaper: 'zilla',
                isScreensaverEnabled: true,
                screensaverTimeout: 60000,
            },

            setDisplayMode: (mode) =>
                set((state) => { state.display.mode = mode; }),

            setCursor: (cursor) =>
                set((state) => { state.display.cursor = cursor; }),

            setWallpaper: (id) =>
                set((state) => { state.display.wallpaper = id; }),

            toggleScreensaver: (enabled) =>
                set((state) => {
                    state.display.isScreensaverEnabled = enabled;
                }),

            setScreensaverTimeout: (ms) =>
                set((state) => {
                    state.display.screensaverTimeout = ms;
                }),
        })),
        {
            name: 'moradi-os-settings',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
