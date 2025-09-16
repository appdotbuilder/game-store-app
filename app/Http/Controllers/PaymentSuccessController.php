<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Inertia\Inertia;

class PaymentSuccessController extends Controller
{
    /**
     * Show success page after successful payment.
     */
    public function show(Transaction $transaction)
    {
        // Ensure user owns this transaction
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        // Only show success for successful transactions
        if ($transaction->status !== 'success') {
            return redirect()->route('transactions.show', $transaction);
        }

        return Inertia::render('transactions/success', [
            'transaction' => $transaction
        ]);
    }
}