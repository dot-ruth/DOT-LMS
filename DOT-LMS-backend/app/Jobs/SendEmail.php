<?php

namespace App\Jobs;

use App\Mail\DOTLMSMail;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    public $student_id, $email, $name;
    public function __construct($student_id, $email, $name)
    {
        $this->student_id = $student_id;
        $this->email = $email;
        $this->name = $name;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $one_time_passcode = mt_rand(100000, 999999);

        Cache::put($this->student_id, $one_time_passcode);

        Mail::to($this->email)->send(new DOTLMSMail($this->name, $this->student_id, $one_time_passcode));
    }
}
