import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { GameLayout } from '@/components/game-layout';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';

interface Game {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
    is_active: boolean;
}

interface Voucher {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
    price: number;
    currency: string;
    is_active: boolean;
}

interface Props {
    popularGames?: Game[];
    featuredVouchers?: Voucher[];
    [key: string]: unknown;
}

export default function Welcome({ popularGames = [], featuredVouchers = [] }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <GameLayout>
            <Head title="GameStore - Your Ultimate Gaming Destination 🎮" />

            {/* Hero Banner */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            🎮 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                GameStore
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                            Your ultimate gaming destination! ⚡ Top up your favorite games, buy vouchers, and level up your gaming experience with our premium services.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {auth.user ? (
                                <Link href="/games">
                                    <GradientButton size="lg" className="w-full sm:w-auto">
                                        🚀 Start Gaming Now
                                    </GradientButton>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <GradientButton size="lg" className="w-full sm:w-auto">
                                            🎯 Join GameStore
                                        </GradientButton>
                                    </Link>
                                    <Link href="/login">
                                        <GradientButton variant="secondary" size="lg" className="w-full sm:w-auto">
                                            🔐 Sign In
                                        </GradientButton>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            🌟 Why Choose GameStore?
                        </h2>
                        <p className="text-lg text-white/70">
                            Everything you need for an amazing gaming experience
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <GlassCard className="p-8 text-center">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold text-white mb-3">Instant Top Up</h3>
                            <p className="text-white/70">
                                Get your diamonds, coins, and UC instantly delivered to your game account
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 text-center">
                            <div className="text-4xl mb-4">🎁</div>
                            <h3 className="text-xl font-semibold text-white mb-3">Premium Vouchers</h3>
                            <p className="text-white/70">
                                Steam, PlayStation, Xbox, and more - all your favorite gaming vouchers
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 text-center">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold text-white mb-3">Secure & Fast</h3>
                            <p className="text-white/70">
                                Safe transactions with multiple payment methods and instant delivery
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Popular Games */}
            {popularGames.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                🔥 Popular Games
                            </h2>
                            <p className="text-lg text-white/70">
                                Top up your favorite games with the best rates
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularGames.map((game) => (
                                <Link key={game.id} href={`/games/${game.slug}`}>
                                    <GlassCard className="overflow-hidden">
                                        <img 
                                            src={game.image_url} 
                                            alt={game.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                {game.name}
                                            </h3>
                                            <p className="text-white/70 text-sm mb-4">
                                                {game.description.substring(0, 100)}...
                                            </p>
                                            <GradientButton size="sm" className="w-full">
                                                Top Up Now 🎮
                                            </GradientButton>
                                        </div>
                                    </GlassCard>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/games">
                                <GradientButton variant="secondary" size="lg">
                                    View All Games 🎯
                                </GradientButton>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Vouchers */}
            {featuredVouchers.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                🎁 Featured Vouchers
                            </h2>
                            <p className="text-lg text-white/70">
                                Premium vouchers for all your gaming needs
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredVouchers.map((voucher) => (
                                <Link key={voucher.id} href={`/vouchers/${voucher.slug}`}>
                                    <GlassCard className="overflow-hidden">
                                        <img 
                                            src={voucher.image_url} 
                                            alt={voucher.name}
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                {voucher.name.split(' - ')[0]}
                                            </h3>
                                            <p className="text-2xl font-bold text-blue-400 mb-3">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: voucher.currency
                                                }).format(voucher.price)}
                                            </p>
                                            <GradientButton size="sm" className="w-full">
                                                Buy Now 💳
                                            </GradientButton>
                                        </div>
                                    </GlassCard>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/vouchers">
                                <GradientButton variant="secondary" size="lg">
                                    View All Vouchers 🎫
                                </GradientButton>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <GlassCard className="p-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Level Up? 🚀
                        </h2>
                        <p className="text-lg text-white/80 mb-8">
                            Join thousands of gamers who trust GameStore for their gaming needs. 
                            Fast, secure, and always reliable!
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <GradientButton size="lg" className="w-full sm:w-auto">
                                        🎮 Get Started Free
                                    </GradientButton>
                                </Link>
                                <Link href="/login">
                                    <GradientButton variant="secondary" size="lg" className="w-full sm:w-auto">
                                        Already a gamer? Sign In
                                    </GradientButton>
                                </Link>
                            </div>
                        )}

                        {auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/games">
                                    <GradientButton size="lg" className="w-full sm:w-auto">
                                        🎯 Browse Games
                                    </GradientButton>
                                </Link>
                                <Link href="/vouchers">
                                    <GradientButton variant="secondary" size="lg" className="w-full sm:w-auto">
                                        🎁 Shop Vouchers
                                    </GradientButton>
                                </Link>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </section>
        </GameLayout>
    );
}