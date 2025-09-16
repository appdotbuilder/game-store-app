<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;
use App\Models\Game;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of games for admin.
     */
    public function index()
    {
        $games = Game::latest()->paginate(10);
        
        return Inertia::render('admin/games/index', [
            'games' => $games
        ]);
    }

    /**
     * Show the form for creating a new game.
     */
    public function create()
    {
        return Inertia::render('admin/games/create');
    }

    /**
     * Store a newly created game.
     */
    public function store(StoreGameRequest $request)
    {
        $game = Game::create($request->validated());

        return redirect()->route('admin.games.show', $game)
            ->with('success', 'Game created successfully.');
    }

    /**
     * Display the specified game.
     */
    public function show(Game $game)
    {
        return Inertia::render('admin/games/show', [
            'game' => $game
        ]);
    }

    /**
     * Show the form for editing the specified game.
     */
    public function edit(Game $game)
    {
        return Inertia::render('admin/games/edit', [
            'game' => $game
        ]);
    }

    /**
     * Update the specified game.
     */
    public function update(UpdateGameRequest $request, Game $game)
    {
        $game->update($request->validated());

        return redirect()->route('admin.games.show', $game)
            ->with('success', 'Game updated successfully.');
    }

    /**
     * Remove the specified game.
     */
    public function destroy(Game $game)
    {
        $game->delete();

        return redirect()->route('admin.games.index')
            ->with('success', 'Game deleted successfully.');
    }
}