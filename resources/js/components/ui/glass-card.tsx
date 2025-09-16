import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
    return (
        <div
            className={cn(
                "bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl",
                hover && "hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                className
            )}
        >
            {children}
        </div>
    );
}