<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Voucher
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $description
 * @property string|null $image_url
 * @property float $price
 * @property string $currency
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher query()
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voucher active()
 * @method static \Database\Factories\VoucherFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Voucher extends Model
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
        'price',
        'currency',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];

    /**
     * Scope a query to only include active vouchers.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}