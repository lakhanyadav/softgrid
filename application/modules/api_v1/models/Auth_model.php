<?php
class Auth_model extends CI_Model {
	
	/**
	* Generate token for user
	*/
	function _generate_token(){

		$this->load->helper('security');
		$salt = do_hash(time().mt_rand());
		$new_key = substr($salt, 0, config_item('rest_key_length'));
		return $new_key;
	}
	/**
	* Update user deviceid and auth token while login
	*/

	function checkDeviceToken($deviceToken){

		$req = $this->db->select('userId')->where('device_token',$deviceToken)->get(USERS);
		if($req->num_rows()){

			$ids = array();
			foreach ($req->result() as $val) {
				$ids[] = $val->id;
			}
			$this->db->where_in('userId',$ids);
			$this->db->update(USERS,array('device_token' =>''));

			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}	
		}	
		return true;		
	}//Function for check Device Token 	

	//Update Device Token
	function updateDeviceIdToken($userid,$deviceId,$authToken,$deviceType,$accessToken=''){
		
	    $req = $this->db->select('userId')->where('userId',$userid)->get(USERS);
	    
		if($req->num_rows()){
			
			$this->db->update(USERS,array('device_token'=>''),array('userId !='=>$userid,'device_token'=>$deviceId));

			$this->db->update(USERS,array('device_token'=>$deviceId,'auth_token'=>$authToken,'device_type'=>$deviceType),array('userId'=>$userid));

			return TRUE;
		}
		return FALSE;
	}//End Function Update Device Token


	function isValidToken($authToken)
	{
		$this->db->select('*');
		$this->db->where('auth_token',$authToken);
		if($query = $this->db->get(USERS)){
			
			if($query->num_rows() > 0){
				return $query->row();
			}
		}
		
		return FALSE;
	}//ENd Function

	// User Registraion
	function userRegistration($data){

		$res = $this->db->select('userId')->where(array('email'=>$data['email']))->get(USERS);

		if($res->num_rows() == 0){
			$this->db->insert(USERS,$data);
			$last_id = $this->db->insert_id();
			
			return array('regType'=>'NR','returnData'=>$this->getUserAllInfo(array('userId'=>$last_id)));
		}else {
			return array('regType'=>'AE'); //already exist
		}

	} //End Function User Register


    //Get user info 
    function getUserAllInfo($where){

    	$req = $this->db->select('*')->where($where)->get(USERS);
    	//Get the currency
        
        if($req->num_rows()){
            $result = $req->row();
            $where1 = array('user_id'=>$result->userId);
            

            if (!empty($result->profile_photo)) {
                $profileImage = $result->profile_photo;
                //check if image consists url- happens in social login case
                if (filter_var($result->profile_photo, FILTER_VALIDATE_URL)) { 
                    $result->thumbImage = $profileImage;
                }else{
                    $result->thumbImage = base_url().IMG_PATH.$profileImage;
                }
            }else{
                $result->thumbImage = base_url().DEFAULT_USER; //return default image if image is empty
            }
        } 	

		return $result;
    }//End here 

    

    //User Login here
	function userLogin($data,$authToken) {
		
		$res = $this->db->select('*')->where(array('email'=>$data['email']))->get(USERS);
		
	    if($res->num_rows()){

		    $result = $res->row();

		    if($result->status==1){

		        if(password_verify($data['password'], $result->password)){
			        
			        $updateData = $this->updateDeviceIdToken($result->userId,$data['device_token'],$authToken,$data['device_type']);

			        return array('regType'=>'SL','userInfo'=>$this->getUserAllInfo(array('userId'=>$result->userId)));
				}else{
					return array('regType'=>'WP'); // Wrong Password
				}	
			}else{
					return array('regType'=>'WS','userInfo'=>$this->getUserAllInfo(array('userId'=>$result->userId))); // InActive
				}		
		}else{
			return array('regType'=>'WE'); // Wrong Email
		}
	}//End User Login

	
}//ENd Class
?>