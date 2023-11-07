<?php

namespace App\Http\Controllers;

use App\Mail\DOTLMSMail;
use App\Imports\AddbyCSV;
use App\Models\StudentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\courses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Bus\PendingDispatch;

class StudentUserController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['store', 'index']]);
    }


    /**
     * @OA\Get(
     *      path="/Student",
     *      tags={"Student"},
     *      summary="Get list of Students in the DOT-LMS",
     *      description="Returns list of Students",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     * @OA\Response(
     *          response=500,
     *          description="Server error",
     *      ),
     *     )
     */
    public function index()
    {
        return response()->json(["students" => StudentUser::all(), "student_count" => StudentUser::count()]);
    }




    /**
     * @OA\Post(
     *      path="/Student",
     *      tags={"Student"},
     *      summary="Store new Student's data into the database",
     *      description="Returns the entered Student's data",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/StudentUser")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     * @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "first_name" => "required",
            "last_name" => "required",
            "email" => ['required', 'email'],
            'department' => 'required'
        ]);

        if ($validation->fails()) {
            return response()->json(["success" => false, "validation_error" => $validation->errors()]);
        }

        function userExistsID($id)
        {
            return StudentUser::where('student_id', $id)->exists();
        }

        function userExistsEmail($email)
        {
            return StudentUser::where('email', $email)->exists();
        }

        $student_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');



        while (userExistsID($student_id)) {
            $student_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');
        }


        if (!userExistsEmail($request->email)) {

            $Student_user = new StudentUser();
            $Student_user->student_id = $student_id;
            $Student_user->First_Name = $request->first_name;
            $Student_user->Last_Name = $request->last_name;
            $Student_user->Department = $request->department;
            $Student_user->Email = $request->email;
            $Student_user->Year = $request->year;
            $Student_user->Semester = $request->semester;
            $Student_user->password = null;
            $Student_user->save();

            $token = Auth::fromUser($Student_user);

            $one_time_passcode = mt_rand(100000, 999999);

            Cache::put($Student_user->student_id, $one_time_passcode);

            Mail::to($Student_user->Email)->send(new DOTLMSMail($Student_user->First_Name, $Student_user->student_id, $one_time_passcode));


            return response()->json(["success" => true, 'token' => $token]);
        } else {
            return response()->json([

                'error' => 'User Already Exists',

            ]);
        }
    }

    /**
     * @OA\Post(
     *      path="/Student/AddbyCSV",
     *      tags={"Student"},
     *      summary="Store",
     *      description="Returns an array of the file name and files",
     *      @OA\RequestBody(
     *          required=true,
     * @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(
     * @OA\Property(
     *                     property="csv_file",
     *                     type="string",
     *                     format="binary"
     * 
     *                 ),
     * )
     *   )
     *         
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     * @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function CSV_Import(Request $request)
    {
        $csv_file = $request->file('csv_file');
        $uploadFolder = 'CSV files';
        $file_uploaded_path = $csv_file->store($uploadFolder, 'public');
        $add_by_csv = new AddbyCSV();

        Excel::import($add_by_csv, $file_uploaded_path, null, 'Csv');




        return response()->json([
            'status' => 'Students are added through CSV'
        ]);
    }



    /**
     * @OA\Get(
     *      path="/Student/{id}",
     *      
     *      tags={"Student"},
     *      summary="Get a specific Student",
     *      description="Returns the specified Student's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Student's id",
     *          required=true,
     * example = "DBUR-6832-23",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function show(string $id)
    {
        $Student_user = StudentUser::where('student_id', $id)->firstOrFail();

        $token = Auth::fromUser($Student_user);

        $user = StudentUser::where('Student_id', $id)->firstorFail();

        return response()->json(['user' => $user, 'token' => $token]);
    }

    /**
     * @OA\Put(
     *      path="/Student/{id}",
     *      tags={"Student"},
     *      summary="Update existing Student",
     *      description="Returns updated Student's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Student's id",
     *          required=true,
     * example = "DBUR-6832-23",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/StudentUser")
     *      ),
     *      @OA\Response(
     *          response=202,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */
    public function update(Request $request, string $id)
    {
        $user = StudentUser::where('student_id', $id)->first();
        $user->update($request->all());
        return $user;
    }

    /**
     * @OA\Delete(
     *      path="/Student/{id}",
     *      
     *      tags={"Student"},
     *      summary="Delete existing Student",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Student's id",
     *          required=true,
     *          in="path",
     * example = "DBUR-6832-23",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */
    public function destroy(string $id)
    {
        $user = StudentUser::where('student_id', $id)->firstorFail();
        if ($user != null) {
            $user->delete();
            return response()->json(['Message' => 'User Deleted']);
        } else {
            return response()->json(['Message' => 'User does not exist']);
        }
    }


    /**
     * @OA\Post(
     *      path="/Student/Assign_courses",
     *      tags={"Student"},
     *      summary="Assign courses to students",
     *      description="Assign courses to students",
     *      @OA\RequestBody(
     *          required=true,
     * @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(
     * @OA\Property(
     *                     property="student_id",
     *                     type="string",
     *                     example="DBU-3213-23"
     *                 ),
     * @OA\Property(
     *                     property="course_id",
     *                     type="string",
     *                     example="CUS-3245"
     * 
     *                 ),
     * )
     *   )
     *         
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     * @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function Assign_course(Request $request)
    {

        $assigned_courses = DB::table('student_users')->where('student_id', $request->student_id)->value('course_id');
        $new_assigned_course =  $assigned_courses . ',' . $request->course_id;

        $student_user = StudentUser::where('student_id', $request->student_id)->firstorFail();

        $student_user->update([
            'course_id' => $new_assigned_course,
        ]);

        return response()->json([
            'Assigned Courses' => DB::table('student_users')->where('student_id', $request->student_id)->value('course_id'),
        ]);
    }

    /**
     * @OA\Get(
     *      path="/Student/AssignedCourse/{student_id}",
     *      tags={"Student"},
     *      summary="Get assigned courses for a student",
     *      description="Returns the assigned courses for a student",
     *      @OA\Parameter(
     *          name="student_id",
     *          description="Student's id",
     *          required=true,
     * example = "DBU-6832-23",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function getAssignedCourses(String $student_id)
    {
        $course_array = explode(",", DB::table('student_users')->where('student_id', $student_id)->value('course_id'));
        $course_name_array = [];
        $course_data_array = [];

        foreach ($course_array as $course) {
            if ($course != "") {
                array_push($course_name_array, DB::table('courses')->where('course_id', $course)->value('course_title'));
                array_push($course_data_array, courses::where('course_id', $course)->firstorFail());
            }
        }

        return response()->json([
            'AssignedCourses' => $course_name_array,
            'Course_Data' => $course_data_array
        ]);
    }


    /**
     * @OA\Post(
     *      path="/Student/AssignbyBatch",
     *      tags={"Student"},
     *      summary="Assign courses to students by Batch",
     *      description="Assign courses to students by Batch",
     *      @OA\RequestBody(
     *          required=true,
     * @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(
     * @OA\Property(
     *                     property="entry_year",
     *                     type="string",
     *                     example="23"
     *                 ),
     * @OA\Property(
     *                     property="course_id",
     *                     type="string",
     *                     example="CUS-3245"
     * 
     *                 ),
     * @OA\Property(
     *                     property="department",
     *                     type="string",
     *                     example="computer science"
     * 
     *                 ),
     * )
     *   )
     *         
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     * @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function AssignbyBatch(Request $request)
    {
        $student_id_by_department_array = DB::table('student_users')->where('department', $request->department)->pluck('student_id');
        $student_id_by_batch_array = [];

        foreach ($student_id_by_department_array as $student) {
            if ($student != "") {
                $batch = explode("-", $student);
                if ($batch[2] == $request->entry_year) {
                    array_push($student_id_by_batch_array, $student);
                }
            }
        }



        foreach ($student_id_by_batch_array as $student) {
            $assigned_courses = DB::table('student_users')->where('student_id', $student)->value('course_id');
            $new_assigned_course =  $assigned_courses . ',' . $request->course_id;

            $student_user = StudentUser::where('student_id', $student)->firstorFail();

            $student_user->update([
                'course_id' => $new_assigned_course,
            ]);
        }



        return response()->json([
            'status' => 'assigned course to all students'
        ]);
    }

    /**
     * @OA\Get(
     *      path="/Student/Course/{course_id}",
     *      tags={"Student"},
     *      summary="Get a list of students in a specified course",
     *      @OA\Parameter(
     *          name="course_id",
     *          description="Course's id",
     *          required=true,
     * example = "CUS-6832",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *  @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *       ),
     *     
     * )
     */
    public function getStudentList_Course(String $course_id)
    {
        $student_users = StudentUser::where('course_id', 'like', '%' . $course_id . '%')->get();

        return response()->json($student_users);
    }
}
