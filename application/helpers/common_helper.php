<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
* Common Helper functions used in app
* version: 2.1 (Last updated: 11-01-2019)
*/

/**
 * [To print array]
 * @param array $arr
*/
if ( ! function_exists('pr')) {
  function pr($arr)
  {
    echo '<pre>'; 
    print_r($arr);
    echo '</pre>';
    die;
  }
}

/**
 * [To print last query]
*/
if ( ! function_exists('lq')) {
  function lq()
  {
    $CI = & get_instance();
    echo $CI->db->last_query();
    die;
  }
}

/**
 * [To get database error message]
*/
if ( ! function_exists('db_err_msg')) {
  function db_err_msg()
  {
    $CI = & get_instance();
    $error = $CI->db->error();
    if(isset($error['message']) && !empty($error['message'])){
      return 'Database error - '.$error['message'];
    }else{
      return FALSE;
    }
  }
}

/**
 * [To get current datetime]
*/
if ( ! function_exists('datetime')) {
  function datetime($default_format='Y-m-d H:i:s')
  {
    $datetime = date($default_format);
    return $datetime;
  }
}


/**
 * [To encode string]
 * @param string $str
*/
if ( ! function_exists('encoding')) {
  function encoding($str){
      $one = serialize($str);
      $two = @gzcompress($one,9);
      $three = addslashes($two);
      $four = base64_encode($three);
      $five = strtr($four, '+/=', '-_.');
      return $five;
  }
}

/**
 * [To decode string]
 * @param string $str
*/
if ( ! function_exists('decoding')) {
  function decoding($str){
        $one = strtr($str, '-_.', '+/=');
        $two = base64_decode($one);
        $three = stripslashes($two);
        $four = @gzuncompress($three);
        if ($four == '') {
            return "z1"; 
        } else {
            $five = unserialize($four);
            return $five;
        }
    }
}

/**
 * [To check number is digit or not]
 * @param int $element
*/
if ( ! function_exists('is_digits')) {
  function is_digits($element){ // for check numeric no without decimal
      return !preg_match ("/[^0-9]/", $element);
  }
}

/**
 * [To get all months list]
*/
if ( ! function_exists('getMonths')) {
  function getMonths(){
    $monthArr = array('January','February','March','April','May','June','July','August','September','October','November','December');
    return $monthArr ;
  }
}

/**
 * Load styles for frontend or admin on specific pages
 * Modified in ver 2.0
 */
if (!function_exists('load_css')) {
    
    function load_css($css){

        if(!is_array($css) || count($css)>20){
            return;
        }
        $style_tag = $css_base_path = '';

        foreach($css as $style_src){

            if(strpos($style_src, 'http://') === false && strpos($style_src, 'https://') === false){
                $css_base_path = base_url() . $style_src;
            }

            $style_tag .= "<link href=\"{$css_base_path}\" rel=\"stylesheet\">\n";
        }
        echo $style_tag; //print style tags
    }
}

/**
 * Load scripts for frontend or admin on specific pages
 * Modified in ver 2.0
 */
if (!function_exists('load_js')) {

    function load_js($js=''){
        
        if(!is_array($js) || count($js)>20){
            return;
        }
        $script_tag = $js_base_path = '';

        foreach($js as $script_src){

            if(strpos($script_src, 'http://') === false && strpos($script_src, 'https://') === false){
                $js_base_path = base_url() . $script_src;
            }

            $script_tag .= "<script src=\"{$js_base_path}\"></script>\n";
        }

        echo $script_tag; //print script tags
    }
}

/**
 * For making alias of title or any string
 * Modified in ver 2.0
 */
if (!function_exists('make_alias')) {

    function make_alias($string){
        $string = strtolower(str_replace(' ', '_', $string)); // replace space with underscore
        $alias = preg_replace('/[^A-Za-z0-9]/', '', $string); // remove specail characters
        return $alias;
    }
}

/**
 * Check is string contains any special characters
 */
if (!function_exists('alpha_spaces')) {

    function alpha_spaces($string){
        if (preg_match('/^[a-zA-Z ]*$/', $string)) {
            return TRUE;
        }
        else{
            return FALSE; //match failed(string contains characters other than aplhabets and spaces)
        }
    }
}

/**
 * Display placeholder text when string is empty
 */
