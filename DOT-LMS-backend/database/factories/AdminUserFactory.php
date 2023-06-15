<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AdminUser>
 */
class AdminUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'First_Name' => fake()->name(),
            'Last_Name' => fake()->name(),
            'Admin_id' => fake()->randomDigit(),
            'password' => fake()->word()
        ];
    }
}
