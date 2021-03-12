<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends Common_Service_Controller {

	
    public function __construct() {
        parent::__construct();
        
		$this->load->model('user_model');
        $this->load->model('service_model');
    }

    //This function make for give request for user
    function makeRequest_post(){
        $this->check_service_auth(); //request authentication


        $this->form_validation->set_rules('user_id', 'Request id', 'required');

        if($this->form_validation->run() == FALSE){

            $response = array('status' => FAIL, 'message' => strip_tags(validation_errors()));

            $this->response($response);die;
        }


        $userId =  $this->authData->userId;
        $request_id = $this->post('user_id');


        //Hehere we are check sender id and reciver id not equel
        if($userId == $request_id){
            $response = array('status' => FAIL, 'message' => 'You can not do this action, Request and sendor id is same' );
            $this->response($response);die;
        }//End

        //Here we are check user request status
        $check_request = $this->common_model->is_data_exists('request_user',array('request_by'=>$userId,'request_for'=>$request_id));
        if(!empty($check_request)){
             $response = array('status' => FAIL, 'message' => 'You are already make request this user' );
            $this->response($response);die;
        }//End here

        //Here we are check user request status
        $check_status = $this->common_model->is_data_exists('user',array('userId'=>$request_id));
        if(empty($check_status)){
             $response = array('status' => FAIL, 'message' => 'This user not exists into application' );
            $this->response($response);die;
        }//End here

        $requestData['request_by'] = $userId ;
        $requestData['request_for'] = $request_id ;
        $requestData['crd'] = datetime();
        $requestData['upd'] = datetime();

        //pr($requestData);

        $response = $this->common_model->insertData('request_user', $requestData);

        if($response){
            $response = array('status'=>SUCCESS,'message'=> 'Send Request');
        }else{
            $response = array('status'=>SUCCESS,'message'=> 'Some thing went wrong');
        }

        $this->response($response);die;

    }//End Here

    //This function  is used for add patner
    function addPatner_post(){

        $this->check_service_auth(); //request authentication


        $this->form_validation->set_rules('patner_id', 'Patner id', 'required');

        if($this->form_validation->run() == FALSE){

            $response = array('status' => FAIL, 'message' => strip_tags(validation_errors()));

            $this->response($response);die;
        }


        $userId =  $this->authData->userId;
        $patner_id = $this->post('patner_id');

        
        if($userId == $patner_id){
            $response = array('status' => FAIL, 'message' => 'You can not do this action' );
            $this->response($response);die;
        }

         //Here we are check user request status
        $check_status = $this->common_model->is_data_exists('user',array('userId'=>$patner_id));
        if(empty($check_status)){
            $response = array('status' => FAIL, 'message' => 'This user not exists into application' );
            $this->response($response);die;
        }//End here


        $check_request = $this->common_model->is_data_exists('patnar',array('my_id'=>$userId,'patner_id'=>$patner_id));
        if(!empty($check_request)){
             $response = array('status' => FAIL, 'message' => 'You are already make request this user' );
            $this->response($response);die;
        }


        $check_request = $this->common_model->is_data_exists('patnar',array('my_id'=>$patner_id,'patner_id'=>$userId));
        if(!empty($check_request)){
             $response = array('status' => FAIL, 'message' => 'Yor are a patner' );
            $this->response($response);die;
        }

        $requestData['my_id'] = $userId ;
        $requestData['patner_id'] = $patner_id;
        $requestData['crd'] = datetime();
        $requestData['upd'] = datetime();


        $response = $this->common_model->insertData('patnar', $requestData);

        if($response){
            $response = array('status'=>SUCCESS,'message'=> 'Patner Added');
        }else{
            $response = array('status'=>SUCCESS,'message'=> 'Some thing went wrong');
        }

        $this->response($response);die;

    }//End

   

    //Get Login user details
    function getUserDetails_get() {

        $this->check_service_auth(); //request authentication

        $userId =  $this->authData->userId;
        $userInfo = $this->user_model->myProfile(array('userId'=>$userId),$userId);

        $response = array('status'=>SUCCESS,'message'=>'user details','data'=> array('user_info'=>$userInfo));
        $this->response($response);
    }//End here



} // End of class
/* End of file User.php */
/* Location: ./application/modules/api_v1/controllers/User.php */