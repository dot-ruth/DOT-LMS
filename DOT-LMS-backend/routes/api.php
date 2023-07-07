<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\GradebookController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\MockExamController;
use App\Http\Controllers\StudentUserController;
use App\Http\Controllers\TeacherUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use App\Models\AdminUser;
use App\Models\gradebook;
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

Route::group(['middleware' => ['web']], function () {
    //login functionality
    Route::post('/login', [UserRoleController::class, 'userLogin']);
});

//Route::post('/login', [UserRoleController::class, 'userLogin']);

//route for password configuration
Route::post('/ConfigurePassword', [UserRoleController::class, 'ConfigurePassword']);

//Route::resource('/ConfigurePassword', [UserRoleController::class, 'ConfigurePassword']);


//Admin add student functionality
Route::post('/admin/add_student', [StudentUserController::class, 'store'])->middleware('auth');

//Admin get student data
Route::get('/admin/student_users', [StudentUserController::class, 'index'])->middleware('auth');

//admin edit student data
Route::put('/admin/edit_student/{student}', [StudentUserController::class, 'update'])->middleware('auth');

//admin delete student
Route::delete('/admin/delete_student/{student}', [StudentUserController::class, 'destroy'])->middleware('auth');


//Admin add teacher functionality
Route::post('admin/add_teacher', [TeacherUserController::class, 'store'])->middleware('auth');

//Admin get teacher data
Route::get('admin/teachers', [TeacherUserController::class, 'index'])->middleware('auth');

//admin edit teacher data
Route::put('admin/edit_teacher/{teacher}', [TeacherUserController::class, 'update'])->middleware('auth');

//admin delete teacher
Route::delete('admin/delete_teacher/{teacher}', [TeacherUserController::class, 'destroy'])->middleware('auth');

Route::resource('/user/student', StudentUserController::class);

Route::resource('/user/teacher', TeacherUserController::class);

Route::resource('/user/admin', AdminUserController::class);

Route::resource('/courses', CoursesController::class);

Route::resource('/course/chapter', ChapterController::class);

Route::resource('/mockexam', MockExamController::class);

Route::resource('/course/assignment', AssignmentController::class);

Route::resource('/messages', MessagesController::class);

Route::resource('/gradebook', GradebookController::class);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
