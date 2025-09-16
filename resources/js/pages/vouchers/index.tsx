import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { GameLayout } from '@/components/game-layout';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { type SharedData } from '@/types';

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
    vouchers: Voucher[];
    [key: string]: unknown;
}

export default function VouchersIndex({ vouchers }: Props) {
    const { auth } = usePage<SharedData>().props;

    const handleBuyVoucher = (voucher: Voucher) => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        const transactionData = {
            type: 'voucher',
            item_name: voucher.name,
            item_details: {
                voucher_id: voucher.id,
                voucher_name: voucher.name,
            },
            amount: voucher.price,
            currency: voucher.currency
        };

        router.post('/transactions', transactionData);
    };

    return (
        <GameLayout>
            <Head title="Vouchers - GameStore" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            🎁 Gaming Vouchers
                        </h1>
                        <p className="text-lg text-white/80 max-w-3xl mx-auto">
                            Get the best deals on gaming vouchers! 💳 Steam, PlayStation, Xbox, and more - all with instant delivery.
                        </p>
                    </div>

                    {/* Vouchers Grid */}
                    {vouchers.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {vouchers.map((voucher) => (
                                <GlassCard key={voucher.id} className="overflow-hidden group">
                                    <div className="relative">
                                        <img 
                                            src={voucher.image_url} 
                                            alt={voucher.name}
                                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-green-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                                ⚡ Instant
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {voucher.name.split(' - ')[0]}
                                        </h3>
                                        
                                        <div className="mb-4">
                                            <div className="text-2xl font-bold text-blue-400 mb-1">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: voucher.currency
                                                }).format(voucher.price)}
                                            </div>
                                            <div className="text-white/60 text-xs">
                                                Digital delivery
                                            </div>
                                        </div>
                                        
                                        <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                            {voucher.description}
                                        </p>
                                        
                                        <GradientButton 
                                            size="sm" 
                                            className="w-full"
                                            onClick={() => handleBuyVoucher(voucher)}
                                        >
                                            {auth.user ? 'Buy Now 🛒' : 'Login to Buy 🔐'}
                                        </GradientButton>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <GlassCard className="p-12 max-w-md mx-auto">
                                <div className="text-6xl mb-4">🎁</div>
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    No Vouchers Available
                                </h3>
                                <p className="text-white/70 mb-6">
                                    We're adding more vouchers soon! Check back later for amazing deals.
                                </p>
                                <Link href="/">
                                    <GradientButton>
                                        Back to Home 🏠
                                    </GradientButton>
                                </Link>
                            </GlassCard>
                        </div>
                    )}

                    {/* Popular Voucher Categories */}
                    <div className="mt-16">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                🔥 Popular Categories
                            </h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <GlassCard className="p-6 text-center">
                                <div className="text-4xl mb-3">🎮</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Steam Wallet
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Top up your Steam wallet for games, DLCs, and more
                                </p>
                            </GlassCard>

                            <GlassCard className="p-6 text-center">
                                <div className="text-4xl mb-3">🎯</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    PlayStation
                                </h3>
                                <p className="text-white/70 text-sm">
                                    PSN cards for games, PS Plus, and PlayStation Store
                                </p>
                            </GlassCard>

                            <GlassCard className="p-6 text-center">
                                <div className="text-4xl mb-3">📱</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Mobile Gaming
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Google Play and App Store cards for mobile games
                                </p>
                            </GlassCard>

                            <GlassCard className="p-6 text-center">
                                <div className="text-4xl mb-3">🎪</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Xbox Gaming
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Xbox Game Pass and Microsoft Store credits
                                </p>
                            </GlassCard>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-16">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                ✨ Why Choose Our Vouchers?
                            </h2>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <GlassCard className="p-6 text-center">
                                <div className="text-3xl mb-3">⚡</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Instant Delivery
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Get your voucher codes immediately after payment
                                </p>
                            </GlassCard>

                            <GlassCard className="p-6 text-center">
                                <div className="text-3xl mb-3">💰</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Best Prices
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Competitive rates with exclusive discounts and deals
                                </p>
                            </GlassCard>

                            <GlassCard className="p-6 text-center">
                                <div className="text-3xl mb-3">🛡️</div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Guaranteed Valid
                                </h3>
                                <p className="text-white/70 text-sm">
                                    All voucher codes are authentic and fully guaranteed
                                </p>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}