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
    is_active: boolean;
    created_at: string;
    denominations: Array<{
        amount: number;
        price: number;
        currency: string;
    }>;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
}

interface Props {
    games: {
        data: Game[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function AdminGamesIndex({ games }: Props) {
    return (
        <GameLayout>
            <Head title="Admin - Manage Games | GameStore" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                🎮 Manage Games
                            </h1>
                            <p className="text-white/80">
                                Add, edit, and manage all available games for top-up
                            </p>
                        </div>
                        <Link href="/admin/games/create">
                            <GradientButton>
                                ➕ Add New Game
                            </GradientButton>
                        </Link>
                    </div>

                    {/* Admin Navigation */}
                    <div className="mb-8">
                        <GlassCard className="p-4">
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link href="/admin/games" className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg border-2 border-blue-500/40">
                                    🎮 Games
                                </Link>
                                <Link href="/admin/vouchers" className="bg-white/5 text-white/70 px-4 py-2 rounded-lg border-2 border-transparent hover:bg-white/10">
                                    🎁 Vouchers
                                </Link>
                                <Link href="/admin/transactions" className="bg-white/5 text-white/70 px-4 py-2 rounded-lg border-2 border-transparent hover:bg-white/10">
                                    📊 Transactions
                                </Link>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Games List */}
                    {games.data.length > 0 ? (
                        <div className="space-y-4">
                            {games.data.map((game) => (
                                <GlassCard key={game.id} className="p-6">
                                    <div className="grid md:grid-cols-4 gap-6 items-center">
                                        <div className="md:col-span-1">
                                            <img 
                                                src={game.image_url} 
                                                alt={game.name}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                        </div>
                                        
                                        <div className="md:col-span-2">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold text-white">
                                                    {game.name}
                                                </h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    game.is_active 
                                                        ? 'bg-green-500/20 text-green-400' 
                                                        : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                    {game.is_active ? '✅ Active' : '❌ Inactive'}
                                                </span>
                                            </div>
                                            
                                            <p className="text-white/70 text-sm mb-3 line-clamp-2">
                                                {game.description}
                                            </p>
                                            
                                            <div className="text-white/60 text-xs">
                                                {game.denominations.length} denomination(s) • Created {new Date(game.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        
                                        <div className="md:col-span-1 flex flex-col gap-2">
                                            <Link href={`/admin/games/${game.id}`}>
                                                <GradientButton variant="secondary" size="sm" className="w-full">
                                                    👁️ View
                                                </GradientButton>
                                            </Link>
                                            <Link href={`/admin/games/${game.id}/edit`}>
                                                <GradientButton size="sm" className="w-full">
                                                    ✏️ Edit
                                                </GradientButton>
                                            </Link>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <GlassCard className="p-12 max-w-md mx-auto">
                                <div className="text-6xl mb-4">🎮</div>
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    No Games Found
                                </h3>
                                <p className="text-white/70 mb-6">
                                    Start by adding your first game to the platform.
                                </p>
                                <Link href="/admin/games/create">
                                    <GradientButton>
                                        ➕ Add Your First Game
                                    </GradientButton>
                                </Link>
                            </GlassCard>
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <GlassCard className="p-6 text-center">
                            <div className="text-3xl mb-2">📊</div>
                            <div className="text-2xl font-bold text-blue-400 mb-1">
                                {games.meta.total}
                            </div>
                            <div className="text-white/70 text-sm">Total Games</div>
                        </GlassCard>

                        <GlassCard className="p-6 text-center">
                            <div className="text-3xl mb-2">✅</div>
                            <div className="text-2xl font-bold text-green-400 mb-1">
                                {games.data.filter(game => game.is_active).length}
                            </div>
                            <div className="text-white/70 text-sm">Active Games</div>
                        </GlassCard>

                        <GlassCard className="p-6 text-center">
                            <div className="text-3xl mb-2">❌</div>
                            <div className="text-2xl font-bold text-red-400 mb-1">
                                {games.data.filter(game => !game.is_active).length}
                            </div>
                            <div className="text-white/70 text-sm">Inactive Games</div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}