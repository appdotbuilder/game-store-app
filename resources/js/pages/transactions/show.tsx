import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { GameLayout } from '@/components/game-layout';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';

interface ItemDetails {
    game_id?: number;
    game_name?: string;
    user_id?: string;
    server?: string;
    denomination?: number;
    currency_type?: string;
    voucher_id?: number;
    voucher_code?: string;
}

interface PaymentDetails {
    provider?: string;
    account?: string;
    method?: string;
}

interface Transaction {
    id: number;
    order_id: string;
    type: string;
    item_name: string;
    item_details: ItemDetails;
    amount: number;
    currency: string;
    status: 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';
    payment_method: string | null;
    payment_details: PaymentDetails | null;
    created_at: string;
    paid_at: string | null;
}

interface Props {
    transaction: Transaction;
    [key: string]: unknown;
}

const statusConfig = {
    pending: { color: 'bg-yellow-500/20 text-yellow-400', icon: '⏳', label: 'Pending Payment' },
    processing: { color: 'bg-blue-500/20 text-blue-400', icon: '⚡', label: 'Processing' },
    success: { color: 'bg-green-500/20 text-green-400', icon: '✅', label: 'Completed' },
    failed: { color: 'bg-red-500/20 text-red-400', icon: '❌', label: 'Failed' },
    cancelled: { color: 'bg-gray-500/20 text-gray-400', icon: '🚫', label: 'Cancelled' },
};

export default function TransactionShow({ transaction }: Props) {
    const statusInfo = statusConfig[transaction.status];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <GameLayout>
            <Head title={`Transaction ${transaction.order_id} | GameStore`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            📋 Transaction Details
                        </h1>
                        <p className="text-white/80">
                            Order ID: <span className="font-mono font-semibold">{transaction.order_id}</span>
                        </p>
                    </div>

                    {/* Status Card */}
                    <GlassCard className="p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Current Status</h2>
                                <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${statusInfo.color}`}>
                                    {statusInfo.icon} {statusInfo.label}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-400 mb-1">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: transaction.currency
                                    }).format(transaction.amount)}
                                </div>
                                <div className="text-white/60 text-sm">Total Amount</div>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Order Information */}
                        <GlassCard className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                                🛒 Order Information
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-white/70">Item:</span>
                                    <span className="text-white text-right">{transaction.item_name}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-white/70">Type:</span>
                                    <span className="text-white">
                                        {transaction.type === 'game_topup' ? '🎮 Game Top Up' : '🎁 Voucher Purchase'}
                                    </span>
                                </div>
                                
                                {transaction.item_details?.game_name && (
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Game:</span>
                                        <span className="text-white">{transaction.item_details.game_name}</span>
                                    </div>
                                )}
                                
                                {transaction.item_details?.user_id && (
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">User ID:</span>
                                        <span className="text-white font-mono">{transaction.item_details.user_id}</span>
                                    </div>
                                )}
                                
                                {transaction.item_details?.server && (
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Server:</span>
                                        <span className="text-white">{transaction.item_details.server}</span>
                                    </div>
                                )}
                                
                                {transaction.item_details?.denomination && (
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Amount:</span>
                                        <span className="text-white">
                                            {transaction.item_details.denomination} {transaction.item_details.currency_type}
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-white/70">Order Date:</span>
                                    <span className="text-white text-sm">{formatDate(transaction.created_at)}</span>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Payment Information */}
                        <GlassCard className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                                💳 Payment Information
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-white/70">Amount:</span>
                                    <span className="text-white font-semibold">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: transaction.currency
                                        }).format(transaction.amount)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-white/70">Payment Method:</span>
                                    <span className="text-white">
                                        {transaction.payment_method ? 
                                            transaction.payment_method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
                                            'Not selected'
                                        }
                                    </span>
                                </div>
                                
                                {transaction.payment_details?.provider && (
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Provider:</span>
                                        <span className="text-white">{transaction.payment_details.provider}</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-white/70">Status:</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                                        {statusInfo.icon} {statusInfo.label}
                                    </span>
                                </div>
                                
                                {transaction.paid_at && (
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Paid At:</span>
                                        <span className="text-white text-sm">{formatDate(transaction.paid_at)}</span>
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                        {transaction.status === 'pending' && (
                            <Link href={`/payment/${transaction.id}`}>
                                <GradientButton size="lg" className="w-full sm:w-auto">
                                    💳 Complete Payment
                                </GradientButton>
                            </Link>
                        )}
                        
                        {transaction.status === 'success' && (
                            <Link href={`/payment-success/${transaction.id}`}>
                                <GradientButton variant="success" size="lg" className="w-full sm:w-auto">
                                    🎉 View Success Page
                                </GradientButton>
                            </Link>
                        )}
                        
                        <Link href="/transactions">
                            <GradientButton variant="secondary" size="lg" className="w-full sm:w-auto">
                                📊 Back to History
                            </GradientButton>
                        </Link>
                    </div>

                    {/* Help Section */}
                    <div className="mt-12">
                        <GlassCard className="p-6">
                            <h3 className="text-xl font-bold text-white mb-4 text-center">
                                ❓ Need Help?
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 text-center">
                                <div>
                                    <div className="text-2xl mb-2">💬</div>
                                    <h4 className="text-white font-semibold mb-1">Customer Support</h4>
                                    <p className="text-white/70 text-sm">
                                        Contact our support team for any transaction issues
                                    </p>
                                </div>
                                <div>
                                    <div className="text-2xl mb-2">📧</div>
                                    <h4 className="text-white font-semibold mb-1">Email Support</h4>
                                    <p className="text-white/70 text-sm">
                                        Send us an email at support@gamestore.com
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}