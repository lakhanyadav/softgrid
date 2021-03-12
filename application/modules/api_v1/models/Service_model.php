<?php
/**
* Web service model
* Handles web service request
* version: 2.0 ( 14-08-2018 )
*/
class Service_model extends CI_Model {
	
    /**
     * Generate auth token for API users
     * Modified in version 2.0
    */
    function generate_token(){
        $res = do_hash(time().mt_rand());
        $new_key = substr($res,0,config_item('rest_key_length'));
        return $new_key;
    }
    
    /**
    * Update users deviceid and auth token while login
    */
    function checkDeviceToken(){
        $sql = $this->db->select('id')->where('deviceToken', $deviceToken)->get('users');
        if($sql->num_rows()){
                $id = array();
                foreach($sql->result() as $result){
                    $id[] = $result->id;
                }
                $this->db->where_in('id', $id);
                $this->db->update('users',array('deviceToken'=>''));

                if($this->db->affected_rows() > 0){
                    return true;
                }else{
                    return false;
                }
        }
        return true;
    }
	
	/*
	Function for check provided token is resultid or not
	*/
	function isValidToken($authToken)
	{
		$this->db->select('*');
		$this->db->where('authToken',$authToken);
		if($sql = $this->db->get('users'))
		{
			if($sql->num_rows() > 0)
			{
				return $sql->row();
			}
		}
		return false;
	}

	function registration($data)
	{	
		if(!empty($data['socialId']) && !empty($data['socialType']))
		{  // social registration or social login
			$query = $this->db->select('*')->where(array('socialId'=>$data['socialId'],'socialType'=>$data['socialType']))->get('users');
			if($query->num_rows()==1)
			{ 
				$result = $query->row();
				$status_check = $result->status ;
				if ( $status_check == 1){
                    //user is active
                    
                    //check user type
                    $user_type = $result->userType;
                    if($user_type != $data['userType']){
                        return array('regType'=>'IU'); // Invalid user
                    }
                    
                    $id = $result->id;
                    //updating users deviceId and authToken
                    $updateToken = $this->updateDeviceIdToken($id,$data['deviceToken'],$data['authToken'],$data['deviceType']);
                    return array('regType'=>'SL','returnData'=>$this->userInfo(array('id' => $id)));
                    //login successfully
				}else{
                    return array('regType'=>'NA'); //Inactive
				}
			}
			else
			{	
				$this->db->insert('users',$data);
				return array('regType'=>'SR','returnData'=>$this->userInfo(array('id' => $this->db->insert_id())));//social registration	
			}
		}
		else
		{
			$res = $this->db->select('email')->where(array('email'=>$data['email']))->get('users');
			
			if($res->num_rows() == 0){
                $this->db->insert('users',$data);
                $last_id = $this->db->insert_id();
                return array('regType'=>'NR','returnData'=>$this->userInfo(array('id' => $last_id)));
                // Normal registration
			}else{	
                return array('regType'=>'AE'); //already exist
			}
			return FALSE;
		}
		
	} //End Function users Register

	function updateDeviceIdToken($id,$deviceToken,$authToken,$deviceType='')
	{
		$req = $this->db->select('id')->where('id',$id)->get('users');
		if($req->num_rows())
		{
			$this->db->update('users',array('deviceToken'=>''),array('id !='=>$id,'deviceToken'=>$deviceToken));
			$this->db->update('users',array('deviceToken'=>$deviceToken,'authToken'=>$authToken,'deviceType'=>$deviceType),array('id'=>$id));
			return TRUE;
		}
		return FALSE;
	}//End Function Update Device Token 
        
        //get user info
	function userInfo($where){
           
            $req = $this->db->select('u.id,u.userName,u.fullName,u.email,u.userType,u.countryCode,u.contactNumber,u.address,u.authToken,u.status,u.createdOn,u.image, COALESCE(um.description, "") as description, COALESCE(um.currency_code, "") as currency_code, COALESCE(um.currency_symbol, "") as currency_symbol,  COALESCE(um.price, "") as price')->join(USER_META. ' as um', "u.id = um.user_id","left")->where($where)->get(USERS.' as u');
            $returnData = array();
            if($req->num_rows())
            {
                $result = $req->row();
                
                //for vendor return category
                if($result->userType == 'vendor'){
                    $result->category = $result->category_name = '';
                    //$cat_where = array('user_id'=>$result->id);
                    $cat_result = $this->common_model->get_user_category_details($result->id);
                    if(!empty($cat_result)){
                        $result->category_name = $cat_result->categoryName;
                        $result->category = $cat_result->catId;
                    }
                }
                
                if (!empty($result->image)) {
                    $image = $result->image;
                    //check if image consists url- happens in social login case
                    if (filter_var($result->image, FILTER_VALIDATE_URL)) { 
                        $result->thumbImage = $image;
                    }
                    else{
                        $result->thumbImage = base_url().USER_AVATAR_PATH.$image;
                    }
                }
                else{
                    $result->thumbImage = base_url().USER_DEFAULT_AVATAR; //return default image if image is empty
                }

            } 	

		return $result;	
	} //End Function usersInfo

	function login($data,$authToken){
            $this->load->library('encrypt');
            $res = $this->db->select('*')->where(array('email'=>$data['email']))->get('users');
            if($res->num_rows()){
                $result = $res->row();
                if($result->status == 1)
                {
                    //check user type
                    $user_type = $result->userType;
                    if($user_type != $data['userType']){
                        return array('returnType'=>'IU'); // Invalid user
                    }

                    //verify password- It is good to use php's password hashing functions so we are using password_verify fn here
                    if(password_verify($data['password'], $result->password)){
                        $updateData = $this->updateDeviceIdToken($result->id,$data['deviceToken'],$authToken,$data['deviceType']);
                        if($updateData){
                            return array('returnType'=>'SL','userInfo'=>$this->userInfo(array('id'=>$result->id)));
                        }
                        else{
                            return FALSE;
                        }
                    }
                    else{
                        return array('returnType'=>'WP'); // Wrong Password
                    }
                }
                return array('returnType'=>'WS','userInfo'=>$this->userInfo(array('id'=>$result->id)));
                // InActive
            }
            else {
                return array('returnType'=>'WE'); // Wrong Email
            }
	}//End users Login
        
}//ENd Class
