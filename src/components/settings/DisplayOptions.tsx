import React from 'react';
import { Monitor, Moon, Sun, MousePointer, X, Minus, Play } from 'lucide-react';
import { WALLPAPERS, WALLPAPER_META } from '@constants';
import { useSettingsStore, useUIStore, type WallpaperId } from '@store';
import { cn } from '@utils';

interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean;
    icon?: React.ElementType;
}

const ToggleButton = ({ active, children, icon: Icon, className, ...props }: ToggleButtonProps) => (
    <button
        type="button"
        className={cn(
            "flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded text-xs font-medium transition-all",
            active
                ? "bg-os-surface text-os-main bg-os-primary-accent"
                : "border-transparent text-os-muted hover:text-os-main hover:bg-os-primary-accent",
            className
        )}
        {...props}
    >
        {Icon && <Icon size={14} />}
        {children}
    </button>
);

interface OptionGroupProps {
    label: string;
    children: React.ReactNode;
    className?: string;
    headerAction?: React.ReactNode;
}

const OptionGroup = ({ label, children, className, headerAction }: OptionGroupProps) => (
    <div className={cn("mb-5", className)}>
        <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-os-main opacity-80 select-none">
                {label}
            </label>

            {headerAction && (
                <div>{headerAction}</div>
            )}
        </div>

        <div className="flex items-center gap-2 bg-os-primary-bg p-1 rounded border border-os-input-border">
            {children}
        </div>
    </div>
);

// --- Main Component ---
export const DisplayOptions = () => {
    const {
        display,
        setDisplayMode,
        setCursor,
        toggleScreensaver,
        setWallpaper,
        setScreensaverTimeout
    } = useSettingsStore();

    const { setScreensaverActive } = useUIStore();


    return (
        <div className="w-full h-full bg-transparent text-os-primary-text font-sans p-4 overflow-y-auto">
            {/* 1. Color Mode */}
            <OptionGroup label="Color mode">
                <ToggleButton
                    active={display.mode === 'light'}
                    onClick={() => setDisplayMode('light')}
                    icon={Sun}
                >
                    Light
                </ToggleButton>
                <ToggleButton
                    active={display.mode === 'dark'}
                    onClick={() => setDisplayMode('dark')}
                    icon={Moon}
                >
                    Dark
                </ToggleButton>
                <ToggleButton
                    active={display.mode === 'system'}
                    onClick={() => setDisplayMode('system')}
                    icon={Monitor}
                >
                    Auto
                </ToggleButton>
            </OptionGroup>

            {/* 2. Cursor Style */}
            <OptionGroup label="Cursor">
                <ToggleButton
                    active={display.cursor === 'default'}
                    onClick={() => setCursor('default')}
                >
                    Default
                </ToggleButton>
                <ToggleButton
                    active={display.cursor === 'big'}
                    onClick={() => setCursor('big')}
                >
                    <MousePointer size={14} className="rotate-[-15deg]"/> Big
                </ToggleButton>
                <ToggleButton
                    active={display.cursor === 'rick'}
                    onClick={() => setCursor('rick')}
                >
                    <img
                        className="w-[20px] h-[20px] object-contain"
                        src="/cursors/rick-cursor.png"
                        alt="rick"
                    />
                </ToggleButton>
            </OptionGroup>

            {/* 3. Wallpapers */}
            <div className="mb-5 space-y-3">
                <label
                    className="block text-xs font-semibold text-os-main opacity-80 select-none">
                    Wallpaper
                </label>

                <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(WALLPAPERS) as WallpaperId[]).map((id) => (
                        <button
                            key={id}
                            onClick={() => setWallpaper(id)}
                            className={cn(
                                "relative group overflow-hidden rounded border-2 transition-all duration-200 aspect-video",
                                display.wallpaper === id
                                    ? "border-ph-orange shadow-md scale-[1.02]" // Active
                                    : "border-transparent opacity-70 hover:opacity-100 hover:border-os-main" // Inactive
                            )}
                        >
                            <img
                                src={WALLPAPERS[id]}
                                alt={WALLPAPER_META[id].label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div
                                className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-[2px] p-1 text-[10px] text-white font-medium translate-y-full group-hover:translate-y-0 transition-transform">
                                {WALLPAPER_META[id].label}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. Screen Saver */}
            <OptionGroup
                label="Screensaver"
                className={!display.isScreensaverEnabled ? "mb-0" : ""}
                headerAction={display.isScreensaverEnabled && (
                    <button
                        onClick={() => setScreensaverActive(true)}
                        className="flex items-center gap-1 block text-xs font-semibold text-os-main opacity-80 select-none"
                        title="Start Screensaver Immediately"
                    >
                        <Play size={10} className="fill-current"/>
                        Preview
                    </button>
                )}
            >
                <ToggleButton
                    active={!display.isScreensaverEnabled}
                    onClick={() => toggleScreensaver(false)}
                >
                    Disabled
                </ToggleButton>
                <ToggleButton
                    active={display.isScreensaverEnabled}
                    onClick={() => toggleScreensaver(true)}
                >
                    Enabled
                </ToggleButton>
            </OptionGroup>

            {/* 5. Screen Saver Time */}
            <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                display.isScreensaverEnabled ? "max-h-[100px] opacity-100 mt-2" : "max-h-0 opacity-0"
            )}>
                <OptionGroup label="Wait Time" className="mb-0">
                    <ToggleButton
                        active={display.screensaverTimeout === 60000}
                        onClick={() => setScreensaverTimeout(60000)}
                    >
                        1m
                    </ToggleButton>
                    <ToggleButton
                        active={display.screensaverTimeout === 300000}
                        onClick={() => setScreensaverTimeout(300000)}
                    >
                        5m
                    </ToggleButton>

                    {/* 15 Minutes */}
                    <ToggleButton
                        active={display.screensaverTimeout === 900000}
                        onClick={() => setScreensaverTimeout(900000)}
                    >
                        15m
                    </ToggleButton>

                    {/* 30 Minutes */}
                    <ToggleButton
                        active={display.screensaverTimeout === 1800000}
                        onClick={() => setScreensaverTimeout(1800000)}
                    >
                        30m
                    </ToggleButton>
                </OptionGroup>
            </div>
        </div>
    );
};
