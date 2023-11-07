<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;

class EventsController extends Controller
{

    /**
     * @OA\Get(
     *      path="/Events",
     *      tags={"Events"},
     *      summary="Get list of Events in the DOT-LMS",
     *      description="Returns list of Events",
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
        return response()->json(["events" => Events::all()]);
    }

    /**
     * @OA\Post(
     *      path="/Events",
     *      tags={"Events"},
     *      summary="Store new Event's data into the database",
     *      description="Returns the entered Event's data",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/Events")
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

        function eventExists($id)
        {
            return Events::where('event_id', $id)->exists();
        }

        $event_id = 'EVNT-' . mt_rand(100, 999);

        while (eventExists($event_id)) {
            $event_id = 'EVNT-' . mt_rand(100, 999);
        }

        if (!eventExists($event_id)) {
            $event = new Events();
            $event->Event_title = $request->event_title;
            $event->Event_start = $request->event_start;
            $event->Event_end = $request->event_end;
            $event->Event_id = $event_id;
            $event->Teacher_id = $request->teacher_id;
            $event->Course_id = $request->course_id;
            $event->save();

            return response()->json(["success" => true]);
        } else {
            return response()->json(['error' => 'Event Already Exists']);
        }
    }


    /**
     * @OA\Get(
     *      path="/Events/{id}",
     *      tags={"Events"},
     *      summary="Get a specific Event",
     *      description="Returns the specified Event's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Event's id",
     *          required=true,
     * example = "EVNT-6832",
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
        return Events::where('event_id', $id)->firstOrFail();
    }


    /**
     * @OA\Put(
     *      path="/Events/{id}",
     *      
     *      tags={"Events"},
     *      summary="Update existing Events",
     *      description="Returns updated Event's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Event's id",
     *          required=true,
     * example = "EVNT-6832",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/Events")
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
        $event = Events::where('event_id', $id)->firstOrFail();
        $event->update($request->all());
        return $event;
    }

    /**
     * @OA\Delete(
     *      path="/Events/{id}",
     *      
     *      tags={"Events"},
     *      summary="Delete existing Event",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Event's id",
     *          required=true,
     *          in="path",
     * example = "EVNT-683",
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
        $event = Events::where('event_id', $id)->firstorFail();
        if ($event != null) {
            $event->delete();
            return response()->json(['Message' => 'Events Deleted']);
        } else {
            return response()->json(['Message' => 'Events does not exist']);
        }
    }


    /**
     * @OA\Get(
     *      path="/Events/Teacher/{teacher_id}",
     *      tags={"Events"},
     *      summary="Get Event based on a teacher's ID",
     *      description="Get Event data based on a teacher's ID",
     *      @OA\Parameter(
     *          name="teacher_id",
     *          description="Teacher's id",
     *          required=true,
     *          in="path",
     *          example = "TCH-6823",
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
    public function getByTeacherID(string $teacher_id)
    {
        $event = Events::where('teacher_id', $teacher_id)->get();
        return response()->json(['event' => $event]);
    }

    /**
     * @OA\Get(
     *      path="/Events/Course/{course_id}",
     *      tags={"Events"},
     *      summary="Get Event based on a course's ID",
     *      description="Get Event data based on a course's ID",
     *      @OA\Parameter(
     *          name="course_id",
     *          description="Course's id",
     *          required=true,
     *          in="path",
     *          example = "CUS-6823",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Successful operation",
     *          
     *       ),
     * )
     */
    public function getByCourseID(string $course_id)
    {
        $event = Events::where('course_id', $course_id)->get();
        return response()->json(['event' => $event]);
    }
}
