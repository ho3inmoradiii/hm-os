import { useEffect } from 'react';
import { useUIStore } from '@store';

export const useGlobalShortcuts = () => {
    const { toggleDisplayModal, modals, closeContextMenu } = useUIStore();

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
                    toggleDisplayModal(!modals.isDisplayOpen);
                    break;

                case '.':
                    console.log('Open Command Palette (Coming Soon)');
                    break;

                case 'Escape':
                    closeContextMenu();
                    if (modals.isDisplayOpen) toggleDisplayModal(false);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [modals.isDisplayOpen, toggleDisplayModal, closeContextMenu]);
};
