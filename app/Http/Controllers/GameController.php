<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of games for top-up.
     */
    public function index()
    {
        $games = Game::active()->get();
        
        return Inertia::render('games/index', [
            'games' => $games
        ]);
    }

    /**
     * Show the top-up form for a specific game.
     */
    public function show(Game $game)
    {
        if (!$game->is_active) {
            abort(404);
        }
        
        return Inertia::render('games/show', [
            'game' => $game
        ]);
    }
}