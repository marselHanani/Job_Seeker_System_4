<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('experience')->nullable();
            $table->text('requirements')->nullable();
            $table->text('responsibilities')->nullable();
            $table->string('education')->nullable();
            $table->integer('vacancies')->default(1);
            $table->date('expiration')->nullable();
            $table->decimal('salary_minimum', 10, 2)->nullable();
            $table->decimal('salary_maximum', 10, 2)->nullable();
            $table->string('time_type')->nullable();
            $table->string('job_level')->nullable();
            $table->string('job_type')->nullable();
            $table->string('job_role')->nullable();
            $table->string('city')->nullable();
            $table->string('street')->nullable();
            $table->string('tags')->nullable();
            $table->string('location')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
