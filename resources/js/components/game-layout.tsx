import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface GameLayoutProps {
    children: React.ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Background blur effect */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>
            
            {/* iOS-style blur navbar */}
            <nav className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🎮</span>
                            </div>
                            <span className="text-white font-semibold text-lg">GameStore</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link 
                                href="/" 
                                className="text-white/80 hover:text-white transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link 
                                href="/games" 
                                className="text-white/80 hover:text-white transition-colors duration-200"
                            >
                                Game Top Up
                            </Link>
                            <Link 
                                href="/vouchers" 
                                className="text-white/80 hover:text-white transition-colors duration-200"
                            >
                                Vouchers
                            </Link>
                            {auth.user && (
                                <Link 
                                    href="/transactions" 
                                    className="text-white/80 hover:text-white transition-colors duration-200"
                                >
                                    History
                                </Link>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="flex items-center space-x-3">
                                    <span className="text-white/80 text-sm">
                                        Hi, {auth.user.name}
                                    </span>
                                    <Link
                                        href="/dashboard"
                                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href="/login"
                                        className="text-white/80 hover:text-white transition-colors duration-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
}