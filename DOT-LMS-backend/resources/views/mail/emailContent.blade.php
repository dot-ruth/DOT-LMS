@component('mail::message')
# Wellcome **{{$first_name}}** to DOT Learning Management System

You have been registered on the DOT LMS system and your User ID is **{{$user_id}}**, please use this User ID to login 
into the system and as for your password you can configure it by clicking the button below
@component('mail::button',['url'=>'link'])
    Configure Password
@endcomponent

Thanks,<br>
DOT-LMS
    
@endcomponent



