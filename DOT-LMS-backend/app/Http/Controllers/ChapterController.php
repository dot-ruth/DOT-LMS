<?php

namespace App\Http\Controllers;

use App\Models\chapter;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class ChapterController extends Controller
{
    /**
     * @OA\Get(
     *      path="/Chapter",
     *      tags={"Chapter"},
     *      summary="Get list of all the Chapters ",
     *      description="Returns list of Chapter in a course",
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
        return response()->json(['chapter' => chapter::all()]);
    }

    /**
     * @OA\Post(
     *      path="/Chapter",
     *      tags={"Chapter"},
     *      summary="Store new Course data into the database",
     *      description="Returns the entered Course data",
     *      @OA\RequestBody(
     *          required=true,
     * @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(ref="#/components/schemas/chapter")
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
            'chapter_title' => 'required',
            'chapter_description' => 'required',
            'course_id' => 'required',
            'file_name' => 'required|string'
        ]);
        $uploadFolder = 'chapter_content';
        $chapter_file = $request->file('chapter_contents');
        $file_uploaded_path = $chapter_file->store($uploadFolder, 'public');
        $url = 'http://127.0.0.1:8000/storage/chapter_content/' . basename($file_uploaded_path);

        $uploadedFileResponse = array(
            "file_name" => basename($file_uploaded_path),
            "file_url" => $url,
            "mime" => $chapter_file->getClientMimeType()
        );
        function userExistsID($id)
        {
            return chapter::where('chapter_id', $id)->exists();
        }

        $chapter_id = 'CHP-' . mt_rand(1000, 9999);

        while (userExistsID($chapter_id)) {
            $chapter_id = 'CHP-' . mt_rand(1000, 9999);
        }

        if (!userExistsID($chapter_id)) {

            $chapter = new chapter();
            $chapter->Chapter_title = $request->chapter_title;
            $chapter->File_Name = $request->file_name;
            $chapter->Chapter_id = $chapter_id;
            $chapter->Chapter_Contents = $url;
            $chapter->Course_id = $request->course_id;
            $chapter->Chapter_description = $request->chapter_description;
            $chapter->save();
        }

        return response()->json(['File Uploaded Successfully', 'success', 200, $uploadedFileResponse, 'request' => $request->all()]);
        // return response()->json(['chapter_contene' => $chapter->chapter_contents, 'file_name' => $chapter->file_name]);
    }


    /**
     * @OA\Post(
     *      path="/Chapter/Add_File",
     *      tags={"Chapter"},
     *      summary="Store new file into the database",
     *      description="Returns an array of the file name and files",
     *      @OA\RequestBody(
     *          required=true,
     * @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(
     * @OA\Property(
     *                     property="chapter_id",
     *                     type="string",
     *                     example="CHP-3213"
     *                 ),
     * @OA\Property(
     *                     property="file_name",
     *                     type="string",
     *                     example="HTML"
     * 
     *                 ),
     *                 @OA\Property(
     *                     property="chapter_contents",
     *                     type="string",
     *                     format="binary"
     *                 )
     *                 
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
    public function addFile(Request $request)
    {

        $uploadFolder = 'chapter_content';
        $chapter_file = $request->file('chapter_contents');
        $file_uploaded_path = $chapter_file->store($uploadFolder, 'public');
        $url = 'http://127.0.0.1:8000/storage/chapter_content/' . basename($file_uploaded_path);


        $chapter_contents_column = 'chapter_contents';
        $current_files = DB::table('chapters')->where('chapter_id', $request->chapter_id)->value($chapter_contents_column);
        $new_file = $current_files . ',' . $url;
        DB::table('chapters')->where('chapter_id', $request->chapter_id)->update([
            $chapter_contents_column => $new_file,
        ]);

        $file_name_column = 'file_name';
        $current_file_names = DB::table('chapters')->where('chapter_id', $request->chapter_id)->value($file_name_column);
        $new_file_name = $current_file_names . ',' . $request->file_name;
        DB::table('chapters')->where('chapter_id', $request->chapter_id)->update([
            $file_name_column => $new_file_name,
        ]);

        return response()->json([
            'file_name_array' => DB::table('chapters')->where('chapter_id', $request->chapter_id)->value($file_name_column),
            'file array' => DB::table('chapters')->where('chapter_id', $request->chapter_id)->value($chapter_contents_column),

        ]);
    }

    /**
     * @OA\Delete(
     *      path="/Chapter/delete_file/{chapter_id}",
     *      tags={"Chapter"},
     *      summary="delete file from the database",
     *      description="Returns true if the file is deleted",
     *      @OA\Parameter(
     *         name="chapter_id",
     *         in="header",
     *         required=true,
     *     ),
     * @OA\Parameter(
     *         name="url",
     *         in="header",
     *         required=true,
     *     ),
     * @OA\Parameter(
     *         name="file_name",
     *         in="header",
     *         required=true,
     *     ),
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
    public function deleteFile(Request $request, string $chapter_id)
    {
        $chapter_contents_column = 'chapter_contents';
        $current_files = DB::table('chapters')->where('chapter_id', $request->header('chapter_id'))->value($chapter_contents_column);
        $file_array = explode(",", $current_files);
        $index = array_search($request->header('url'), $file_array);
        unset($file_array[$index]);
        $string_file_array = implode(",", $file_array);
        DB::table('chapters')->where('chapter_id', $request->header('chapter_id'))->update([
            $chapter_contents_column => $string_file_array,
        ]);

        $file_name_column = 'file_name';
        $current_file_names = DB::table('chapters')->where('chapter_id', $request->header('chapter_id'))->value($file_name_column);
        $file_name_array = explode(",", $current_file_names);
        $name_index = array_search($request->header('file_name'), $file_name_array);
        unset($file_name_array[$name_index]);
        $string_file_name_array = implode(",", $file_name_array);
        DB::table('chapters')->where('chapter_id', $request->header('chapter_id'))->update([
            $file_name_column => $string_file_name_array,
        ]);

        return response()->json([
            'response' => 'updated'
        ]);
    }


    /**
     * @OA\Get(
     *      path="/Chapter/{id}",
     *      
     *      tags={"Chapter"},
     *      summary="Get a specific Chapter data",
     *      description="Returns the specified Chapter's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Chapter id",
     *          required=true,
     *          example = "CHP-7539",
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
        return chapter::where('chapter_id', $id)->firstOrFail();
    }

    /**
     * @OA\Get(
     *      path="/Course/Chapter/{course_id}",
     *      tags={"Chapter"},
     *      summary="Get a  Chapter data for a specified course",
     *      description="Returns the  Chapter's data of a specific course",
     *      @OA\Parameter(
     *          name="course_id",
     *          description="Course id",
     *          required=true,
     *          example = "CUS-7539",
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
    public function course_chapter(string $id)
    {
        $chapter = new chapter();
        return response()->json(['chapter' => $chapter->where('course_id', $id)->get()]);
    }

    /**
     * @OA\Put(
     *      path="/Chapter/{id}",
     *      tags={"Chapter"},
     *      summary="Update existing Chapter",
     *      description="Returns updated Chapter's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Chapter's id",
     *          required=true,
     *          example = "CHP-7539",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      
     * @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/chapter")
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
        $chapter = chapter::where('chapter_id', $id)->first();
        $chapter->update($request->all());
        return $chapter;
    }

    /**
     * @OA\Delete(
     *      path="/Chapter/{id}",
     *      tags={"Chapter"},
     *      summary="Delete existing Chapter",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Chapter's id",
     *          required=true,
     *          in="path",
     *          example = "CHP-7539",
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
        $user = chapter::where('chapter_id', $id)->firstorFail();
        if ($user != null) {
            $user->delete();
            return response()->json(['Message' => 'Course Deleted']);
        } else {
            return response()->json(['Message' => 'Course does not exist']);
        }
    }
}
