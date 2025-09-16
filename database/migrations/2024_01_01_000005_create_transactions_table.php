<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // game_topup, voucher
            $table->string('item_name');
            $table->json('item_details'); // game_id, denomination, user_id, server, etc.
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('IDR');
            $table->enum('status', ['pending', 'processing', 'success', 'failed', 'cancelled'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->json('payment_details')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('status');
            $table->index('type');
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};