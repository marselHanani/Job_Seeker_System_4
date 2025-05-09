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
        'confirm_password',
        'image',
        'role_id',
    ];

    public function role() {
        return $this->belongsTo(Role::class);
    }

    public function jobs() {
        return $this->belongsToMany(Job::class, 'job_user');
    }

    public function jobAlerts() {
        return $this->hasMany(JobAlert::class);
    }

    public function notifications() {
        return $this->hasMany(Notification::class);
    }

    public function jobApplications() {
        return $this->hasMany(JobApplication::class);
    }

    public function posts() {
        return $this->hasMany(Post::class);
    }
    public function customers_support(){
        return $this->hasMany(CustomerSupport::class);
    }
}
