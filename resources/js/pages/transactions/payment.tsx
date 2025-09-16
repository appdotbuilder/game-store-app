import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
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
    created_at: string;
}

interface Props {
    transaction: Transaction;
    [key: string]: unknown;
}

const paymentMethods = [
    {
        id: 'bank_transfer',
        name: 'Bank Transfer',
        icon: '🏦',
        description: 'Transfer via BCA, Mandiri, BNI, BRI',
        providers: ['BCA', 'Mandiri', 'BNI', 'BRI']
    },
    {
        id: 'qris',
        name: 'QRIS',
        icon: '📱',
        description: 'Scan QR code with any e-wallet',
        providers: ['Any QRIS App']
    },
    {
        id: 'ewallet',
        name: 'E-Wallet',
        icon: '💰',
        description: 'Pay with digital wallet',
        providers: ['OVO', 'GoPay', 'DANA', 'LinkAja']
    },
    {
        id: 'credit_card',
        name: 'Credit Card',
        icon: '💳',
        description: 'Visa, Mastercard, JCB',
        providers: ['Visa', 'Mastercard', 'JCB']
    }
];

export default function TransactionPayment({ transaction }: Props) {
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

    const handlePayment = () => {
        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }

        setLoading(true);

        const paymentData = {
            payment_method: selectedMethod,
            payment_details: {
                provider: selectedProvider,
                method: selectedMethod
            }
        };

        router.post(`/payment/${transaction.id}`, paymentData, {
            onFinish: () => setLoading(false),
            onError: () => setLoading(false)
        });
    };

    return (
        <GameLayout>
            <Head title={`Payment - Order ${transaction.order_id} | GameStore`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            💳 Complete Payment
                        </h1>
                        <p className="text-white/80">
                            Choose your preferred payment method to complete your order
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <GlassCard className="p-6">
                                <h2 className="text-xl font-bold text-white mb-4">
                                    📋 Order Summary
                                </h2>
                                
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-white/70">Order ID:</span>
                                        <span className="text-white font-mono">{transaction.order_id}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-white/70">Item:</span>
                                        <span className="text-white text-right">{transaction.item_name}</span>
                                    </div>
                                    
                                    {transaction.item_details?.user_id && (
                                        <div className="flex justify-between">
                                            <span className="text-white/70">User ID:</span>
                                            <span className="text-white font-mono">{transaction.item_details.user_id}</span>
                                        </div>
                                    )}
                                    
                                    {transaction.item_details?.server && (
                                        <div className="flex justify-between">
                                            <span className="text-white/70">Server:</span>
                                            <span className="text-white">{transaction.item_details.server}</span>
                                        </div>
                                    )}
                                    
                                    <hr className="border-white/20" />
                                    
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-white">Total:</span>
                                        <span className="text-blue-400">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: transaction.currency
                                            }).format(transaction.amount)}
                                        </span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Payment Methods */}
                        <div className="lg:col-span-2">
                            <GlassCard className="p-6">
                                <h2 className="text-xl font-bold text-white mb-6">
                                    🎯 Choose Payment Method
                                </h2>

                                <div className="grid gap-4">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => {
                                                setSelectedMethod(method.id);
                                                setSelectedProvider(method.providers[0]);
                                            }}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                                                selectedMethod === method.id
                                                    ? 'border-blue-500 bg-blue-500/20'
                                                    : 'border-white/20 bg-white/5 hover:border-white/40'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">{method.icon}</span>
                                                    <div>
                                                        <h3 className="text-white font-semibold">{method.name}</h3>
                                                        <p className="text-white/70 text-sm">{method.description}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {method.providers.slice(0, 3).map((provider) => (
                                                        <span 
                                                            key={provider} 
                                                            className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded"
                                                        >
                                                            {provider}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Provider Selection */}
                                {selectedPaymentMethod && selectedPaymentMethod.providers.length > 1 && (
                                    <div className="mt-6">
                                        <h3 className="text-white font-semibold mb-3">
                                            Select Provider:
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {selectedPaymentMethod.providers.map((provider) => (
                                                <button
                                                    key={provider}
                                                    onClick={() => setSelectedProvider(provider)}
                                                    className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                                                        selectedProvider === provider
                                                            ? 'border-blue-500 bg-blue-500/20 text-white'
                                                            : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40'
                                                    }`}
                                                >
                                                    {provider}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Payment Button */}
                                <div className="mt-8 pt-6 border-t border-white/20">
                                    <GradientButton
                                        onClick={handlePayment}
                                        loading={loading}
                                        disabled={!selectedMethod}
                                        className="w-full"
                                        size="lg"
                                    >
                                        🚀 Pay {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: transaction.currency
                                        }).format(transaction.amount)}
                                    </GradientButton>
                                    
                                    <p className="text-white/60 text-center text-sm mt-3">
                                        🔒 Your payment is secured with 256-bit SSL encryption
                                    </p>
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    {/* Security Info */}
                    <div className="mt-8">
                        <GlassCard className="p-6">
                            <div className="grid md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-2xl mb-2">🔒</div>
                                    <h3 className="text-white font-semibold mb-1">Secure Payment</h3>
                                    <p className="text-white/70 text-sm">256-bit SSL encryption</p>
                                </div>
                                <div>
                                    <div className="text-2xl mb-2">⚡</div>
                                    <h3 className="text-white font-semibold mb-1">Instant Processing</h3>
                                    <p className="text-white/70 text-sm">Get your items immediately</p>
                                </div>
                                <div>
                                    <div className="text-2xl mb-2">🛡️</div>
                                    <h3 className="text-white font-semibold mb-1">Money Back Guarantee</h3>
                                    <p className="text-white/70 text-sm">100% refund if delivery fails</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}