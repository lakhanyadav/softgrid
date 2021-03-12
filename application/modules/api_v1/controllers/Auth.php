<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends Common_Service_Controller {

    public function __construct() {

        parent::__construct();
        $this->load->model('auth_model'); 
    }

    // check unique email
    function chek_emails($email){

        $data = array('email'=>$email);
        $chek = $this->common_model->is_data_exists(USERS,$data);
        if($chek){
            $response = array('status' =>FAIL, 'message' => get_response_message(110));
            $this->response($response);
        }else{
            return true;
        }
    } // End

    //User Registration
    function signup_post(){

        $this->form_validation->set_rules('name', 'Name', 'trim|required|alpha_numeric_spaces');

        $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');
        $this->chek_emails($this->post('email'));

        $this->form_validation->set_rules('password', 'Password', 'required');

        $this->form_validation->set_rules('confirmPassword', 'Confirm Password', 'required|matches[password]');

        if($this->form_validation->run() == FALSE){

        	$response = array('status' => FAIL, 'message' => strip_tags(validation_errors()));

            $this->response($response);

        }else{
        	
        	$authtoken = $this->auth_model->_generate_token();
        	
            $userData = array();
          
            if(!empty($_FILES['profileImage']['name'])){
                $hieght = 768 ;
                $width = 1024 ;
                $folder = 'profile';
                $profileImage = $this->Image_model->upload_image('profileImage',$folder,$hieght,$width,FALSE);

                //check for upload error
                if(is_array($profileImage) && array_key_exists("error",$profileImage)){
                    $response = array('status' => FAIL, 'message' => strip_tags($profileImage['error']));
                    $this->response($response);
                }

            }elseif (filter_var($this->post('profileImage'), FILTER_VALIDATE_URL)) {

                $profileImage = $this->post('profileImage');  //for social profile image url

            }// End 

            $userData['full_name'] = $this->post('name');

            $userData['email'] = $this->post('email');

            $userData['password']  = !empty($this->post('password')) ? password_hash($this->post('password') , PASSWORD_DEFAULT) : '' ;

            $userData['profile_photo'] = !empty($profileImage) ? $profileImage : '' ;

            $userData['device_type'] = !empty($this->post('deviceType')) ? $this->post('deviceType') : "";
            //See the user which device use for signup
            $userData['signup_from'] = !empty($this->post('deviceType')) ? $this->post('deviceType') : "";
            //End
            $userData['device_token']  = !empty($this->post('deviceToken')) ? $this->post('deviceToken') : ""; 
            $userData['social_id'] = !empty($this->post('socialId')) ? $this->post('socialId') : '' ;

            $userData['social_type'] = !empty($this->post('socialType')) ? $this->post('socialType') : '';

            // Check when user login with social then we update is_profile_url 1
            if(!empty($userData['social_id'])){
                $userData['is_profile_url'] = 1 ;
            }//End

            $userData['auth_token'] = $authtoken;

            $userData['crd'] = datetime();
            $userData['upd'] = datetime();
            $userData['date'] = date('Y-m-d');;

            $result = $this->auth_model->userRegistration($userData);

            if(is_array($result)){
                switch ($result['regType']) {
                    case "NR":
                        $response = array('status'=>SUCCESS,'message'=> get_response_message(105),'data'=>array('user_info'=>$result['returnData']));
                        break;
                    case "AE":
                        $response = array('status'=>FAIL,'message'=>get_response_message(110));
                        break;
                    case 'IU':
                        $response = array('status' => FAIL, 'message' => get_response_message(127));
                        break;
                    case "SL":
                        $response = array('status'=>SUCCESS,'message'=>get_response_message(121),'data'=>array('user_info'=>$result['returnData']));
                        break;
                    case "SR":
                        $response = array('status'=>SUCCESS,'message'=>get_response_message(105),'data'=>array('user_info'=>$result['returnData']));
                        break;
                    case 'NA':
                        $response = array('status'=>FAIL,'message'=>get_response_message(111));
                        break;
                    case "SIU":
                        $response = array('status'=>FAIL,'message'=>'This account is registered with different user role');
                    break;  
                }
            }else{
                $response = array('status'=>FAIL,'message'=>get_response_message(107));
            }
            $this->response($response);
        }
    }//End User Registration

    // User Login here
    function signin_post(){

        $this->form_validation->set_rules('email','Email','required|valid_email');

        $this->form_validation->set_rules('password','Password','required');

        $userLogin = array();
        if($this->form_validation->run() == FALSE){

            $response = array('status' => FAIL, 'message' => strip_tags(validation_errors()));

            $this->response($response);
        }else{

            $authtoken = $this->auth_model->_generate_token();

            $userLogin['email'] = $this->post('email');

            $userLogin['password'] = $this->post('password');

            $userLogin['device_token'] = $this->post('deviceToken');

            $userLogin['device_type'] = $this->post('deviceType');

            $userLogin['auth_token'] = $authtoken;

            $userLogin['upd'] = datetime();

            $result = $this->auth_model->userLogin($userLogin,$authtoken);

             if(is_array($result)){
                switch ($result['regType']) {

                    case "SL":
                        $response = array('status' => SUCCESS, 'message' =>  get_response_message(121), 'data' => array('user_info'=>$result['userInfo'],'currency_data'=>currency_response()));
                        break;
                    case "WP":
                        $response = array('status' => FAIL, 'message' => get_response_message(530));
                        break;
                    case "WE":
                        $response = array('status' => FAIL, 'message' => get_response_message(530));
                        break;
                    case "WS":
                        $response = array('status' => FAIL, 'message' => get_response_message(111));
                        break;
                    case "WU":
                        $response = array('status' => FAIL, 'message' => get_response_message(521));
                        break;
                    case "SIU":
                        $response = array('status'=>FAIL,'message'=>'This account is registered with different user role');
                        break;              
                    default:
                        $response = array('status' => SUCCESS, 'message' => get_response_message(121), 'data' => array('user_info'=>$result['userInfo'],'currency_data'=>currency_response()));
                }
            }else{

                $response = array('status' => FAIL, 'message' => get_response_message(104));
            }
            $this->response($response);
        }
    }//End User login here


} // End of class
/* End of file user.php */
/* Location: ./application/service-modules/service/controllers/user.php */