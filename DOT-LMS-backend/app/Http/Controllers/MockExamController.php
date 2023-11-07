<?php

namespace App\Http\Controllers;

use App\Models\MockExam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\courses;

class MockExamController extends Controller
{

    /**
     * @OA\Get(
     *      path="/Mockexams",
     *      tags={"Mockexams"},
     *      summary="Get list of Exams in the DOT-LMS",
     *      description="Returns list of Exams",
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
        $exam = new MockExam();
        return response()->json(["exams" => $exam->orderBy('created_at', 'desc')->get()]);
    }

    /**
     * @OA\Post(
     *      path="/Mockexams",
     *      tags={"Mockexams"},
     *      summary="Store new Mock exam data into the database",
     *      description="Returns the status of the store functionality",
     *      @OA\RequestBody(
     *          required=true,
     *     @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(ref="#/components/schemas/MockExam")
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
            'exam_title' => 'required',
            'exam_topic' => 'required',
            'course_id' => 'required',
            'teacher_id' => 'required'
        ]);

        $uploadFolder = 'exams';
        $exam = $request->file('exam_contents');
        $exam_uploaded_path = $exam->store($uploadFolder, 'public');
        $url = 'http://127.0.0.1:8000/storage/exams/' . basename($exam_uploaded_path);

        $uploadedImageResponse = array(
            "image_name" => basename($exam_uploaded_path),
            "image_url" => $url,
            "mime" => $exam->getClientMimeType()
        );

        function ExamExistsID($id)
        {
            return MockExam::where('exam_id', $id)->exists();
        }

        $exam_id = 'EXM-' . mt_rand(1000, 9999);

        while (ExamExistsID($exam_id)) {
            $exam_id = 'EXM-' . mt_rand(1000, 9999);
        }

        if (!ExamExistsID($exam_id)) {

            $exam = new MockExam();
            $exam->Exam_id = $exam_id;
            $exam->Exam_title = $request->exam_title;
            $exam->Exam_topic = $request->exam_topic;
            $exam->Exam_content = $url;
            $exam->Course_id = $request->course_id;
            $exam->Teacher_id = $request->teacher_id;
            $exam->save();
        }

        return response()->json(['status' => 'Mock exam created']);
    }



    /* @OA\Get(
        *      path="/Mockexams/{id}",
        *      tags={"Mockexams"},
        *      summary="Get a specific Mockexam data",
        *      description="Returns the specified Mockexam data",
        *      @OA\Parameter(
        *          name="id",
        *          description="Exam id",
        *          required=true,
        * example = "EXM-7539",
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
        return MockExam::where('exam_id', $id)->firstOrFail();
    }

    /**
     * @OA\Put(
     *      path="/Mockexams/{id}",
     *      tags={"Mockexams"},
     *      summary="Update existing Mockexam",
     *      description="Returns updated Mockexam's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Exam's id",
     *          required=true,
     *          example = "EXM-7539",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *         @OA\MediaType(
     *          mediaType="multipart/form-data",
     *          @OA\Schema(ref="#/components/schemas/MockExam")
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
        $exam = MockExam::where('exam_id', $id)->first();
        $exam->update($request->all());
        return $exam;
    }

    /**
     * @OA\Delete(
     *      path="/Mockexams/{id}",
     *      tags={"Mockexams"},
     *      summary="Delete existing Mockexam",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Mockexam's id",
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
        $exam = MockExam::where('exam_id', $id)->firstorFail();
        if ($exam != null) {
            $exam->delete();
            return response()->json(['Message' => 'Exam Deleted']);
        } else {
            return response()->json(['Message' => 'Exam does not exist']);
        }
    }

    /**
     * @OA\Get(
     *      path="/Mockexams/Exam/{teacher_id}",
     *      tags={"Mockexams"},
     *      summary="Get exams that belongs to a specific course",
     *      description="Returns the exams of a course",
     *      @OA\Parameter(
     *          name="teacher_id",
     *          description="Teacher's id",
     * example = "TCH-6832",
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
    public function getExams(String $teacher_id)
    {
        $exams = MockExam::where('teacher_id', $teacher_id)->get();

        return response()->json([
            'Exam' => $exams,
        ]);
    }

    /**
     * @OA\Get(
     *      path="/Mockexams/Exam/Student/{course_id}",
     *      tags={"Mockexams"},
     *      summary="Get exams that belongs to a specific course",
     *      description="Returns the exams of a course",
     *      @OA\Parameter(
     *          name="course_id",
     *          description="Course's id",
     * example = "CUS-683",
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
     * )
     */
    public function getExams_byCourse(String $course_id)
    {
        $exams = MockExam::where('course_id', $course_id)->get();

        return response()->json([
            'Exam' => $exams,
        ]);
    }
}
