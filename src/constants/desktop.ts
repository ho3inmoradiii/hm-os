import {
    Trash2,
    TrendingUp,
    Layers,
    User
} from 'lucide-react';
import React from "react";

export interface DesktopItem {
    id: string;
    label: string;

    icon: string | React.ElementType;
    type: 'image' | 'component';

    windowIcon?: React.ElementType;

    action?: 'link' | 'window';
    payload?: string;

    col: number;
    row: number;
}

export const DESKTOP_ITEMS: DesktopItem[] = [
    // --- 1. Impact ---
    {
        id: 'impact',
        label: 'Impact',
        icon: '/icons/impact.png',
        type: 'image',
        windowIcon: TrendingUp,

        action: 'window',
        payload: 'impact',
        col: 0, row: 0,
    },

    // --- 2. Trash ---
    {
        id: 'trash',
        label: 'Trash',
        icon: '/icons/trash.png',
        type: 'image',
        windowIcon: Trash2,

        action: 'window',
        payload: 'trash',
        col: 0, row: 5,
    },

    // --- 2. Stack ---
    {
        id: 'stack',
        label: 'Stack',
        icon: '/icons/handbook.png',
        type: 'image',
        windowIcon: Layers,

        action: 'window',
        payload: 'stack',
        col: 1, row: 0,
    },

    // --- 3. Profile ---
    {
        id: 'profile',
        label: 'Profile',
        icon: '/icons/folder.png',
        type: 'image',
        windowIcon: User,

        action: 'window',
        payload: 'profile',
        col: 2, row: 0,
    },
];
