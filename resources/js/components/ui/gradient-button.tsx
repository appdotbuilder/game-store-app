import React from 'react';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

export function GradientButton({ 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    children, 
    className,
    disabled,
    ...props 
}: GradientButtonProps) {
    const variants = {
        primary: 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
        secondary: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
        success: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
        danger: 'from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={cn(
                "bg-gradient-to-r text-white font-semibold rounded-xl transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl",
                variants[variant],
                sizes[size],
                (loading || disabled) && "pointer-events-none",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}