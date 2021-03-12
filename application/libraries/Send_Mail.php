<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/* 
 * Send Mail Library: Handles sending all types of mails for application
 *
 */
class Send_Mail{

    public function __construct() {
        // Assign the CodeIgniter super-object
        $this->CI =& get_instance();
        $this->CI->load->library('smtp_email');
    }

    //Sends mail to admin on dispute request creation
    public function dispute_request($mail_data) {

        if (empty($mail_data)) {
            return;
        }

        extract($mail_data);

        $subject = 'Dispute request #'.$dispute_id;
        $body = 'Reason: '.$dispute_reason.'<br>';
        $body .= 'Description: '.$dispute_description.'<br>';
        $body .= sprintf('<a href="%s">%s</a>', base_url().'admin/dispute/list', 'View Details');
        $is_send = $this->CI->smtp_email->send_mail(ADMIN_NOTIFY_EMAIL, $subject, $body);
        return $is_send;
    }
}