<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Models\Transaction;
use App\Models\Game;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display transaction history for the authenticated user.
     */
    public function index(Request $request)
    {
        $query = Transaction::where('user_id', auth()->id())
            ->latest();

        // Filter by status if provided
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $transactions = $query->paginate(10);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'filters' => [
                'status' => $request->status ?? 'all'
            ]
        ]);
    }

    /**
     * Store a new transaction.
     */
    public function store(StoreTransactionRequest $request)
    {
        $validated = $request->validated();
        
        // Generate unique order ID
        $orderId = Transaction::generateOrderId();
        
        // Create transaction
        $transaction = Transaction::create([
            'order_id' => $orderId,
            'user_id' => auth()->id(),
            'type' => $validated['type'],
            'item_name' => $validated['item_name'],
            'item_details' => $validated['item_details'],
            'amount' => $validated['amount'],
            'currency' => $validated['currency'] ?? 'IDR',
            'status' => 'pending',
        ]);

        return redirect()->route('transactions.payment', $transaction)
            ->with('success', 'Transaction created successfully.');
    }



    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction)
    {
        // Ensure user owns this transaction
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('transactions/show', [
            'transaction' => $transaction
        ]);
    }
}