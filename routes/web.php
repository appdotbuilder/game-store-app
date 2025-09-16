<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentSuccessController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VoucherController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', [HomeController::class, 'index'])->name('home');

// Games
Route::get('/games', [GameController::class, 'index'])->name('games.index');
Route::get('/games/{game:slug}', [GameController::class, 'show'])->name('games.show');

// Vouchers
Route::get('/vouchers', [VoucherController::class, 'index'])->name('vouchers.index');
Route::get('/vouchers/{voucher:slug}', [VoucherController::class, 'show'])->name('vouchers.show');

// Transactions (requires authentication)
Route::middleware(['auth'])->group(function () {
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');
    
    // Payment routes
    Route::get('/payment/{transaction}', [PaymentController::class, 'show'])->name('payment.show');
    Route::post('/payment/{transaction}', [PaymentController::class, 'store'])->name('payment.store');
    Route::get('/payment-success/{transaction}', [PaymentSuccessController::class, 'show'])->name('payment-success.show');
});

// Admin routes (requires authentication - in real app add admin middleware)
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('games', \App\Http\Controllers\Admin\GameController::class);
    // Route::resource('vouchers', \App\Http\Controllers\Admin\VoucherController::class);
    // Route::get('/transactions', [\App\Http\Controllers\Admin\TransactionController::class, 'index'])->name('transactions.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
