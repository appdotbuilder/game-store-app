<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Game
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $description
 * @property string|null $image_url
 * @property float $base_price
 * @property array $denominations
 * @property bool $is_active
 * @property string $server_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Game newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Game newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Game query()
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereBasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereDenominations($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereServerType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game active()
 * @method static \Database\Factories\GameFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Game extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image_url',
        'base_price',
        'denominations',
        'is_active',
        'server_type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'denominations' => 'array',
        'is_active' => 'boolean',
        'base_price' => 'decimal:2',
    ];

    /**
     * Scope a query to only include active games.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}