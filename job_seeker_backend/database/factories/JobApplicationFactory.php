<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobApplication>
 */
class JobApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1, 10),
            'job_id' => fake()->numberBetween(1, 10),
            'cover_letter' => fake()->paragraph(),
            'resume' => fake()->paragraph(),
            'status' => fake()->randomElement(['pending', 'interview', 'offer', 'rejected']),
            'applied_date' => fake()->date(),
        ];
    }
}