if (!function_exists('display_placeholder_text')) {

    function display_placeholder_text($string=''){
        if (empty($string)) {
            return 'NA'; //if string is empty return placeholder text
        }
        else{
            return $string;  //return string as it is
        }
    }
}

/**
 * Display elapsed time as user friendly string from timestamp
 */
if (!function_exists('time_elapsed_string')) {
    function time_elapsed_string($datetime, $full = false) {
        $now = new DateTime;
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hr',
            'i' => 'min',
            's' => 'sec',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full) $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
     }//End Function
}

/**
 * Make user profile image url from name or check if string already has url
 */
if (!function_exists('make_img_url')) {
    function make_user_img_url($img_str) {
        if (!empty($img_str)) { 
            //check if image consists url- happens in social login case
            if (filter_var($img_str, FILTER_VALIDATE_URL)) { 
                $img_src = $img_str;
            }
            else{
                $img_src = base_url().USER_AVATAR_PATH.$img_str;
            }
        }
        else{
            $img_src = base_url().USER_DEFAULT_AVATAR; //return default image if image is empty
        }
        
        return $img_src;
    }
}

/**
 * Make log of any event/action in destination file
 * Modified in ver 2.0
 */
if (!function_exists('log_event')) {
    
    function log_event($msg, $file_name='') {
        
        $log_path = APPPATH.'logs/'; //path for logs directory
        if(empty($file_name)){
            $file_path = $log_path.'common_log.txt'; //if file name is not defined then it will be logged in common file
        }else{
            $file_path = $log_path.$file_name;
        }

        $perfix = '['.datetime().'] ';  //add current date time
        $msg = $perfix.$msg."\r\n"; //create new line
        error_log($msg, 3, $file_path); //log message in file
    }
}

/**
 *  To force browser load new file from server (Prevent caching of file)
 *  Given a file, i.e. /css/base.css, replaces it with a string containing the
 *  file's mtime, i.e. /css/base.1221534296.css.
 *  
 *  @param $file_path  The file to be loaded.  Must be an absolute path (i.e. starting with slash).
 *  Rewrite rules written in htaccess
 */
function auto_version($file_path){
    
    $asset_path =  FCPATH.'frontend_asset';  //get absolute server path
    $mtime = filemtime($asset_path.$file_path); //get last modified file time
   
    if(strpos($file_path, '/') !== 0 || !$mtime)
        return $file_path;
    
    return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file_path);
}


/* CSRF and XSS protection helper methods start */

/**
 * Cross Site Scripting prevention filter before saving/processing data
 * Added in ver 2.0
 */
function sanitize_input_text($str){
    $CI = & get_instance();  // get instance, access the CI superobject
    return $CI->security->xss_clean($str);  //security library must be autoloaded
}

/**
 * Cross Site Scripting prevention filter while output data
 * Certain characters have special significance in HTML into their corresponding HTML entities
 * Added in ver 2.0
 */
function sanitize_output_text($str){
    return htmlspecialchars($str);
}

/**
 * Get CSRF (Cross-site request forgery) token key-value array
 * Added in ver 2.0
 */
function get_csrf_token(){
    $CI = & get_instance();  // get instance, access the CI superobject
    $csrf = array(
        'name' => $CI->security->get_csrf_token_name(),  //csrf token key
        'hash' => $CI->security->get_csrf_hash()  //csrf token value
    );
    return $csrf;
}
/* CSRF and XSS protection helper methods end */

/* User Session management methods start */
/**
 * Returns app logout url
 * Added in ver 2.0
 */
function app_logout_url(){
    return base_url('home/logout'); //can be changed depending upon application url
}

/**
 * Check if user is logged in
 * Added in ver 2.0
 */
// function is_user_logged_in(){
    
//     if(!isset($_SESSION[USER_SESS_KEY]))
//         return FALSE;
    
//     $user_sess_data = $_SESSION[USER_SESS_KEY]; //user session array
//     if( !empty($user_sess_data) &&  $user_sess_data['userId']) {
//        return TRUE;
//     }
//     return FALSE;  
// }

/**
 * Check if admin user is logged in
 * Added in ver 2.1
 */
