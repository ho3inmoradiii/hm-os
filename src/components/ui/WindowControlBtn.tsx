import React from 'react';
import { cn } from '@utils';

interface WindowControlBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ElementType;
    intent?: 'default' | 'danger';
}

export const WindowControlBtn = ({ icon: Icon, intent = 'default', className, ...props }: WindowControlBtnProps) => (
    <button
        type="button"
        className={cn(
            "p-1.5 rounded-md transition-colors duration-200 ease-in-out border border-transparent",
            "text-os-muted",

            intent === 'danger'
                ? "hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20"
                : "hover:bg-os-accent hover:text-os-main hover:border-os-primary-border",
            className
        )}
        {...props}
    >
        <Icon size={14} />
    </button>
);
