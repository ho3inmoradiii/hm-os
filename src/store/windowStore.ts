import React from "react";
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface WindowState {
    id: string;
    title: string;
    icon?: React.ElementType;
    component: React.ElementType;

    position: { x: number; y: number };
    size: { width: number | string; height: number | string; };

    zIndex: number;
    isMinimized: boolean;
    isMaximized: boolean;
    allowMaximize: boolean;
}

interface WindowStore {
    windows: Record<string, WindowState>;
    activeWindowId: string | null;
    nextZIndex: number;

    // Actions
    openWindow: (id: string, config: Partial<WindowState>) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    moveWindow: (id: string, position: { x: number; y: number }) => void;
    resizeWindow: (id: string, size: { width: number | string; height: number | string }) => void;
    snapWindow: (id: string, direction: 'left' | 'right' | 'maximize') => void;
    toggleMaximize: (id: string) => void;
}

export const useWindowStore = create<WindowStore>()(
    immer((set) => ({
        windows: {},
        activeWindowId: null,
        nextZIndex: 100,

        openWindow: (id, config) =>
            set((state) => {
                if (state.windows[id]) {
                    state.activeWindowId = id;
                    state.windows[id].isMinimized = false;
                    state.windows[id].zIndex = state.nextZIndex++;
                    return;
                }

                state.windows[id] = {
                    id,
                    title: 'New Window',
                    component: () => null,
                    position: { x: 50, y: 50 },
                    size: { width: 600, height: 400 },
                    zIndex: state.nextZIndex++,
                    isMinimized: false,
                    isMaximized: false,
                    allowMaximize: true,
                    ...config,
                };
                state.activeWindowId = id;
            }),

        closeWindow: (id) =>
            set((state) => {
                delete state.windows[id];
                if (state.activeWindowId === id) {
                    state.activeWindowId = null;
                }
            }),

        focusWindow: (id) =>
            set((state) => {
                if (state.windows[id]) {
                    state.activeWindowId = id;
                    state.windows[id].zIndex = state.nextZIndex++;
                    state.windows[id].isMinimized = false;
                }
            }),

        minimizeWindow: (id) =>
            set((state) => {
                if (state.windows[id]) {
                    state.windows[id].isMinimized = true;
                    state.activeWindowId = null;
                }
            }),

        moveWindow: (id, position) =>
            set((state) => {
                if (state.windows[id]) {
                    state.windows[id].position = position;
                }
            }),

        resizeWindow: (id, size) =>
            set((state) => {
                if (state.windows[id]) {
                    state.windows[id].size = size;
                }
            }),

        toggleMaximize: (id) => set((state) => {
            const window = state.windows[id];
            if (!window) return state;

            return {
                windows: {
                    ...state.windows,
                    [id]: {
                        ...window,
                        isMaximized: !window.isMaximized
                    }
                }
            };
        }),

        snapWindow: (id, direction) => set((state) => {
            const targetWindow = state.windows[id];
            if (!targetWindow) return state;

            const viewportW = window.innerWidth;
            const viewportH = window.innerHeight;

            const HEADER_HEIGHT_FOR_CALC = 48;

            const TOP_OFFSET = 0;

            let newSize = { width: 0, height: 0 };
            let newPos = { x: 0, y: 0 };

            if (direction === 'maximize') {
                return {
                    windows: {
                        ...state.windows,
                        [id]: { ...targetWindow, isMaximized: !targetWindow.isMaximized }
                    }
                };
            }

            const availableH = viewportH - HEADER_HEIGHT_FOR_CALC;

            const halfW = viewportW / 2;

            if (direction === 'left') {
                newSize = { width: halfW, height: availableH };
                newPos = { x: 0, y: TOP_OFFSET };
            } else if (direction === 'right') {
                newSize = { width: halfW, height: availableH };
                newPos = { x: viewportW / 2, y: TOP_OFFSET };
            }

            return {
                windows: {
                    ...state.windows,
                    [id]: {
                        ...targetWindow,
                        isMaximized: false,
                        size: newSize,
                        position: newPos
                    }
                }
            };
        }),
    }))
);
