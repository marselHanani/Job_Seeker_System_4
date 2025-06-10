<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PostJob;

class PostJobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PostJob::factory()->count(20)->create();
    }
}
