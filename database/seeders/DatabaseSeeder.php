<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Voucher;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        User::factory(5)->create();

        // Create games with real data
        $games = [
            [
                'name' => 'Mobile Legends',
                'slug' => 'mobile-legends',
                'description' => 'Mobile Legends: Bang Bang is a multiplayer online battle arena mobile game. Join millions of players in epic 5v5 battles and climb the ranks!',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'denominations' => [
                    ['amount' => 86, 'price' => 20000, 'currency' => 'Diamonds'],
                    ['amount' => 172, 'price' => 40000, 'currency' => 'Diamonds'],
                    ['amount' => 257, 'price' => 60000, 'currency' => 'Diamonds'],
                    ['amount' => 429, 'price' => 100000, 'currency' => 'Diamonds'],
                    ['amount' => 878, 'price' => 200000, 'currency' => 'Diamonds'],
                ],
                'server_type' => 'user_id',
                'is_active' => true
            ],
            [
                'name' => 'Free Fire',
                'slug' => 'free-fire',
                'description' => 'Garena Free Fire is a battle royale game where you fight to be the last one standing. Customize your character and dominate the battlefield!',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'denominations' => [
                    ['amount' => 100, 'price' => 15000, 'currency' => 'Diamonds'],
                    ['amount' => 210, 'price' => 30000, 'currency' => 'Diamonds'],
                    ['amount' => 355, 'price' => 50000, 'currency' => 'Diamonds'],
                    ['amount' => 720, 'price' => 100000, 'currency' => 'Diamonds'],
                    ['amount' => 1450, 'price' => 200000, 'currency' => 'Diamonds'],
                ],
                'server_type' => 'user_id',
                'is_active' => true
            ],
            [
                'name' => 'Genshin Impact',
                'slug' => 'genshin-impact',
                'description' => 'Embark on a journey across Teyvat to find your lost sibling and seek answers from The Seven. Explore the world of Genshin Impact!',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'denominations' => [
                    ['amount' => 60, 'price' => 15000, 'currency' => 'Genesis Crystals'],
                    ['amount' => 330, 'price' => 79000, 'currency' => 'Genesis Crystals'],
                    ['amount' => 1090, 'price' => 249000, 'currency' => 'Genesis Crystals'],
                    ['amount' => 2240, 'price' => 499000, 'currency' => 'Genesis Crystals'],
                    ['amount' => 3880, 'price' => 799000, 'currency' => 'Genesis Crystals'],
                ],
                'server_type' => 'region',
                'is_active' => true
            ],
            [
                'name' => 'PUBG Mobile',
                'slug' => 'pubg-mobile',
                'description' => 'Experience the ultimate battle royale on mobile! Drop in, loot up, and compete to be the last one standing in PUBG Mobile.',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'denominations' => [
                    ['amount' => 60, 'price' => 15000, 'currency' => 'UC'],
                    ['amount' => 325, 'price' => 75000, 'currency' => 'UC'],
                    ['amount' => 660, 'price' => 150000, 'currency' => 'UC'],
                    ['amount' => 1800, 'price' => 400000, 'currency' => 'UC'],
                    ['amount' => 3850, 'price' => 800000, 'currency' => 'UC'],
                ],
                'server_type' => 'user_id',
                'is_active' => true
            ],
        ];

        foreach ($games as $gameData) {
            Game::create($gameData);
        }

        // Create vouchers with real data
        $vouchers = [
            [
                'name' => 'Steam Wallet - IDR 50.000',
                'slug' => 'steam-wallet-50000',
                'description' => 'Add funds to your Steam Wallet to purchase games, DLC, and in-game items from the Steam Store.',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'price' => 50000,
                'currency' => 'IDR',
                'is_active' => true
            ],
            [
                'name' => 'Steam Wallet - IDR 100.000',
                'slug' => 'steam-wallet-100000',
                'description' => 'Add funds to your Steam Wallet to purchase games, DLC, and in-game items from the Steam Store.',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'price' => 100000,
                'currency' => 'IDR',
                'is_active' => true
            ],
            [
                'name' => 'PlayStation Network - IDR 150.000',
                'slug' => 'psn-150000',
                'description' => 'Purchase games, add-ons, and more from the PlayStation Store with this PSN card.',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'price' => 150000,
                'currency' => 'IDR',
                'is_active' => true
            ],
            [
                'name' => 'Google Play - IDR 25.000',
                'slug' => 'google-play-25000',
                'description' => 'Use Google Play credits to purchase apps, games, and in-app content on the Google Play Store.',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'price' => 25000,
                'currency' => 'IDR',
                'is_active' => true
            ],
            [
                'name' => 'Google Play - IDR 50.000',
                'slug' => 'google-play-50000',
                'description' => 'Use Google Play credits to purchase apps, games, and in-app content on the Google Play Store.',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'price' => 50000,
                'currency' => 'IDR',
                'is_active' => true
            ],
            [
                'name' => 'iTunes Gift Card - IDR 75.000',
                'slug' => 'itunes-75000',
                'description' => 'Redeem on the App Store, iTunes Store, and other Apple services for apps, games, music, and more.',
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
                'price' => 75000,
                'currency' => 'IDR',
                'is_active' => true
            ],
        ];

        foreach ($vouchers as $voucherData) {
            Voucher::create($voucherData);
        }

        // Create some sample transactions for the test user
        Transaction::factory(5)->create([
            'user_id' => $testUser->id,
        ]);
    }
}