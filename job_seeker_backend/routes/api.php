<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployerController;

Route::get('/employers', [EmployerController::class, 'index']);
Route::patch('/employers/{id}/status', [EmployerController::class, 'updateStatus']);
