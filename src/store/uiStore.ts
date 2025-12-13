import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";

interface ContextMenuState {
    isOpen: boolean;
    position: { x: number; y: number };
    content: 'desktop' | 'icon' | null;
}

interface UIStore {
    contextMenu: ContextMenuState;

    openContextMenu: (x: number, y: number, content?: 'desktop' | 'icon') => void;
    closeContextMenu: () => void
}

export const useUIStore = create<UIStore>()(
    immer((set) => ({
        contextMenu: {
            isOpen: false,
            position: { x:0, y: 0 },
            content: null,
        },

        openContextMenu: (x, y, content = 'desktop') =>
            set((state) => {
                state.contextMenu.isOpen = true;
                state.contextMenu.position = { x, y };
                state.contextMenu.content = content;
            }),

        closeContextMenu: () =>
            set((state) => {
                state.contextMenu.isOpen = false;
            })
    }))
)
