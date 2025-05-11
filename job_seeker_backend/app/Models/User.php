<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'image',
        'role_id',
    ];

    public function role() {
        return $this->belongsTo(Role::class);
    }

    public function jobs() {
        return $this->belongsToMany(Job::class, 'job_user');
    }

    public function notifications() {
        return $this->hasMany(Notification::class);
    }

    public function jobApplications() {
        return $this->hasMany(JobApplication::class);
    }

    public function posts() {
        return $this->hasOne(Employer::class);
    }
}
