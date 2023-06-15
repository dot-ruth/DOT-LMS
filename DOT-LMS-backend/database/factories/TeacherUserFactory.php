<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeacherUser>
 */
class TeacherUserFactory extends Factory
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
            'Student_id' => fake()->randomDigit(),
            'Department' => fake()->word(),
            'password' => fake()->word(),
        ];
    }
}
