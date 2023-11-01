<?php

namespace App\Imports;

use App\Jobs\SendEmail;
use App\Mail\DOTLMSMail;
use App\Models\StudentUser;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\PendingDispatch;
use Maatwebsite\Excel\Concerns\WithChunkReading;

//class AddbyCSV implements ShouldQueue, WithChunkReading
class AddbyCSV implements ToModel
{

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */

    public function check_userExistsID($id)
    {
        return StudentUser::where('student_id', $id)->exists();
    }

    public function model(array $row)
    {

        $student_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');

        while ($this->check_userExistsID($student_id)) {
            $student_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');
        }

        dispatch(new SendEmail($student_id, $row[2], $row[0]));

        return new StudentUser([
            'student_id' => $student_id,
            'first_name' => $row[0],
            'last_name' => $row[1],
            'email' => $row[2],
            'department' => $row[3],
        ]);
    }

    // public function handle(array $row)
    // {
    //     return response()->json([
    //         'file uploaded'
    //     ]);
    // }

    // public function chunkSize(): int
    // {
    //     return 50; // Set your preferred chunk size here
    // }
}
