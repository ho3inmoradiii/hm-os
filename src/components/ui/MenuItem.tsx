import React from 'react';
import { cn } from '@utils';

interface MenuItemProps {
    icon?: React.ElementType;
    label: string;
    shortcut?: string;
    onClick?: () => void;
    intent?: 'default' | 'danger';
}

export const MenuItem = ({ icon: Icon, label, shortcut, onClick, intent = 'default' }: MenuItemProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors duration-150 group outline-none",

                intent === 'default' && "text-os-main hover:bg-os-primary-accent focus:bg-os-primary-accent",

                intent === 'danger' && "text-red-500 hover:bg-red-500/10 hover:text-red-600 focus:bg-red-500/10"
            )}
        >
            <div className="flex items-center gap-2.5">
                {Icon && <Icon size={14} className={cn(
                    "opacity-70 group-hover:opacity-100 transition-opacity",
                    intent === 'danger' ? "text-red-500" : "text-os-muted group-hover:text-os-main"
                )} />}
                <span className="font-medium">{label}</span>
            </div>

            {shortcut && (
                <span className="flex items-center justify-center border border-os-tertiary-border rounded-sm w-4 h-5 text-sm font-mono text-os-muted opacity-60 group-hover:opacity-100 transition-opacity">
                    {shortcut}
                </span>
            )}
        </button>
    );
};
