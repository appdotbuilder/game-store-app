<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Voucher;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the homepage with featured games and promotions.
     */
    public function index()
    {
        $popularGames = Game::active()->take(6)->get();
        $featuredVouchers = Voucher::active()->take(4)->get();
        
        return Inertia::render('welcome', [
            'popularGames' => $popularGames,
            'featuredVouchers' => $featuredVouchers,
        ]);
    }
}