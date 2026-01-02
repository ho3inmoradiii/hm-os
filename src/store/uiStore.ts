import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";

interface ContextMenuState {
    isOpen: boolean;
    position: { x: number; y: number };
    content: 'desktop' | 'icon' | null;
}

interface UIStore {
    // --- Context Menu ---
    contextMenu: ContextMenuState;
    openContextMenu: (x: number, y: number, content?: 'desktop' | 'icon') => void;
    closeContextMenu: () => void;

    // --- Screensaver ---
    isScreensaverActive: boolean;
    setScreensaverActive: (active: boolean) => void;

    // --- Window Sidebar ---
    isWindowSidebarOpen: boolean;
    toggleWindowSidebar: (active: boolean) => void;

    // --- Command Palette ---
    isCommandPaletteOpen: boolean;
    toggleCommandPalette: (isOpen: boolean) => void;
}

export const useUIStore = create<UIStore>()(
    immer((set) => ({
        contextMenu: {
            isOpen: false,
            position: { x: 0, y: 0 },
            content: null,
        },
        isScreensaverActive: false,
        isWindowSidebarOpen: false,
        isCommandPaletteOpen: false,

        setScreensaverActive: (active) => set({ isScreensaverActive: active }),

        toggleWindowSidebar: (active) => set({ isWindowSidebarOpen: active }),

        toggleCommandPalette: (isOpen) => set({ isCommandPaletteOpen: isOpen }),

        openContextMenu: (x, y, content = 'desktop') =>
            set((state) => {
                state.contextMenu.isOpen = true;
                state.contextMenu.position = { x, y };
                state.contextMenu.content = content;
            }),

        closeContextMenu: () =>
            set((state) => {
                state.contextMenu.isOpen = false;
            }),
    }))
);
