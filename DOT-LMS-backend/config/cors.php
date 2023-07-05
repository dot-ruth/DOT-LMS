<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

<<<<<<< HEAD
    'allowed_origins_patterns' => [],
=======
    'allowed_origins_patterns' => ['*'],
>>>>>>> 1b760b3cfbed96f1638195b35e5a3866d6bed2a6

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

<<<<<<< HEAD
    'supports_credentials' => false,
=======
    'supports_credentials' => true,
>>>>>>> 1b760b3cfbed96f1638195b35e5a3866d6bed2a6

];