function is_admin_logged_in(){
    //pr($_SESSION[ADMIN_USER_SESS_KEY]);
    if(!isset($_SESSION[ADMIN_USER_SESS_KEY]))
        return FALSE;  
    $admin_user_sess_data = $_SESSION[ADMIN_USER_SESS_KEY];
    //admin user session array
    if( !empty($admin_user_sess_data) &&  $admin_user_sess_data['id']) {
       return TRUE;
    }
    return FALSE;   
}

/**
 * Get logged in user data
 * Added in ver 2.0
 */
function get_user_session_data(){
    $user_data = '';
    if(is_user_logged_in()){
        $user_data = $_SESSION[USER_SESS_KEY]; //user session array
    }
    return $user_data;
}

/**
 * Get logged in admin user data
 * Added in ver 2.0
 */
function get_admin_session_data(){
    $admin_user_data = '';
    if(is_admin_logged_in()){
        $admin_user_data = $_SESSION[ADMIN_USER_SESS_KEY]; //admin user session array   
    }
    return $admin_user_data;
}
/* User Session management methods end */

/* Limit string based limit length */
function limit_string($str, $limit=35){
    if(strlen($str)>$limit)
      $str =  substr($str, 0, $limit) . '...';
    return $str;
}
//End

// return the age 
function age_diff($day, $month, $year){
    $year_diff  = date("Y") - $year;
    $month_diff = date("m") - $month;
    $day_diff   = date("d") - $day;
    if ($day_diff < 0 && $month_diff == 0) $year_diff--;
    if ($day_diff < 0 && $month_diff < 0) $year_diff--;
    return $year_diff;
}  
//End


function generate_random_token($length = 20){

    if (version_compare(phpversion(), '7.0.0', '<')) {
        // php version isn't high enough, use fallback method to generate token
        // Warning: This is not really a secure method. You should consider upgrading
        // your PHP version to 7.x
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $string = '';

        for ($i = 0; $i < $length; $i++) {
            $string .= $characters[mt_rand(0, strlen($characters) - 1)];
        }

        return $string;
    }else{
        //this requires PHP7.x
        return bin2hex(random_bytes($length));
    }
}

//generate 'remember me' selector:validator token  (in helper)
function generate_auth_token($validator){
    $selector = random_string('alnum', 12);  //generate random string for selector
    return $selector.':'.$validator;
}

function is_user_logged_in(){

    $cookie_name = 'livewire_remember_me_token';
    if(!isset($_SESSION[USER_SESS_KEY]) && empty($_COOKIE[$cookie_name]))
        return FALSE;

    if(isset($_SESSION[USER_SESS_KEY])){

       $user_sess_data = $_SESSION[USER_SESS_KEY]; //user session array

    }elseif(!empty($_COOKIE[$cookie_name])){
        if(verify_user_auth_cookie($cookie_name) !== TRUE){
          return FALSE;
        }

    }

    $user_sess_data = $_SESSION[USER_SESS_KEY]; //user session array
    if( !empty($user_sess_data) &&  $user_sess_data['userId']) {
        return TRUE;
    }
    return FALSE;  
}


function verify_user_auth_cookie($cookie_name){
    $CI =& get_instance();

    if(empty($_COOKIE[$cookie_name])){

      return FALSE;
    }
    $CI = & get_instance();  // get instance, access the CI superobject
    $token_value = $_COOKIE[$cookie_name];  //get 'remember me' selector:validator token

    $token_arr = explode(":", $token_value); // separate selector and validator
    $selector = $token_arr[0];
    $validator = $token_arr[1];

    //Now in `auth_token`(join with user) table check for selector, if not found return false
    //If found, get the corresponding hashed validator and verify it from password_verify()
    $field_second='userId';
    $field_first='user_id';
    $field_val='';
    $where = array('selector'=>$selector);
    $CI->load->model('common_model');
    $user = $CI->common_model->GetSingleJoinRecord('auth_token',$field_first,USERS,$field_second,$field_val,$where); 
    if(empty($user)){
      return FALSE;
    }
    if(!password_verify($validator,$user->hashedValidator)){
        return FALSE;
    }
    //token matched! get corresponding user detail and store it in session

    $session_data = array(
        'name' => $user->full_name,
        'email' => $user->email,
        'status' => $user->status,
        'userId' => $user->userId,
        'userType' => $user->user_type,
        'userMode' => $user->user_current_type_web,
        'profileImage' => $user->profile_photo,
        'completeProfile' => $user->profile_completed,
        'other_user_profile' => $user->other_user_type_profile_completed,
        'availability' => $user->availability,
        'is_email_verified' => $user->is_email_verified,
        'profile_step' => $user->profile_step,
        'new_post_alert' => $user->new_post_alert
    );

    $_SESSION[USER_SESS_KEY]  = $session_data;
  
    return TRUE;
}

