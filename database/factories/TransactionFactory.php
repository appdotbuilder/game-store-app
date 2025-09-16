<?php

namespace Database\Factories;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['game_topup', 'voucher']);
        $status = fake()->randomElement(['pending', 'processing', 'success', 'failed']);
        
        return [
            'order_id' => Transaction::generateOrderId(),
            'user_id' => User::factory(),
            'type' => $type,
            'item_name' => $type === 'game_topup' 
                ? fake()->randomElement(['Mobile Legends - 500 Diamonds', 'Free Fire - 1000 Diamonds', 'PUBG Mobile - 600 UC'])
                : fake()->randomElement(['Steam Wallet IDR 100.000', 'PlayStation Network IDR 250.000', 'Google Play IDR 50.000']),
            'item_details' => $type === 'game_topup' 
                ? [
                    'game_id' => fake()->numberBetween(1, 10),
                    'user_id' => fake()->numerify('########'),
                    'server' => fake()->randomElement(['Asia', 'Europe', 'America']),
                    'denomination' => 500,
                    'currency_type' => 'Diamonds'
                ]
                : [
                    'voucher_id' => fake()->numberBetween(1, 20),
                    'voucher_code' => fake()->optional()->regexify('[A-Z0-9]{16}')
                ],
            'amount' => fake()->randomFloat(2, 10000, 500000),
            'currency' => 'IDR',
            'status' => $status,
            'payment_method' => fake()->randomElement(['bank_transfer', 'qris', 'ewallet', 'credit_card']),
            'payment_details' => [
                'provider' => fake()->randomElement(['BCA', 'Mandiri', 'OVO', 'GoPay', 'DANA']),
                'account' => fake()->optional()->numerify('###########')
            ],
            'paid_at' => $status === 'success' ? fake()->dateTimeBetween('-30 days', 'now') : null,
        ];
    }

    /**
     * Indicate that the transaction is successful.
     */
    public function successful(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'success',
            'paid_at' => fake()->dateTimeBetween('-7 days', 'now'),
        ]);
    }

    /**
     * Indicate that the transaction is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'paid_at' => null,
        ]);
    }

    /**
     * Indicate that the transaction failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'failed',
            'paid_at' => null,
        ]);
    }
}