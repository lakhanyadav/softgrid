<?php
class User_model extends CI_Model {

	function getPassword(){

		$res = $this->db->select('password')->get_where(USERS,array('userId'=>$this->authData->userId));
        return $res->row();
	}
	
	//get user info
	function myProfile($where,$userId){

        $this->db->select('u.*')->where($where)->from(USERS.' as u');
        $req = $this->db->get();

        if($req->num_rows()){

            $result = $req->row();
                        
            if(!empty($result->profile_photo)) {
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
	} 

    

	//user logout 
	function logout($userId){
		
		$update = $this->db->update(USERS,array('device_token' =>''), array('userId'=>$userId));
		if ($update){
			return true;
		}else{
			return false;
		} 
    }

}//End Class
