<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      title="messages",
 *      description="Message data",
 * )
 */

class messages extends Model
{
    use HasFactory;

    protected $fillable = [
        'message'
    ];

    public function user_role()
    {
        return $this->belongsTo(User_Role::class);
    }
}
