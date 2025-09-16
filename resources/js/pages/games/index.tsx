import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { GameLayout } from '@/components/game-layout';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';

interface Game {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
    denominations: Array<{
        amount: number;
        price: number;
        currency: string;
    }>;
    is_active: boolean;
    server_type: string;
}

interface Props {
    games: Game[];
    [key: string]: unknown;
}

export default function GamesIndex({ games }: Props) {
    return (
        <GameLayout>
            <Head title="Game Top Up - GameStore" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            🎮 Game Top Up
                        </h1>
                        <p className="text-lg text-white/80 max-w-3xl mx-auto">
                            Choose your favorite game and top up instantly! ⚡ Fast delivery, secure payments, and the best rates guaranteed.
                        </p>
                    </div>

                    {/* Games Grid */}
                    {games.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {games.map((game) => (
                                <Link key={game.id} href={`/games/${game.slug}`}>
                                    <GlassCard className="overflow-hidden group">
                                        <div className="relative">
                                            <img 
                                                src={game.image_url} 
                                                alt={game.name}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-blue-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                                    🎯 Popular
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                {game.name}
                                            </h3>
                                            <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                                {game.description}
                                            </p>
                                            
                                            {/* Show price range */}
                                            {game.denominations.length > 0 && (
                                                <div className="mb-4">
                                                    <p className="text-blue-400 text-sm">
                                                        Starting from{' '}
                                                        <span className="font-semibold">
                                                            {new Intl.NumberFormat('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR'
                                                            }).format(Math.min(...game.denominations.map(d => d.price)))}
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                            
                                            <GradientButton size="sm" className="w-full">
                                                Top Up Now 🚀
                                            </GradientButton>
                                        </div>
                                    </GlassCard>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <GlassCard className="p-12 max-w-md mx-auto">
                                <div className="text-6xl mb-4">🎮</div>
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    No Games Available
                                </h3>
                                <p className="text-white/70 mb-6">
                                    We're adding more games soon! Check back later for awesome top-up deals.
                                </p>
                                <Link href="/">
                                    <GradientButton>
                                        Back to Home 🏠
                                    </GradientButton>
                                </Link>
                            </GlassCard>
                        </div>
                    )}

                    {/* Info Section */}
                    <div className="mt-16">
                        <div className="grid md:grid-cols-3 gap-8">
                            <GlassCard className="p-6 text-center">
                                <div className="text-3xl mb-3">⚡</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Instant Delivery
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Get your diamonds and coins delivered instantly to your game account
                                </p>
                            </GlassCard>

                            <GlassCard className="p-6 text-center">
                                <div className="text-3xl mb-3">🔒</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    100% Secure
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Safe and secure transactions with multiple payment options
                                </p>
                            </GlassCard>

                            <GlassCard className="p-6 text-center">
                                <div className="text-3xl mb-3">💎</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Best Prices
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Guaranteed lowest prices with exclusive deals and bonuses
                                </p>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}