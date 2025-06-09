<?php

namespace Database\Seeders;

use App\Models\Employer;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\Notification;
use App\Models\PostJob;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name'=> 'employer']);
        Role::create(['name'=> 'job_seeker']);
        $this->call(AdminInfoSeeder::class);
        //User::factory(10)->create();
        //PostJob::factory(10)->create();
        //Employer::factory(3)->create();
        //Notification::factory(10)->create();
        //JobApplication::factory(10)->create();
    }
}
