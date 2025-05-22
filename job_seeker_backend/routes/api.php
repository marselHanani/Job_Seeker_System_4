<?php


use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/login', function(){
    return "done";
});

use App\Http\Controllers\JobController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;

//user route
Route::apiResource('/users', UserController::class)->middleware(['auth:api']);

//job route
Route::apiResource('/jobs', JobController::class);

//job applications route
use App\Http\Controllers\JobApplicationController;
Route::apiResource('/applications', JobApplicationController::class);
Route::get('/my-applications', [JobApplicationController::class, 'getApplicationsByUser']);

//Role route
Route::apiResource('/roles', RoleController::class);
//auth routes
Route::post('/register',[AuthController::class, 'register']);
Route::get('/verify-email/{id}', [AuthController::class, 'verifyEmail']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/forget-password',[AuthController::class,'forgetPass']);
Route::post('/reset-password/{id}',[AuthController::class,'resetPass']);
Route::post('/google-register',[AuthController::class,'googleRegister']);
Route::post('/google-login',[AuthController::class,'googleLogin']);
