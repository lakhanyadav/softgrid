<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
* Response message helper function used in app
* Contains response messages with their corresponding message code
* version: 2.0 (24-08-2018)
*/

/**
 * Get message from codes
 * Modified in ver 2.0
 */
function get_response_message($msg_code){
    
    $message_arr = array(
        
        100 => "Invalid API key",
        101 => "Invalid token",
        102 => "Invalid Email or Password",
        103 => "User authentication successfully done",
        104 => "User not found",
        105 => "User registration successfully done",
        106 => "No record found",
        107 => "Something went wrong. Please try again",  //something went wrong
        108 => "You are currently not authorised to login",
        109 => "Invalid request",
        110 => "This email address is already registered",
        111 => "You are temporary inactive by admin",
        112 => 'Email is verified',
        113 => 'Token is expired',
        114 => 'Email verified',
        115 => 'Email not verified',
        116 => 'Record not found',
        117 => 'Skills added successfully',
        118 => 'Skills is not added successfully',

        120 => "A new password has been sent on your registered email",
        121 => "Logged in successfully",
        122 => "Added successfully",
        123 => "Email Id not registered",
        124 => "Deleted successfully",
        125 => "Logged out successfully",
        126 => "You are not authorised for this action",
        127 => "Invalid user type",
        128 => "Mail Successfully Sent,Please Check Mail",
        129 => "More info added successfully",
        130 => "More info is not added successfully",
        131 => "Intro video is added successfully",
        132 => "Intro video is not added successfully",
        133 => "This card number is already registered",
        134 => "Please provied your credit card details. You can add card details from your profile settings under Manage Credit Card option.",
        135 => "Your project does not added",
        136 => 'Your project has been successfully shared',
        137 => "Your fixed project meta does not added",
        138 => "You have already sent request",
        
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found',
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        306 => '(Unused)',
        307 => 'Temporary Redirect',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Timeout',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Required',
        412 => 'Precondition Failed',
        413 => 'Request Entity Too Large',
        414 => 'Request-URI Too Long',
        415 => 'Unsupported Media Type',
        416 => 'Requested Range Not Satisfiable',
        417 => 'Expectation Failed',
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway Timeout',
        505 => 'HTTP Version Not Supported',
        518 => 'Email id associated with social account',
        521 => 'Please select correct user type',
        530 => 'Incorrect email or password'
    );
    
    $no_msg = '';
    if(!array_key_exists($msg_code,$message_arr)){
        return $no_msg; //code does not exist, return empty string
    }
    
    return $message_arr[$msg_code];  //return message corresponding to code
}