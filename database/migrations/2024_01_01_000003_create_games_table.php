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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->decimal('base_price', 10, 2)->default(0);
            $table->json('denominations'); // Available currency amounts and prices
            $table->boolean('is_active')->default(true);
            $table->string('server_type')->default('region'); // region, server_id, etc.
            $table->timestamps();
            
            $table->index('slug');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};