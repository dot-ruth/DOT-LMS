<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\MockExamController;
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

Route::resource('/courses', CoursesController::class);

Route::resource('/course/chapter', ChapterController::class);

Route::resource('/mockexam', MockExamController::class);

Route::resource('/course/assignment', AssignmentController::class);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