if(!function_exists('getAddress')){ //using curl get address with all detail

    function getAddress($lat,$lng){
        
        $addr = array();
        if(!empty($lat) && !empty($lng)){
            
            $url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' . $lat . "," . $lng .'&key='.getenv('GOOGLE_API_KEY');
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            $response = curl_exec($ch);
            curl_close($ch);
            $output = json_decode($response);
            if (isset($output)) {

                $city='';$state='';$country='';$address='';
                $arr_count = sizeof($output->results);

                for ($i = 0; $i < $arr_count; $i++) {
                    //count lenght of array
                    if(empty($address)){
                        $address = $output->results[$i]->address_components; 
                    }
                    $c_count = sizeof($output->results[$i]->address_components);
                    //loop for check locality for city
                    for($j=0;$j<$c_count;$j++){

                        //get type value in array
                        $data = '';
                        $data = $output->results[$i]->address_components[$j]->types;

                        //check for locality exist set long name as city
                        if(in_array('locality', $data)){
                            //if locality exist get long name in city variable
                            $city = $output->results[$i]->address_components[$j]->long_name; 
                        }
                        if($city==''){
                            if(in_array('administrative_area_level_2',$data)){
                                //if exist get long name in city variable
                                $city = $output->results[$i]->address_components[$j]->long_name;
                            } 
                        }
                        if(in_array('administrative_area_level_1', $data)){
                            //if exist get long name in state variable
                            $state = $output->results[$i]->address_components[$j]->long_name;
                        }

                        if(in_array('country', $data)){
                            //if locality exist get long name in city variable
                            $country = $output->results[$i]->address_components[$j]->long_name; 
                        } 
                    }

                    $addr['current_address'] = $city.','.$state.','.$country;
                    $addr['formatted_address'] = $output->results[0]->formatted_address;
                    $addr['city'] = $city;
                    $addr['state'] = $state;
                    $addr['country'] = $country;
                }
                return $addr; 
            }else{
                return false; 
            }
        }else{
            return false; 
        } 
    }
}

/*******  Any new project specific helper method can be added below *********/

function get_platform_commission_percent() {

    $platform_commission_percent = 10; //Set default to 10%

    $CI = & get_instance();  // get instance, access the CI superobject
    $CI->load->model('common_model');

    $option_row = $CI->common_model->getsingle(OPTIONS, array('option_name'=>'platform_commission'));
    if(!empty($option_row)) {
        $platform_commission_percent = $option_row->option_value;
    }
    return $platform_commission_percent;
}

function calculate_platform_percent_amount($total_amount) {

    $platform_commission_percent = get_platform_commission_percent();

    $percent_amount = ((float)$total_amount * $platform_commission_percent)/100;

    // Round upto 2 decimal digits
    $platform_commission_amount = number_format($percent_amount, 2, '.', '');

    return $platform_commission_amount;
}

function get_currency_symbol($currency_code) {
    $default_currency_symbol = 'R';

    //Get the currency
    $jsonCurrency = file_get_contents(base_url().CURRENCY_JSON_FILE);
    $currency_arr = json_decode($jsonCurrency);

    if(isset($currency_arr->$currency_code))
        return $currency_arr->$currency_code;
    
    return $default_currency_symbol;
}

/**
 * Get project cost of hourly work(job)
 * Hourly Cost = Total hours * Worker rate
 * 
 * @param      int    $job_hours 
 * @param      int    $rate  Hourly rate of Worker
 * @return     float  $job_cost Total job cost
 * 
 */
function get_hourly_job_cost($job_hours, $rate){
    $job_budget = $job_hours * $rate;
    $job_cost = number_format($job_budget, 2, '.', ''); //round upto two decimal place
    return $job_cost;
}

