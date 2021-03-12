<?php

/**
 * When using form validation with MX you will need to extend the 
 * CI_Form_validation
 *
 * @author Mindiii
 */
class MY_Form_validation extends CI_Form_validation {

    public $CI;  //required for callabck validation to work with hmvc modules
    
}
