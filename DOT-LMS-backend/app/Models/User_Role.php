<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User_Role as Authenticatable;

class User_Role extends Model implements JWTSubject
{
    use HasFactory;

    protected $fillable = ['password', 'otp'];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    // encrypt user_id into the token and pass the token in every request
    public function getJWTCustomClaims()
    {
        return [];
    }

    protected $hidden = [
        'password',
    ];
}
