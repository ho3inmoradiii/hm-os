import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
    Search,
    Wifi,
    BatteryMedium,
    Volume2,
    Command,
    Github
} from 'lucide-react';
import { useUIStore, useWindowStore } from '@store';
import { useTime } from '@hooks';
import { cn } from '@utils';
import { Tooltip } from '@components';

export const GlobalHeader = () => {
    const { toggleCommandPalette, toggleWindowSidebar } = useUIStore();
    const { time, date } = useTime();

    const windows = useWindowStore(state => state.windows);
    const minimizedCount = Object.values(windows).filter(w => w.isMinimized).length;
    const hasAnyWindow = Object.keys(windows).length > 0;

    const controls = useAnimation();

    useEffect(() => {
        if (hasAnyWindow) {
            controls.start({
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, -3, 3, 0],
                transition: { duration: 0.4, ease: "backOut" }
            });
        }
    }, [hasAnyWindow, controls]);

    const handleClick = () => {
        if (hasAnyWindow) {
            toggleWindowSidebar(true);
        } else {
            controls.start({
                x: [0, -4, 4, -4, 4, 0],
                transition: { duration: 0.3 }
            });
        }
    };

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 h-12 z-[5000]",
            "flex items-center justify-between px-3 sm:px-4",
            "bg-os-primary-bg backdrop-blur-md border-b border-os-primary-border",
            "text-os-primary-text transition-colors duration-300",
            "select-none"
        )}>
            {/* --- LEFT: Brand / Start --- */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                    <div className="w-6 h-6 bg-ph-orange rounded flex items-center justify-center text-white font-mono text-xs shadow-sm shadow-ph-orange/20">
                        P
                    </div>
                    <span className="hidden sm:block opacity-80">Product OS</span>
                </div>
            </div>

            {/* --- CENTER: Command Palette Trigger --- */}
            <button
                onClick={() => toggleCommandPalette(true)}
                className={cn(
                    "absolute left-1/2 -translate-x-1/2",
                    "flex items-center gap-2 rounded",
                    "p-2",
                    "hover:bg-os-primary-accent/50 text-os-primary-text/80 hover:text-os-primary-text",
                    "md:px-3 md:py-1.5",
                    "md:bg-os-tertiary-bg/50 md:border md:border-os-primary-border md:hover:bg-os-tertiary-bg",
                    "transition-all duration-200 group cursor-pointer",
                    "active:scale-95"
                )}
            >
                <Search
                    className="w-[16px] h-[16px] group-hover:text-ph-orange transition-colors"
                />
                <span className="text-xs text-os-primary-muted font-medium hidden md:inline-block">
            Search...
        </span>
                <span
                    className="hidden md:flex items-center gap-0.5 text-[10px] text-os-primary-muted font-mono bg-os-primary-bg px-1 rounded border border-os-primary-border ml-2">
           <Command size={10}/> K
        </span>
            </button>

            {/* --- RIGHT: Status Bar --- */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Minimized Windows Counter */}
                <Tooltip
                    enabled={minimizedCount === 0}
                    side="bottom"
                    align="end"
                    content={
                        <div className="text-center">
                            No minimized apps
                            <br/>
                            <span className="text-os-primary-muted text-[10px]">
                                (Use the <span className="font-bold">-</span> button on windows)
                            </span>
                        </div>
                    }
                >
                    <motion.button
                        animate={controls}
                        className={cn(
                            "min-w-6 h-6 px-1.5 ml-1 inline-flex justify-center items-center rounded-sm",
                            "border-[1.5px] border-t-4",
                            "transition-colors duration-200",
                            "border-os-primary-text/80 bg-os-primary-bg dark:bg-os-tertiary-bg text-os-primary-text hover:bg-os-primary-accent shadow-sm",
                            minimizedCount === 0 ? "hidden sm:inline-flex" : "inline-flex"
                        )}
                        onClick={() => handleClick()}
                    >
                        <span className="text-[11px] font-bold font-mono pt-[1px]">
                            {minimizedCount}
                        </span>
                    </motion.button>
                </Tooltip>

                {/* 1. Contact & Github (Desktop Only - md) */}
                <div className="hidden md:flex items-center gap-3">
                    <Tooltip content="Open Contact Info" side="bottom">
                        <button
                            onClick={() => window.open('mailto:me@example.com')}
                            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-os-primary-accent transition-colors"
                        >
                            <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-os-primary-text/90">Contact</span>
                        </button>
                    </Tooltip>

                    <Tooltip content="Check my Code" side="bottom">
                        <button
                            onClick={() => window.open('https://github.com/ho3inmoradiii', '_blank')}
                            className="flex items-center justify-center p-1.5 rounded hover:bg-os-primary-accent transition-colors text-os-primary-text/80 hover:text-os-primary-text"
                        >
                            <Github size={18} />
                        </button>
                    </Tooltip>

                    <div className="h-4 w-[1px] bg-os-primary-border" />
                </div>

                {/* 2. Control Center Icons */}
                <Tooltip content="Control Center" side="bottom">
                    <div className="flex items-center gap-2 sm:gap-3 px-1.5 sm:px-2 py-1 rounded hover:bg-os-primary-accent transition-colors cursor-default">
                        <Wifi size={14} strokeWidth={2.5} />
                        <Volume2 size={14} strokeWidth={2.5} className="hidden sm:block"/>
                        <BatteryMedium size={14} strokeWidth={2.5} />
                    </div>
                </Tooltip>

                {/* 3. Clock */}
                <div className="flex flex-col items-end leading-none min-w-[35px] sm:min-w-[60px]">
                    <span className="text-[12px] sm:text-[13px] font-bold font-mono tracking-wide">{time}</span>
                    <span className="text-[10px] sm:text-[11px] text-os-primary-muted font-medium hidden sm:block">
                        {date}
                    </span>
                </div>
            </div>
        </header>
    );
};
