import React from 'react';
import { WALLPAPERS, WALLPAPER_META } from '@constants';
import { useSettingsStore } from '@store';
import { useResolvedTheme } from '@hooks';
import { cn } from '@utils';

export const DesktopBackground = () => {
    const { display } = useSettingsStore();
    const resolvedTheme = useResolvedTheme();

    const currentSrc = WALLPAPERS[display.wallpaper];
    const currentMeta = WALLPAPER_META[display.wallpaper];

    const backgroundColor = React.useMemo(() => {
        const colorData = currentMeta.color;

        if (typeof colorData === 'string') {
            return colorData;
        }

        return resolvedTheme === 'dark' ? colorData.dark : colorData.light;
    }, [currentMeta, resolvedTheme]);

    return (
        <div
            className="fixed inset-0 -z-50 overflow-hidden transition-colors duration-700 ease-in-out"
            style={{ backgroundColor }}
        >
            <div className="absolute inset-0 flex items-end justify-end">
                <img
                    key={display.wallpaper}
                    src={currentSrc}
                    alt="Wallpaper"
                    className={cn(
                        "w-full h-auto",
                        "md:w-auto md:max-h-[75vh] lg:max-h-[85vh]",
                        "object-bottom object-contain transition-opacity duration-700",
                        "animate-in fade-in zoom-in-95 duration-700"
                    )}
                    draggable={false}
                />

            </div>
            <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-overlay" />
        </div>
    );
};
