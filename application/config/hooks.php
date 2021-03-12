<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/

/* 
 * Hook for website maintenance mode
 * Using 'post_controller_constructor' because we don't need to show maintenance message in API modules
 * So we get CI super global variable access at this point and we can easily use router->fetch_class(),
 * load->view() etc if needed 
 */
$hook['post_controller_constructor'][] = array(
    'class'    => 'maintenance_hook',
    'function' => 'go_offline',
    'filename' => 'maintenance_hook.php',
    'filepath' => 'hooks'
);

/* 
 * pre_system hook to load environment variables from .env
 * See here for more details: https://github.com/vlucas/phpdotenv
 * All of the defined variables in .env will be accessible with the getenv() 
 * method, and are available in the $_ENV and $_SERVER super-globals also.
//  */
// $hook['pre_system'][] = function() {

//     //Load .env
//     $dotenv = Dotenv\Dotenv::createImmutable(FCPATH, '.env');
//     $dotenv->load();

//     //Firebase Real time database project API credentials
//     define('APIKEY', getenv('APIKEY'));
//     define('AUTHDOMAIN', getenv('AUTHDOMAIN'));
//     define('DATABASEURL', getenv('DATABASEURL'));
//     define('PROJECTID', getenv('PROJECTID'));
//     define('STORAGEBUCKET', getenv('STORAGEBUCKET'));
//     define('MESSAGINGSENDERID', getenv('MESSAGINGSENDERID'));
//     define('APPID', getenv('APPID'));
//     define('MEASUREMENTID', getenv('MEASUREMENTID'));
// };