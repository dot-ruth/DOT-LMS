<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\courses>
 */
class CoursesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_title' => fake()->word(),
            'course_id' => fake()->randomDigit(),
            'course_img' => fake()->word(),
            'course_topic' => fake()->word(),
            'course_description' => fake()->sentence(6)
        ];
    }
}
