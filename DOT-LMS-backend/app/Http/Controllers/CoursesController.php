<?php

namespace App\Http\Controllers;

use App\Models\courses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;


class CoursesController extends Controller
{
    /**
     * @OA\Get(
     *      path="/Course",
     *      tags={"Course"},
     *      summary="Get list of Courses in the DOT-LMS",
     *      description="Returns list of Courses",
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
        $courses = new courses();
        return response()->json(["courses" => $courses->orderBy('created_at', 'desc')->get(), "course_count" => courses::count()]);
    }

    /**
     * @OA\Post(
     *      path="/Course",
     *      tags={"Course"},
     *      summary="Store new Course data into the database",
     *      description="Returns the entered Course data",
     *      @OA\RequestBody(
     *          required=true,
     *     @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(ref="#/components/schemas/courses")
     *   )  
     *      ),
     *      @OA\Response(
     *          response=201,
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
     * @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_title' => 'required',
            'course_topic' => 'required',
            'course_description' => 'required'
        ]);
        $uploadFolder = 'course_image';
        $image = $request->file('course_img');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $url = 'http://127.0.0.1:8000/storage/course_image/' . basename($image_uploaded_path);

        $uploadedImageResponse = array(
            "image_name" => basename($image_uploaded_path),
            "image_url" => $url,
            "mime" => $image->getClientMimeType()
        );
        function CourseExistsID($id)
        {
            return courses::where('course_id', $id)->exists();
        }

        $course_id = 'CUS-' . mt_rand(1000, 9999);

        while (CourseExistsID($course_id)) {
            $course_id = 'CUS-' . mt_rand(1000, 9999);
        }

        if (!CourseExistsID($course_id)) {

            $course = new courses();
            $course->Course_title = $request->course_title;
            $course->course_id = $course_id;
            $course->Course_img = $url;
            $course->Course_topic = $request->course_topic;
            $course->Course_description = $request->course_description;
            $course->save();
        }

        return response()->json(['File Uploaded Successfully', 'success', 200, $uploadedImageResponse, 'request' => $request->all()]);
    }

    /**
     * @OA\Get(
     *      path="/Course/{id}",
     *      
     *      tags={"Course"},
     *      summary="Get a specific Course data",
     *      description="Returns the specified Course data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Course id",
     *          required=true,
     * example = "CUS-7539",
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
        return courses::where('course_id', $id)->firstOrFail();
    }

    /**
     * @OA\Put(
     *      path="/Course/{id}",
     *      tags={"Course"},
     *      summary="Update existing Course",
     *      description="Returns updated Course's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Course's id",
     *          required=true,
     *          example = "CUS-7539",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *         @OA\MediaType(
     *          mediaType="multipart/form-data",
     *          @OA\Schema(ref="#/components/schemas/courses")
     *     )    
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
        $course = courses::where('course_id', $id)->first();
        $course->update($request->all());
        return $course;
    }

    /**
     * @OA\Delete(
     *      path="/Course/{id}",
     *      tags={"Course"},
     *      summary="Delete existing Course",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Course's id",
     *          required=true,
     *          in="path",
     * example = "CUS-7539",
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

        $course = courses::where('course_id', $id)->firstorFail();

        $current_courses = DB::table('teacher_users')->where('course_id', 'like', '%' . $id . '%')->value('course_id');
        $course_array = explode(",", $current_courses);
        $index = array_search($id, $course_array);
        unset($course_array[$index]);
        $string_course_array = implode(",", $course_array);
        DB::table('teacher_users')->where('course_id', 'like', '%' . $id . '%')->update([
            'course_id' => $string_course_array,
        ]);
        if ($course != null) {
            $course->delete();
            return response()->json(['Message' => 'Course Deleted']);
        } else {
            return response()->json(['Message' => 'Course does not exist']);
        }
    }
}
