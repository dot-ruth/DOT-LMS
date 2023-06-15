<?php

use App\Http\Controllers\StudentUserController;
use App\Http\Controllers\TeacherUserController;
use App\Http\Controllers\UserController;
use App\Models\AdminUser;
use App\Models\StudentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::resource('/user/student', StudentUserController::class);

Route::resource('/user/teacher', TeacherUserController::class);

Route::resource('/user/admin', AdminUser::class);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