//Only Numbers upto 2 decimal digits and max 6 digits are allowed
function check_decimal_number($number) {
    if (preg_match('/^[0-9]{1,6}(.[0-9]{1,2})?$/', $number ) ) {
        return TRUE;
    } else {
        return FALSE;
    }
}

/**
 * [To get all weekdays list]
*/
if ( ! function_exists('getWeekDays')) {
  function getWeekDays(){

    $weekArr = array('','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
    return $weekArr ;
  }
}

//This function return currency data
function currency_response(){
    $jsonCurrency = file_get_contents(base_url()."frontend_asset/currency.json");
    return json_decode($jsonCurrency);
}

//Supported Card Brands for peach Pay
function get_supported_card_brands() {
    return array (
        'VISA', 
        'MASTER', 
        'AMEX', 
        'DISCOVER', 
        'JCB', 
        'MAESTRO', 
        'DINERS', 
        'DANKORT'
    );
}

//Dispute reasons list
function get_dispute_reasons_list() {
    return array (
        'Work not done', 
        'Work done, but not satisfied', 
        'Work partially done', 
        'Others',
    );
}

//Dispute status list
function get_dispute_status_list() {
    return array (
        0=>'Pending',
        1=>'Resolved',
        2=>'Rejected'
    );
}

//Dispute action list
function get_dispute_action_list() {
    return array (
        0 => 'None',
        1 => 'Refund to Hirer',
        2 => 'Paid to Worker',
        3 => 'Partial payment'
    );
}

//Get location for public profile
function get_public_profile_address($location){

    if(!empty($location)){
        $location = implode(', ', $location);
        $location = explode(', ', $location);
        $location = array_reverse($location);
        $location = implode(', ', $location);
        return $location;
    }
}


function notificationTitleReplace($title,$name) {

    return str_replace("[SENDER_USERNAME]", "<span>".$name."</span>", $title);
}

// update notification status 
function notificationReadStauts($notiFyId) { 
    $CI = & get_instance();  // get instance, access the CI superobject
    $CI->load->model('common_model'); 
    $where = array('notificationId'=>$notiFyId);
    $select = 'is_read';
    $data = $CI->common_model->getRow(NOTIFICATIONS,$where,$select);
    if($data->is_read == '0'){
        $set = array('is_read'=>1);
        $updated = $CI->common_model->updateRow(NOTIFICATIONS,$where,$set);
    }    
} // End

//Make a notification redirect link from notification oject
function make_notification_link($noti_obj) {

    $pageLink = '';
    if(empty($noti_obj)) {
        return $pageLink;
    }

    $hirerJobDetailSlug = 'job/job_detail/';
    $workerFixedJobDetailSlug = 'worker/project_job_detail/';
    $workerHourlyJobDetailSlug = 'worker/hourly_job_detail/';
    $payload = json_decode($noti_obj->notification_payload);

    switch ($noti_obj->notification_type) {

        case 'new_job':
        case 'job_confirmed':
        case 'job_declined':
        case 'payment_released': 
        case 'additional_hours_request_cancelled':
        case 'application_unsuccessful': 
        case 'additional_hours_request':
        case 'application_unsuccessful_expired_job':
            $pageSlug = $workerHourlyJobDetailSlug;
            if($payload->job_type == 'fixed') {
                $pageSlug = $workerFixedJobDetailSlug;
            }    
        break;
    
        case 'payment_release_request':
        case 'job_applied': 
        case 'additional_hours_request_accept':
        case 'additional_hours_request_decline':
        case 'expiring_job':
            $pageSlug = $hirerJobDetailSlug;  
        break;
    
        case 'job_review':
        case 'dispute_action':
            $pageSlug = $hirerJobDetailSlug; 
            if( $payload->for_user_type == 'worker' ) {
                $pageSlug = $workerHourlyJobDetailSlug;
                if( $payload->job_type == 'fixed' ) { 
                    $pageSlug = $workerFixedJobDetailSlug;
                }
            }        
        break;
        default :
            $pageSlug = $hirerJobDetailSlug;
    } //switch case end 
    
    $pageLink = base_url().$pageSlug;
    $pageLink .= encoding($noti_obj->reference_id);
    $pageLink .= '/'.encoding($noti_obj->notificationId);
    return $pageLink;
}
