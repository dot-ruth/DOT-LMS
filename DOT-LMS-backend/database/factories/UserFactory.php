<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'First_Name' => fake()->name(),
            // 'Last_Name' => fake()->name(),
            // 'Student_id' => fake()->randomDigit(),
            // 'Department' => fake()->word(),
            // 'Year' => fake()->randomDigit(),
            // 'Semester' => fake()->randomDigit(),
            // 'email_verified_at' => now(),
            // 'password' => fake()->word(), // password
            // 'remember_token' => Str::random(10),

        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    // public function unverified(): static
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'email_verified_at' => null,
    //     ]);
    // }
}
