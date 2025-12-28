import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";

interface ContextMenuState {
    isOpen: boolean;
    position: { x: number; y: number };
    content: 'desktop' | 'icon' | null;
}

interface UIStore {
    contextMenu: ContextMenuState;

    modals: {
        isDisplayOpen: boolean;
    };

    openContextMenu: (x: number, y: number, content?: 'desktop' | 'icon') => void;
    closeContextMenu: () => void;

    toggleDisplayModal: (isOpen: boolean) => void;

    isScreensaverActive: boolean;
    setScreensaverActive: (active: boolean) => void;
}

export const useUIStore = create<UIStore>()(
    immer((set) => ({
        contextMenu: {
            isOpen: false,
            position: { x:0, y: 0 },
            content: null,
        },

        modals: {
            isDisplayOpen: false,
        },

        isScreensaverActive: false,

        setScreensaverActive: (active) => set({ isScreensaverActive: active }),

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

        toggleDisplayModal: (isOpen) =>
            set((state) => {
                state.modals.isDisplayOpen = isOpen;
                if (isOpen) state.contextMenu.isOpen = false;
            }),
    }))
)
