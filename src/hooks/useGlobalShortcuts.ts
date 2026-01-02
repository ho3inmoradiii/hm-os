import { useEffect } from 'react';
import { Monitor } from 'lucide-react';
import { useUIStore, useWindowStore, useSettingsStore } from '@store';

export const useGlobalShortcuts = () => {
    const { toggleCommandPalette, isCommandPaletteOpen, closeContextMenu, setScreensaverActive } = useUIStore();
    const { openWindow, closeWindow, windows } = useWindowStore();
    const { setDisplayMode } = useSettingsStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement
            ) {
                return;
            }

            const activeId = useWindowStore.getState().activeWindowId;

            if (e.altKey && e.key.toLowerCase() === 'w') {
                e.preventDefault();
                if (activeId) {
                    closeWindow(activeId);
                }
                return;
            }

            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                toggleCommandPalette(!isCommandPaletteOpen);
            }

            if (e.key === 'Escape') {
                closeContextMenu()
                if (isCommandPaletteOpen) toggleCommandPalette(false);
            }

            switch (e.key) {
                case ',':
                    if (windows['settings']) {
                        closeWindow('settings');
                    } else {
                        openWindow('settings', {
                            title: 'Display options',
                            icon: Monitor,
                            size: { width: 350, height: 'auto' },
                            allowMaximize: false,
                        });
                    }
                    break;

                case '.':
                    console.log('Open Command Palette (Coming Soon)');
                    break;
            }

            switch (e.key.toLowerCase()) {

                case 'l': // Light Mode
                    setDisplayMode('light');
                    break;

                case 'd': // Dark Mode
                    setDisplayMode('dark');
                    break;

                case 'delete': // (Close All)
                    if (Object.keys(useWindowStore.getState().windows).length > 0) {
                        Object.keys(useWindowStore.getState().windows).forEach(id => closeWindow(id));
                    }
                    break;

                case 's': // Screensaver
                    setScreensaverActive(true);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [windows, openWindow, closeWindow, closeContextMenu, toggleCommandPalette, isCommandPaletteOpen, setDisplayMode, setScreensaverActive]);
};
