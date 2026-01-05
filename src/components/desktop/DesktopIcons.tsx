import React from 'react';
import { useWindowStore } from '@store';
import { DESKTOP_ITEMS, type DesktopItem } from '@constants';
import { DesktopIconItem } from '@components';

export const DesktopIcons = () => {
    const { openWindow } = useWindowStore();

    const handleOpen = (item: DesktopItem) => {
        if (item.action === 'link' && item.payload) {
            window.open(item.payload, '_blank');
        } else if (item.payload) {
            let headerIcon = item.windowIcon;

            if (!headerIcon && item.type === 'component') {
                headerIcon = item.icon as React.ElementType;
            }

            openWindow(item.payload, {
                title: item.label,
                icon: headerIcon,
                size: { width: 1000, height: 600 }
            });
        }
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {DESKTOP_ITEMS.map((item) => (
                <DesktopIconItem
                    key={item.id}
                    item={item}
                    onOpen={handleOpen}
                />
            ))}
        </div>
    );
};
