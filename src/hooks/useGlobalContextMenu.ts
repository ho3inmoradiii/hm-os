import {useEffect} from "react";
import {useUIStore} from "@store";

export const useGlobalContextMenu = () => {
    const { openContextMenu, closeContextMenu } = useUIStore();

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            openContextMenu(e.clientX, e.clientY, 'desktop');
        };

        const handleClick = () => {
            closeContextMenu();
        }

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        document.addEventListener('scroll', handleClick);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('scroll', handleClick);
        }
    }, [openContextMenu, closeContextMenu]);
}
