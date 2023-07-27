<?php

namespace App\Http\Controllers;

use App\Models\courses;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
        return response()->json(["courses" => courses::all(), "course_count" => courses::count()]);
    }

    /**
     * @OA\Post(
     *      path="/Course",
     *      tags={"Course"},
     *      summary="Store new Course data into the database",
     *      description="Returns the entered Course data",
     *      @OA\RequestBody(
     *          required=true,
     * @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(ref="#/components/schemas/courses")
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

        /** @var \Illuminate\Filesystem\FilesystemManager $image_url */
        // $image_url = Storage::disk('public');
        $url = 'http://127.0.0.1:8000/storage/course_image/' . basename($image_uploaded_path);

        $uploadedImageResponse = array(
            "image_name" => basename($image_uploaded_path),
            "image_url" => $url,
            "mime" => $image->getClientMimeType()
        );
        function userExistsID($id)
        {
            return courses::where('course_id', $id)->exists();
        }

        $course_id = 'CUS-' . mt_rand(1000, 9999);

        while (userExistsID($course_id)) {
            $course_id = 'CUS-' . mt_rand(1000, 9999);
        }

        if (!userExistsID($course_id)) {

            $course = new courses();
            $course->Course_title = $request->course_title;
            $course->course_id = $course_id;
            $course->Course_img = $url;
            $course->Course_topic = $request->course_topic;
            $course->Course_description = $request->course_description;
            $course->save();
        }

        return response()->json(['File Uploaded Successfully', 'success', 200, $uploadedImageResponse, 'request' => $request->all() . $request->file('course_img')]);
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
     *    
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
     *          mediaType="application/json",
     *          @OA\Schema(
     *                 @OA\Property(
     *                     property="course_title",
     *                     title="coursetitle",
     *                     description="Title of the Course",
     *                     example="Web Development"
     *                 ),
     *                 @OA\Property(
     *                     property="course_topic",
     *                     title="coursetopic",
     *                     description="Topic the course focuses on",
     *                     example="Javascript"
     *                 ),
     *                 @OA\Property(
     *                     property="course_description",
     *                     title="coursedescription",
     *                     description="A Brief description of the course to be added",
     *                     example="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a varius nisl, a tempor felis. Aenean pretium convallis odio, at gravida lorem imperdiet porttitor. Pellentesque vitae eros rhoncus, euismod lectus at, bibendum urna. Integer id dolor at mi vulputate iaculis. Donec sodales nisl cursus, fermentum nibh quis, vehicula dolor. In facilisis lacus vitae imperdiet gravida. Suspendisse leo erat, rutrum vel pharetra vitae, vehicula commodo dui. Donec molestie, magna ut sodales faucibus, est turpis finibus tellus, tincidunt dapibus libero metus non orci. Sed tempor turpis dui, at vehicula tortor lacinia vel. Quisque at leo eget leo pretium semper. Suspendisse venenatis porta sapien eu finibus. Maecenas ultrices ut lacus nec feugiat. Quisque laoreet sapien ac dui faucibus, non euismod dui condimentum. Fusce ultrices leo id nibh hendrerit, non maximus justo scelerisque. Fusce semper lacus massa, quis auctor risus feugiat et. Curabitur volutpat nulla non nibh elementum, ut tempus metus imperdiet."
     *                 )
     *             )
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
        $user = courses::where('course_id', $id)->firstorFail();
        if ($user != null) {
            $user->delete();
            return response()->json(['Message' => 'Course Deleted']);
        } else {
            return response()->json(['Message' => 'Course does not exist']);
        }
    }
}
