@component('mail::message')
# Forgot your password?

Hey **{{$first_name}}**, we received a request to reset your password,
<br><br>
 Let`s get you a new one!
 <br><br>
use **{{$otp}}** as your verification code
@component('mail::button',['url'=>'http://localhost:3000/ConfigurePassword'])
    Reset Password
@endcomponent
<br><br>
Didn`t request a password reset? You can ignore this message.
<br><br>
Thanks,<br>
DOT-LMS
    
@endcomponent






