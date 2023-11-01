<?php

namespace App\Models;

use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User_Role extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = ['password', 'otp'];

    public function messages()
    {
        return $this->hasMany(messages::class);
    }

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
