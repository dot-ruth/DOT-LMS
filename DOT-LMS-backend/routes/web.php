<?php

use App\Mail\DOTLMSMail;
use App\Models\StudentUser;
use App\Http\Controllers\UserLogin;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return response('<h1>hello</h1>');
// });

Route::get('/sendEmail', function () {

    // $Student_user = new StudentUser();

    // $first_name = $Student_user->first_name;
    // $user_id = $Student_user->student_id;


    Mail::to('ruthgetaneh5@gmail.com')->send(new DOTLMSMail());
});

// //show login form 
// Route::get('/login', [UserController::class, 'loginForm'])->name('login')->middleware('guest');
