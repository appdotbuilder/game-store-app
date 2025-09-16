import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { GameLayout } from '@/components/game-layout';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';

interface Transaction {
    id: number;
    order_id: string;
    type: string;
    item_name: string;
    amount: number;
    currency: string;
    status: 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';
    payment_method: string | null;
    created_at: string;
    paid_at: string | null;
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
}

interface Props {
    transactions: {
        data: Transaction[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    filters: {
        status: string;
    };
    [key: string]: unknown;
}

const statusConfig = {
    pending: { color: 'bg-yellow-500/20 text-yellow-400', icon: '⏳', label: 'Pending' },
    processing: { color: 'bg-blue-500/20 text-blue-400', icon: '⚡', label: 'Processing' },
    success: { color: 'bg-green-500/20 text-green-400', icon: '✅', label: 'Success' },
    failed: { color: 'bg-red-500/20 text-red-400', icon: '❌', label: 'Failed' },
    cancelled: { color: 'bg-gray-500/20 text-gray-400', icon: '🚫', label: 'Cancelled' },
};

export default function TransactionsIndex({ transactions, filters }: Props) {
    const handleStatusFilter = (status: string) => {
        router.get('/transactions', { status }, { preserveState: true });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <GameLayout>
            <Head title="Transaction History - GameStore" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            📊 Transaction History
                        </h1>
                        <p className="text-lg text-white/80">
                            Track all your purchases and top-ups in one place
                        </p>
                    </div>

                    {/* Status Filter */}
                    <GlassCard className="p-6 mb-8">
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => handleStatusFilter('all')}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                    filters.status === 'all' 
                                        ? 'bg-white/20 text-white border-2 border-white/40' 
                                        : 'bg-white/5 text-white/70 border-2 border-transparent hover:bg-white/10'
                                }`}
                            >
                                🎯 All Transactions
                            </button>
                            {Object.entries(statusConfig).map(([status, config]) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                        filters.status === status 
                                            ? 'bg-white/20 text-white border-2 border-white/40' 
                                            : 'bg-white/5 text-white/70 border-2 border-transparent hover:bg-white/10'
                                    }`}
                                >
                                    {config.icon} {config.label}
                                </button>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Transactions List */}
                    {transactions.data.length > 0 ? (
                        <div className="space-y-4">
                            {transactions.data.map((transaction) => {
                                const statusInfo = statusConfig[transaction.status];
                                
                                return (
                                    <GlassCard key={transaction.id} className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                            <span className="text-lg">
                                                                {transaction.type === 'game_topup' ? '🎮' : '🎁'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold text-white mb-1">
                                                            {transaction.item_name}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                                                            <span>📄 {transaction.order_id}</span>
                                                            <span>📅 {formatDate(transaction.created_at)}</span>
                                                            {transaction.payment_method && (
                                                                <span>💳 {transaction.payment_method}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-blue-400 mb-1">
                                                        {new Intl.NumberFormat('id-ID', {
                                                            style: 'currency',
                                                            currency: transaction.currency
                                                        }).format(transaction.amount)}
                                                    </div>
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                                                        {statusInfo.icon} {statusInfo.label}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-2">
                                                    {transaction.status === 'pending' && (
                                                        <Link href={`/payment/${transaction.id}`}>
                                                            <GradientButton size="sm">
                                                                💳 Pay Now
                                                            </GradientButton>
                                                        </Link>
                                                    )}
                                                    {transaction.status === 'success' && (
                                                        <Link href={`/payment-success/${transaction.id}`}>
                                                            <GradientButton variant="success" size="sm">
                                                                🎉 View Receipt
                                                            </GradientButton>
                                                        </Link>
                                                    )}
                                                    <Link href={`/transactions/${transaction.id}`}>
                                                        <GradientButton variant="secondary" size="sm">
                                                            👁️ Details
                                                        </GradientButton>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <GlassCard className="p-12 max-w-md mx-auto">
                                <div className="text-6xl mb-4">📊</div>
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    No Transactions Found
                                </h3>
                                <p className="text-white/70 mb-6">
                                    {filters.status === 'all' 
                                        ? "You haven't made any transactions yet. Start shopping to see your history here!"
                                        : `No transactions with status "${filters.status}" found.`
                                    }
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link href="/games">
                                        <GradientButton>
                                            🎮 Top Up Games
                                        </GradientButton>
                                    </Link>
                                    <Link href="/vouchers">
                                        <GradientButton variant="secondary">
                                            🎁 Buy Vouchers
                                        </GradientButton>
                                    </Link>
                                </div>
                            </GlassCard>
                        </div>
                    )}

                    {/* Pagination */}
                    {transactions.data.length > 0 && transactions.links && (
                        <div className="mt-8 flex justify-center">
                            <GlassCard className="p-4">
                                <div className="flex items-center space-x-2">
                                    {transactions.links.map((link: PaginationLink, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.visit(link.url);
                                                }
                                            }}
                                            disabled={!link.url}
                                            className={`px-3 py-2 rounded text-sm transition-all duration-200 ${
                                                link.active
                                                    ? 'bg-blue-500 text-white'
                                                    : link.url
                                                        ? 'text-white/80 hover:bg-white/10'
                                                        : 'text-white/40 cursor-not-allowed'
                                            }`}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </button>
                                    ))}
                                </div>
                            </GlassCard>
                        </div>
                    )}
                </div>
            </div>
        </GameLayout>
    );
}