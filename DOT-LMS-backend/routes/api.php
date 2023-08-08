<!-- <?php

        use App\Http\Controllers\AdminUserController;
        use App\Http\Controllers\AssignmentController;
        use App\Http\Controllers\ChapterController;
        use App\Http\Controllers\Controller;
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

        // Route::resource('/', Controller::class);

        // Route::group(['middleware' => ['web']], function () {
        //     //login functionality
        //     Route::post('/login', [UserRoleController::class, 'userLogin']);
        // });

        // Route::post('/ConfigurePassword', [UserRoleController::class, 'ConfigurePassword']);

        // 

        // Route::post('/admin/add_student', [StudentUserController::class, 'store'])->middleware('jwt');

        // Route::get('/admin/student_users', [StudentUserController::class, 'index'])->middleware('jwt');

        // Route::put('/admin/edit_student/{student}', [StudentUserController::class, 'update'])->middleware('jwt');

        // Route::delete('/admin/delete_student/{student}', [StudentUserController::class, 'destroy'])->middleware('jwt');

        // Route::post('admin/add_teacher', [TeacherUserController::class, 'store'])->middleware('jwt');

        // Route::get('admin/teachers', [TeacherUserController::class, 'index'])->middleware('jwt');

        // Route::put('admin/edit_teacher/{teacher}', [TeacherUserController::class, 'update'])->middleware('jwt');

        // Route::delete('admin/delete_teacher/{teacher}', [TeacherUserController::class, 'destroy'])->middleware('jwt');

        // 

        // Route::resource('/user/teacher', TeacherUserController::class);

        //  Route::group(['middleware' => ['auth:api']], function () {
        Route::resource('Admin', AdminUserController::class);

        Route::resource('Student', StudentUserController::class);

        Route::resource('Teacher', TeacherUserController::class);

        Route::post('/ConfigurePassword', [UserRoleController::class, 'ConfigurePassword']);

        Route::post('Login', [UserRoleController::class, 'userLogin']);

        Route::post('/forgotPassword', [UserRoleController::class, 'ForgotPassword']);

        Route::resource('/Course', CoursesController::class);

        Route::resource('/Chapter', ChapterController::class);

        Route::get('/Course/Chapter/{course_id}', [ChapterController::class, 'course_chapter']);

        Route::post('/Chapter/Add_File', [ChapterController::class, 'addFile']);

        Route::delete('/Chapter/delete_file/{chapter_id}', [ChapterController::class, 'deleteFile']);
      //  });

        

        // 

        // Route::resource('/course/chapter', ChapterController::class);

        // Route::resource('/mockexam', MockExamController::class);

        // Route::resource('/course/assignment', AssignmentController::class);

        // Route::resource('/messages', MessagesController::class);

        // Route::resource('/gradebook', GradebookController::class);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// }); -->
