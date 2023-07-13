@component('mail::message')
# Welcome **{{$first_name}}** to DOT Learning Management System

You have been registered on the DOT LMS system and your User ID is **{{$user_id}}**, please use this User ID to login 
into the system and as for your password you can configure it by clicking the button below and using **{{$otp}}** as your verification code
@component('mail::button',['url'=>'http://localhost:3000/ConfigurePassword'])
    Configure Password
@endcomponent

Thanks,<br>
DOT-LMS
    
@endcomponent



