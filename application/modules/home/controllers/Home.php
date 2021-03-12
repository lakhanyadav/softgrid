<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends Common_Front_Controller {
    public $data = "";
    function __construct() {
        parent::__construct();
        $this->load->model('Home_model');

    }
    

    function index(){
    	
    	$this->load->front_render('project');
    }


    function showList(){
    	$date = $this->input->post('date');
    	$data['list'] = $this->Home_model->getUserOrPatnerData($date);
    	$html_receive = $this->load->view('product_list',$data,true);
    	$response = array('status'=>1,'html_receive'=>$html_receive);
    	echo json_encode($response);die; 
    }
    
}//END OF CLASS