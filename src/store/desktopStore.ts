import { create } from 'zustand';
import { DESKTOP_ITEMS, type DesktopItem } from '@constants';

interface DesktopState {
    items: DesktopItem[];
    resetSignal: number;

    updateItemPosition: (id: string, newCol: number, newRow: number) => void;
    resetIcons: () => void;
}

export const useDesktopStore = create<DesktopState>((set) => ({
    items: DESKTOP_ITEMS,
    resetSignal: 0,

    updateItemPosition: (id, newCol, newRow) => set((state) => ({
        items: state.items.map((item) =>
            item.id === id ? { ...item, col: newCol, row: newRow } : item
        ),
    })),

    resetIcons: () => set((state) => ({
        items: DESKTOP_ITEMS,
        resetSignal: state.resetSignal + 1
    })),
}));
