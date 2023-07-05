<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentUser>
 */
class StudentUserFactory extends Factory
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
            'Year' => fake()->randomDigit(),
            'Semester' => fake()->randomDigit(),
            'password' => fake()->word(),
        ];
    }
}
