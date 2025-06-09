<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\testController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\EmployerAuth;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

Route::get('/employers', [EmployerController::class, 'index']);
Route::patch('/employers/{id}/status', [EmployerController::class, 'updateStatus']);




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/login', function(){
    return "done";
});


//user route
Route::apiResource('/users', UserController::class)->middleware(AdminMiddleware::class);

//job applications route
use App\Http\Controllers\JobApplicationController;
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

Route::apiResource('reports', ReportController::class);
Route::post('reports/{report}/download', [ReportController::class, 'download']);
Route::post('reports/{report}/share', [ReportController::class, 'share']);

Route::resource('employers', EmployerController::class);




