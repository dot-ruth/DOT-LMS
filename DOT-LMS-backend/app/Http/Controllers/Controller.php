<?php

namespace App\Http\Controllers;

use App\Models\courses;
use App\Models\StudentUser;
use App\Models\TeacherUser;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="DOT-LMS API Documentation",
 *      @OA\Contact(
 *          email="ruthgetaneh5@gmail.com"
 *      ),
 *      
 * )
 *
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_HOST,
 *      description="DOT-LMS API Server"
 * )

 *
 * @OA\Tag(
 *     name="DOT-LMS",
 *     description="API Endpoints of DOT-LMS"
 * )
 * 
 * 
 * @OA\SecurityScheme(
 *     type="http",
 *     description="bearer token for authentication",
 *     name="Token based ",
 *     in="header",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     securityScheme="jwt",
 * )
 *
 */
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
