import React, { useEffect, useState } from 'react';
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

interface Transaction {
    id: number;
    order_id: string;
    type: string;
    item_name: string;
    item_details: ItemDetails;
    amount: number;
    currency: string;
    status: string;
    payment_method: string;
    paid_at: string;
    created_at: string;
}

interface Props {
    transaction: Transaction;
    [key: string]: unknown;
}

export default function TransactionSuccess({ transaction }: Props) {
    const [showCheckmark, setShowCheckmark] = useState(false);

    useEffect(() => {
        // Trigger the checkmark animation after component mounts
        const timer = setTimeout(() => setShowCheckmark(true), 300);
        return () => clearTimeout(timer);
    }, []);

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
            <Head title={`Payment Success - Order ${transaction.order_id} | GameStore`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Animation */}
                    <div className="text-center mb-8">
                        <div className={`inline-block transition-all duration-700 transform ${
                            showCheckmark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}>
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                                <div className="text-4xl animate-bounce">✅</div>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            🎉 Payment Successful!
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Congratulations! Your payment has been processed successfully. 
                            Your order is being prepared for instant delivery. ⚡
                        </p>
                    </div>

                    {/* Transaction Details */}
                    <GlassCard className="p-8 mb-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Order Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    📋 Order Details
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Order ID:</span>
                                        <span className="text-white font-mono font-semibold">{transaction.order_id}</span>
                                    </div>
                                    
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Item:</span>
                                        <span className="text-white text-right">{transaction.item_name}</span>
                                    </div>
                                    
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Type:</span>
                                        <span className="text-white">
                                            {transaction.type === 'game_topup' ? '🎮 Game Top Up' : '🎁 Voucher'}
                                        </span>
                                    </div>
                                    
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
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    💳 Payment Info
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Amount:</span>
                                        <span className="text-2xl font-bold text-green-400">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: transaction.currency
                                            }).format(transaction.amount)}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Payment Method:</span>
                                        <span className="text-white capitalize">{transaction.payment_method?.replace('_', ' ')}</span>
                                    </div>
                                    
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Status:</span>
                                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                                            ✅ Success
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-white/70">Paid At:</span>
                                        <span className="text-white text-sm">{formatDate(transaction.paid_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Next Steps */}
                    <GlassCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">
                            🚀 What Happens Next?
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2">Instant Processing</h3>
                                <p className="text-white/70 text-sm">
                                    Your order is being processed and will be delivered within minutes
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">📧</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2">Email Confirmation</h3>
                                <p className="text-white/70 text-sm">
                                    You'll receive an email with your receipt and delivery details
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">🎮</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2">Start Gaming!</h3>
                                <p className="text-white/70 text-sm">
                                    Check your game account - your items should be available now
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/">
                            <GradientButton size="lg" className="w-full sm:w-auto">
                                🏠 Back to Home
                            </GradientButton>
                        </Link>
                        
                        <Link href="/transactions">
                            <GradientButton variant="secondary" size="lg" className="w-full sm:w-auto">
                                📊 View Transaction History
                            </GradientButton>
                        </Link>
                        
                        <Link href="/games">
                            <GradientButton variant="secondary" size="lg" className="w-full sm:w-auto">
                                🎮 Shop More Games
                            </GradientButton>
                        </Link>
                    </div>

                    {/* Thank You Message */}
                    <div className="text-center mt-12">
                        <GlassCard className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                🙏 Thank You for Choosing GameStore!
                            </h3>
                            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
                                We appreciate your trust in our service. If you have any questions or need support, 
                                our customer service team is available 24/7 to assist you. 
                                <br /><br />
                                Happy gaming! 🎮✨
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}