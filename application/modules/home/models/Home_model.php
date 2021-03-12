<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home_model extends CI_Model {
	
	function getUserOrPatnerData($date){

		$this->db->select('user.userId,user.full_name,count(patnar.patner_id) as patners ');
		$this->db->from('user');
		$this->db->join('patnar','patnar.my_id = user.userId','left');
		if(!empty($date)){
			$this->db->where('user.date',$date);
		}
		
		$this->db->group_by('user.userId');
		$query = $this->db->get();
		if($query->num_rows() > 0){
			$rows = $query->result();
			foreach($rows as $key=>$val){
				$rows[$key]->total_request = $this->getUserRequestCount($val->userId);
			}
			return $rows;
		}
		return false;
	}

	function getUserRequestCount($userId){
		
		$this->db->select('count(id) as requestcount');
		$this->db->from('request_user');
		$this->db->where('request_for',$userId);
		$this->db->group_by('request_for');
		$query = $this->db->get();
		return $query->row();
	}
    
}																																																																																		