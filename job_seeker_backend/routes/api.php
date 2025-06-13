<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\testController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\EmployerAuth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\ReportController;
use Illuminate\Http\Request;


Route::patch('/employers/{id}/status', [EmployerController::class, 'updateStatus']);

//user route
Route::apiResource('/users', UserController::class)->middleware(AdminMiddleware::class);
//job applications route
Route::apiResource('/applications', JobApplicationController::class);
Route::get('/my-applications', [JobApplicationController::class, 'getApplicationsByUser'])->middleware();
//Role route
Route::apiResource('/roles', RoleController::class)->middleware(AdminMiddleware::class);

//job route
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);
Route::post('/jobs', [JobController::class, 'store'])->middleware(EmployerAuth::class);
Route::put('/jobs/{id}', [JobController::class,'update'])->middleware(EmployerAuth::class);
Route::delete('/jobs/{id}', [JobController::class,'destroy'])->middleware(EmployerAuth::class);

//auth routes
Route::post('/register',[AuthController::class, 'register']);
Route::get('/verify-email/{id}', [AuthController::class, 'verifyEmail']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/forget-password',[AuthController::class,'forgetPass']);
Route::post('/reset-password/{id}',[AuthController::class,'resetPass']);
Route::post('/google-register',[AuthController::class,'googleRegister']);
Route::post('/google-login',[AuthController::class,'googleLogin']);

Route::resource('employers', EmployerController::class);

//report 
Route::apiResource('reports', ReportController::class);
Route::get('reports',[ReportController::class, 'index']);
// Add this line with your existing report roaction: utes
Route::post('reports/{report}/download-pdf', [ReportController::class, 'downloadPdf']);
Route::post('reports/{report}/share', [ReportController::class, 'share']);


