<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
* Common controller for Front(website) modules
* version: 2.0 (14-08-2018)
*/

require APPPATH . "third_party/MX/Controller.php"; //include MX library (HMVC library)

class Common_Front_Controller extends MX_Controller {

    public function __construct(){
        parent::__construct();
        $this->form_validation->CI =& $this; //required for form validation callbacks in HMVC
        $this->user_session_key = USER_SESS_KEY; //user session key
        $this->tbl_users = USERS; //users table
    }
    
    /**
     * User session authentication for pages
     * Modified in ver 2.0
     */
    public function check_user_session(){
        $page_slug = $this->router->fetch_method();
        // echo $page_slug;
        // die();
        $allowed_pages = array('index','login','signup','selectUserType','emailVerify', 'add_card', 'save_card'); //these pages/methods do not require user authentication
        $allowed_control = 'auth'; //methods of this controller does not require authentication
        $current_control = $this->router->fetch_class(); // get current controller, class = controller
        
        if(!is_user_logged_in() && (in_array($page_slug,$allowed_pages)) && $current_control == $allowed_control){
            return TRUE; //session is empty and pages is not restricted
        }else{
            //either page is resticted or session exist
            
            if(!is_user_logged_in()){
                redirect(''); //redirect to home/login if session not exit
            }
            
            //user session exists
            $user_sess_data = $_SESSION[$this->user_session_key]; //user session array
            $session_u_id = $user_sess_data['userId']; //user ID
            $where = array('userId'=>$session_u_id,'status'=>1); //status:0 means active 
            $check = $this->common_model->is_data_exists($this->tbl_users,$where);

            if($check===FALSE){
               //user is either deleted or is inactivated
               $this->logout(); //force logout
            }
            
            if(empty($page_slug)) {
                $this->verify_user_mode($check);
                return TRUE; //if slug is empty and session is set
            }
            
            $after_auth = array('signup','auth','index','selectUserType','login','emailVerify'); //restrict access to these pages if session is set
            if(in_array($page_slug,$after_auth) && $current_control == $allowed_control){
                redirect('home');   
            }else{
                $this->verify_user_mode($check);
                return TRUE; 
            }
            
        } 
    }
    
    /**
     * User logout
     * Modified in ver 2.0
     */
    function logout($is_redirect=TRUE){

        $redirectPage = '';
        // instead of destroying whole session data, we will just unset biz user session data
        if($_COOKIE['livewire_remember_me_token']){
            $selector = $_COOKIE['livewire_remember_me_token'];
            $arra = explode(':',$selector);
            $where = array('selector'=>$arra[0]);
            $CI = & get_instance(); 
            $CI->load->model('common_model');
            $remove = $CI->common_model->deleteData('auth_token',$where);
            setcookie("livewire_remember_me_token", "", time() - 3600, '/');
        }
        
        // instead of destroying whole session data, we will just unset biz user session data
        unset($_SESSION[$this->user_session_key]); 
        if($is_redirect)
            redirect('/');  //redirect only when $is_redirect is set to TRUE
    }
    
    /**
     * User authentication for ajax
     * Modified in ver 2.0
     */
    public function check_ajax_auth($page_slug = ""){
        
        //verify if request is xhr(ajax)
        if (!$this->input->is_ajax_request()) {
            exit('No direct script access allowed');
        }
        
        $failed_res = json_encode(array('status'=> -1,'msg'=>'Your session expired. Please login again.','url'=>site_url()));
        if(!is_user_logged_in()){
            echo $failed_res; exit;
        }

        //user session exists
        $user_data = get_user_session_data();
        $where = array('userId'=>$user_data['userId'],'status'=>1); //status:1 means active 
        $check = $this->common_model->is_data_exists($this->tbl_users,$where);

        if($check===FALSE){
           //user is either deleted or is inactivated
           $this->logout(FALSE); //force logout- $is_redirect is FALSE here because we will redirect user from JS
           echo $failed_res; exit;
        }

        return TRUE; //all good
    }

    private function load_access_denied_page($data=array()) {

        $data['title'] = 'Access denied';
        $otp_html = $this->load->view('frontend_includes/front_header', $data, true);
        $otp_html .= $this->load->view('not_access',$data, true);
        $otp_html .= $this->load->view('frontend_includes/front_footer', $data, true); 
        echo  $otp_html; exit;
    }

    //Redirect to user to appropriate page based on its user mode(hirer or worker)
    private function verify_user_mode($current_user) {

        $this->check_user_profile($current_user);

        //Add pages here which are restricted for Worker
        $worker_restricted_pages = array('creat_project','job_detail','job_card', 'add_card', 'update_pay_by_project', 'applied_applicants', 'update_pay_by_hour');
        $common_allowed_pages = array('email_not_verified', 'add_credit_card', 'profile', 'update_profile', 'add_skill', 'about_me', 'add_intro_video', 'add_bank_info', 'members', 'account_settings','messages','public_profile','review');

        $page_slug = $this->router->fetch_method();
        $current_control = $this->router->fetch_class(); // get current controller, class = controller

        $user_mode = $current_user->user_current_type_web;

        if($user_mode == 'worker' && in_array($page_slug,$worker_restricted_pages) && !in_array($page_slug, $common_allowed_pages)) {
            $this->load_access_denied_page();
        } elseif($user_mode == 'hirer' && !in_array($page_slug,$worker_restricted_pages) && !in_array($page_slug, $common_allowed_pages)) {
            $this->load_access_denied_page();
        } else {
            return true;
        }
    }

    // User switch mode
    public function check_change_mode($page,$data){

        $page_slug = $this->router->fetch_method();
        $current_control = $this->router->fetch_class(); // get current controller, class = controller
        //user session exists
        $user_sess_data = $_SESSION[$this->user_session_key]; //user session array
        $userMode = $user_sess_data['userMode']; //user ID

        if($userMode == 'hirer'){
            $not_allowed_pages = array('project','hourly_work','project_job_detail','hourly_job_detail','worker_job_card');
            if(in_array($page_slug,$not_allowed_pages)){
                $data['title'] = 'Access denied';
                $this->load->front_render('not_access',$data);
            }else{
        
                $this->load->front_render($page,$data);
            } 
        }else{
            $not_allowed_pages = array('creat_project','job_detail','job_card');
            if(in_array($page_slug,$not_allowed_pages)){
                $data['title'] = 'Access denied';
                $this->load->front_render('not_access',$data);
            }else{
               $this->load->front_render($page,$data);
            }
        }

    }//End

    //Check User Profile Completed or not and redirect to signup steps if not
    private function check_user_profile($user_data){

        // Check login user profile is completed or not
        if($user_data->profile_completed == 1){
            return TRUE;
        }

        //Profile not completed, Find on which step user needs to to redirected
        $common_steps = array('email_not_verified');
        $worker_steps = array('add_skill', 'about_me', 'add_intro_video', 'add_bank_info');
        $hirer_steps = array('add_credit_card');

        switch($user_data->user_type){

            case 'worker':
                $user_steps = array_merge($common_steps, $worker_steps);
            break;

            case 'hirer':
                $user_steps = array_merge($common_steps, $hirer_steps);
            break;

            case 'both':
                $user_steps = array_merge($common_steps, $worker_steps, $hirer_steps);
            break;
        }

        $step_no = $user_data->profile_step ;
        $page_slug = $this->router->fetch_method();
        
        if($page_slug == $user_steps[$step_no]){ 
            return TRUE;
        }
        
        redirect('user/'.$user_steps[$step_no].' ');
    }
}