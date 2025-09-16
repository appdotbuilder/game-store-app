<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gameNames = [
            'Mobile Legends',
            'Free Fire',
            'Genshin Impact',
            'PUBG Mobile',
            'Call of Duty Mobile',
            'Arena of Valor',
            'Valorant',
            'League of Legends',
            'Clash of Clans',
            'Clash Royale'
        ];
        
        $name = fake()->randomElement($gameNames);
        
        return [
            'name' => $name,
            'slug' => \Illuminate\Support\Str::slug($name),
            'description' => fake()->paragraph(3),
            'image_url' => 'https://via.placeholder.com/300x200?text=' . urlencode($name),
            'base_price' => fake()->randomFloat(2, 5, 50),
            'denominations' => [
                ['amount' => 100, 'price' => 15000, 'currency' => 'Diamonds'],
                ['amount' => 250, 'price' => 35000, 'currency' => 'Diamonds'],
                ['amount' => 500, 'price' => 70000, 'currency' => 'Diamonds'],
                ['amount' => 1000, 'price' => 140000, 'currency' => 'Diamonds'],
                ['amount' => 2000, 'price' => 280000, 'currency' => 'Diamonds']
            ],
            'is_active' => fake()->boolean(90),
            'server_type' => fake()->randomElement(['region', 'server_id', 'user_id']),
        ];
    }

    /**
     * Indicate that the game is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the game is popular.
     */
    public function popular(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
            'base_price' => fake()->randomFloat(2, 10, 25),
        ]);
    }
}