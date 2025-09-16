<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Show payment page for a transaction.
     */
    public function show(Transaction $transaction)
    {
        // Ensure user owns this transaction
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        // Only show payment for pending transactions
        if ($transaction->status !== 'pending') {
            return redirect()->route('transactions.show', $transaction);
        }

        return Inertia::render('transactions/payment', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Process payment for a transaction.
     */
    public function store(Request $request, Transaction $transaction)
    {
        // Ensure user owns this transaction
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'payment_method' => 'required|string',
            'payment_details' => 'nullable|array',
        ]);

        // Simulate payment processing (would integrate with real payment gateway)
        $success = random_int(1, 10) > 2; // 80% success rate for demo

        $status = $success ? 'success' : 'failed';
        
        $transaction->update([
            'status' => $status,
            'payment_method' => $validated['payment_method'],
            'payment_details' => $validated['payment_details'] ?? [],
            'paid_at' => $success ? now() : null,
        ]);

        if ($success) {
            return redirect()->route('payment-success.show', $transaction)
                ->with('success', 'Payment successful!');
        } else {
            return redirect()->route('payment.show', $transaction)
                ->with('error', 'Payment failed. Please try again.');
        }
    }


}