import React from "react";
import { cn } from '@utils';
import { type ResizeDirection } from '@hooks';
export const ResizeHandle = ({
                                 dir,
                                 onInit
                             }: {
    dir: ResizeDirection;
    onInit: (e: React.MouseEvent, dir: ResizeDirection) => void
}) => {
    const positionClasses = {
        n: "top-0 left-2 right-2 h-2 cursor-ns-resize z-50",
        s: "bottom-0 left-2 right-2 h-2 cursor-ns-resize z-50",
        e: "right-0 top-2 bottom-2 w-2 cursor-ew-resize z-50",
        w: "left-0 top-2 bottom-2 w-2 cursor-ew-resize z-50",

        ne: "top-0 right-0 w-4 h-4 cursor-nesw-resize z-50",
        nw: "top-0 left-0 w-4 h-4 cursor-nwse-resize z-50",
        se: "bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50",
        sw: "bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-50",
    };

    return (
        <div
            className={cn("absolute bg-transparent hover:bg-ph-orange/50 transition-colors", positionClasses[dir])}
            onMouseDown={(e) => onInit(e, dir)}
        />
    );
};
