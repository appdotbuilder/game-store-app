<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voucher>
 */
class VoucherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $voucherTypes = [
            ['name' => 'Steam Wallet', 'prices' => [50000, 100000, 200000, 500000]],
            ['name' => 'PlayStation Network', 'prices' => [100000, 250000, 500000]],
            ['name' => 'Google Play', 'prices' => [25000, 50000, 100000, 200000]],
            ['name' => 'iTunes Gift Card', 'prices' => [50000, 100000, 200000, 500000]],
            ['name' => 'Xbox Game Pass', 'prices' => [75000, 150000, 300000]],
            ['name' => 'Nintendo eShop', 'prices' => [100000, 200000, 400000]]
        ];
        
        $voucher = fake()->randomElement($voucherTypes);
        $price = fake()->randomElement($voucher['prices']);
        
        return [
            'name' => $voucher['name'] . ' - IDR ' . number_format($price, 0, ',', '.'),
            'slug' => \Illuminate\Support\Str::slug($voucher['name'] . ' ' . $price),
            'description' => fake()->paragraph(2),
            'image_url' => 'https://via.placeholder.com/300x200?text=' . urlencode($voucher['name']),
            'price' => $price,
            'currency' => 'IDR',
            'is_active' => fake()->boolean(95),
        ];
    }

    /**
     * Indicate that the voucher is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}