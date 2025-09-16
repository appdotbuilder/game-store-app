<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Inertia\Inertia;

class VoucherController extends Controller
{
    /**
     * Display a listing of available vouchers.
     */
    public function index()
    {
        $vouchers = Voucher::active()->get();
        
        return Inertia::render('vouchers/index', [
            'vouchers' => $vouchers
        ]);
    }

    /**
     * Show details for a specific voucher.
     */
    public function show(Voucher $voucher)
    {
        if (!$voucher->is_active) {
            abort(404);
        }
        
        return Inertia::render('vouchers/show', [
            'voucher' => $voucher
        ]);
    }
}