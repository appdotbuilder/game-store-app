import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { GameLayout } from '@/components/game-layout';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { type SharedData } from '@/types';

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
    game: Game;
    [key: string]: unknown;
}

interface FormData {
    user_id: string;
    server: string;
    denomination: number;
    price: number;
}

export default function GameShow({ game }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [formData, setFormData] = useState<FormData>({
        user_id: '',
        server: '',
        denomination: 0,
        price: 0
    });
    const [selectedDenomination, setSelectedDenomination] = useState<typeof game.denominations[0] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDenominationSelect = (denomination: typeof game.denominations[0]) => {
        setSelectedDenomination(denomination);
        setFormData(prev => ({
            ...prev,
            denomination: denomination.amount,
            price: denomination.price
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        if (!selectedDenomination || !formData.user_id) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);

        const transactionData = {
            type: 'game_topup',
            item_name: `${game.name} - ${selectedDenomination.amount} ${selectedDenomination.currency}`,
            item_details: {
                game_id: game.id,
                game_name: game.name,
                user_id: formData.user_id,
                server: formData.server,
                denomination: selectedDenomination.amount,
                currency_type: selectedDenomination.currency
            },
            amount: selectedDenomination.price,
            currency: 'IDR'
        };

        router.post('/transactions', transactionData, {
            onFinish: () => setLoading(false),
            onError: () => setLoading(false)
        });
    };

    return (
        <GameLayout>
            <Head title={`${game.name} - Top Up | GameStore`} />

            <div className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Game Info */}
                        <div>
                            <GlassCard className="overflow-hidden">
                                <img 
                                    src={game.image_url} 
                                    alt={game.name}
                                    className="w-full h-64 lg:h-80 object-cover"
                                />
                                <div className="p-8">
                                    <h1 className="text-3xl font-bold text-white mb-4">
                                        {game.name}
                                    </h1>
                                    <p className="text-white/80 leading-relaxed mb-6">
                                        {game.description}
                                    </p>
                                    
                                    <div className="flex items-center space-x-4">
                                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                                            ⚡ Instant Delivery
                                        </span>
                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                                            🔒 100% Safe
                                        </span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Top Up Form */}
                        <div>
                            <GlassCard className="p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    🚀 Top Up {game.name}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* User ID */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            User ID *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.user_id}
                                            onChange={(e) => setFormData(prev => ({...prev, user_id: e.target.value}))}
                                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your game User ID"
                                            required
                                        />
                                    </div>

                                    {/* Server */}
                                    {game.server_type === 'region' && (
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Server/Region *
                                            </label>
                                            <select
                                                value={formData.server}
                                                onChange={(e) => setFormData(prev => ({...prev, server: e.target.value}))}
                                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Select Server</option>
                                                <option value="asia">Asia</option>
                                                <option value="europe">Europe</option>
                                                <option value="america">America</option>
                                                <option value="sea">Southeast Asia</option>
                                            </select>
                                        </div>
                                    )}

                                    {game.server_type === 'server_id' && (
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Server ID *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.server}
                                                onChange={(e) => setFormData(prev => ({...prev, server: e.target.value}))}
                                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter Server ID"
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Denominations */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-4">
                                            Choose Amount *
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {game.denominations.map((denomination, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleDenominationSelect(denomination)}
                                                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                                        selectedDenomination?.amount === denomination.amount
                                                            ? 'border-blue-500 bg-blue-500/20'
                                                            : 'border-white/20 bg-white/5 hover:border-white/40'
                                                    }`}
                                                >
                                                    <div className="text-white font-semibold">
                                                        {denomination.amount} {denomination.currency}
                                                    </div>
                                                    <div className="text-blue-400 text-sm">
                                                        {new Intl.NumberFormat('id-ID', {
                                                            style: 'currency',
                                                            currency: 'IDR'
                                                        }).format(denomination.price)}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    {selectedDenomination && (
                                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                            <h3 className="text-white font-semibold mb-2">Order Summary</h3>
                                            <div className="flex justify-between text-white/80 text-sm mb-1">
                                                <span>Item:</span>
                                                <span>{selectedDenomination.amount} {selectedDenomination.currency}</span>
                                            </div>
                                            <div className="flex justify-between text-white font-semibold text-lg">
                                                <span>Total:</span>
                                                <span className="text-blue-400">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR'
                                                    }).format(selectedDenomination.price)}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <GradientButton 
                                        type="submit" 
                                        className="w-full" 
                                        size="lg"
                                        loading={loading}
                                        disabled={!selectedDenomination || !formData.user_id}
                                    >
                                        {auth.user ? '🛒 Proceed to Payment' : '🔐 Login to Continue'}
                                    </GradientButton>
                                </form>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}