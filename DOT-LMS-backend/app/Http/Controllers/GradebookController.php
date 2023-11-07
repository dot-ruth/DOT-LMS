<?php

namespace App\Http\Controllers;

use App\Models\gradebook;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GradebookController extends Controller
{
    /**
     * @OA\Get(
     *      path="/Grade",
     *      tags={"Grade"},
     *      summary="Get list of Grades in the DOT-LMS",
     *      description="Returns list of Grades",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     *     )
     */
    public function index()
    {
        return response()->json([gradebook::all()]);
    }

    /**
     * @OA\Post(
     *      path="/Grade",
     *      tags={"Grade"},
     *      summary="Store new Grade's data into the database",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/gradebook")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *          
     *       ),
     *     
     * )
     */

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "course_id" => "required",
            "attendance" => "required",
            "individual_assignment" => 'required',
            'group_assignment' => 'required',
            'mid_exam' => 'required',
            'final_exam' => 'required',
            'student_id' => 'required'
        ]);

        if ($validation->fails()) {
            return response()->json(["success" => false, "validation_error" => $validation->errors()]);
        }

        function gradeExistsID($id)
        {
            return gradebook::where('student_id', $id)->exists();
        }

        $grade_id = 'GRD-' . mt_rand(100, 999);

        if (!gradeExistsID($request->student_id)) {

            $Grade = new gradebook();
            $Grade->grade_id = $grade_id;
            $Grade->Course_id = $request->course_id;
            $Grade->Attendance = $request->attendance;
            $Grade->Individual_assignment = $request->individual_assignment;
            $Grade->Group_assignment = $request->group_assignment;
            $Grade->Mid_exam = $request->mid_exam;
            $Grade->Final_exam = $request->final_exam;
            $Grade->Student_id = $request->student_id;
            $Grade->save();

            return response()->json("Grade Registered Successfully");
        } else {
            return response()->json([

                'error' => 'Grade Already Exists',

            ]);
        }
    }

    /**
     * @OA\Get(
     *      path="/Grade/{id}",
     *      tags={"Grade"},
     *      summary="Get a specific Grade",
     *      @OA\Parameter(
     *          name="id",
     *          description="Grade's id",
     *          required=true,
     * example = "DBUR-1255-23",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     * )
     */

    public function show(string $id)
    {
        return response()->json(gradebook::where('student_id', $id)->firstorFail());
    }

    /**
     * @OA\Put(
     *      path="/Grade/{id}",
     *      tags={"Grade"},
     *      summary="Update existing Grade",
     *      @OA\Parameter(
     *          name="id",
     *          description="Grade's id",
     *          required=true,
     * example = "GRD-765",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/gradebook")
     *      ),
     *      @OA\Response(
     *          response=202,
     *          description="Successful operation",
     *       ),
     *      
     * )
     */

    public function update(Request $request, string $id)
    {
        $grade = gradebook::where('grade_id', $id)->firstOrFail();
        $grade->update($request->all());
        return $grade;
    }

    /**
     * @OA\Delete(
     *      path="/Grade/{id}",
     *      tags={"Grade"},
     *      summary="Delete existing Grade",
     *      @OA\Parameter(
     *          name="id",
     *          description="Grade's id",
     *          required=true,
     *          in="path",
     * example = "GRD-765",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Successful operation",
     *       ),
     * )
     */

    public function destroy(string $id)
    {
        $grade = gradebook::where('grade_id', $id)->firstOrFail();
        $grade->destroy();
    }
}
