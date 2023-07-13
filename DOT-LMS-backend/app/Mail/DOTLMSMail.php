<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DOTLMSMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        private $first_name,
        private $user_id,
        private $otp,
    ) {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'DOT LMS Registration',
        );
    }

    // /**
    //  * Get the message content definition.
    //  */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.emailContent',
            with: [
                'first_name' => $this->first_name,
                'user_id' => $this->user_id,
                'otp' => $this->otp,
            ]
        );
    }

    // /**
    //  * Get the attachments for the message.
    //  *
    //  * @return array<int, \Illuminate\Mail\Mailables\Attachment>
    //  */
    public function attachments(): array
    {
        return [];
    }
    // public function build()
    // {
    //     return $this
    //         ->from('dotlms99@gmail.com')
    //         ->to('ruthgetaneh5@gmail.com')
    //         ->subject('test subject')
    //         ->view('mail.emailContent');
    // }
}
