import { useEffect } from 'react';
import { Monitor } from 'lucide-react';
import { useUIStore, useWindowStore } from '@store';

export const useGlobalShortcuts = () => {
    const { closeContextMenu } = useUIStore();

    const { openWindow, closeWindow, windows } = useWindowStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            switch (e.key) {
                case ',':
                    if (windows['settings']) {
                        closeWindow('settings');
                    } else {
                        openWindow('settings', {
                            title: 'Display Settings',
                            icon: Monitor,
                            size: { width: 350, height: 'auto' }
                        });
                    }
                    break;

                case '.':
                    console.log('Open Command Palette (Coming Soon)');
                    break;

                case 'Escape':
                    closeContextMenu();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [windows, openWindow, closeWindow, closeContextMenu]);
};
