<!DOCTYPE html>
<html lan="En">
<head>
    <link rel="icon" href="<?php echo base_url().ADMIN_THEME.'images/logo/favicon.png';?>"  type="image/png" sizes="16x16">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title style="color:black;">
        Live Wire- Admin | <?php echo $title ?>
    </title>
    <?php $backend_assets = base_url().ASSETS."/";?>
    <?php  $frontend_asset = base_url(); ?>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.6 -->
    <!-- ================================================================== -->
    <link rel="stylesheet" href="<?php echo $backend_assets;?>bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <!-- ================================================================= -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
    <!-- ================================================================= -->
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <!-- ================================================================= -->
    <!-- Theme style -->
    <link rel="stylesheet" href="<?php echo $backend_assets;?>dist/css/AdminLTE.min.css">
    <!-- ================================================================== -->
    <!-- Material Design -->
    <link rel="stylesheet" href="<?php echo $backend_assets;?>dist/css/bootstrap-material-design.min.css">
    <!-- ================================================================== -->
    <link rel="stylesheet" href="<?php echo $backend_assets;?>dist/css/ripples.min.css">
    <!-- ================================================================== -->
    <link rel="stylesheet" href="<?php echo $backend_assets;?>dist/css/MaterialAdminLTE.min.css">

    <!-- ================================================================== -->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- ================================================================== -->
    <link rel="stylesheet" href="<?php echo $backend_assets;?>dist/css/skins/all-md-skins.min.css">
    <!-- ================================================================== -->
    <link rel="stylesheet" href="<?php echo $backend_assets;?>dist/css/custom.css">
    <!-- ================================================================== -->
    <link rel="stylesheet" href="<?php echo $backend_assets;?>plugins/datatables/dataTables.bootstrap.css">
    <!-- ================================================================== -->

    <script src="<?php echo $backend_assets;?>plugins/jQuery/jquery-2.2.3.min.js"></script>
    <!-- ================================================================== -->
    <!-- Bootstrap 3.3.6 -->
    <script src="<?php echo $backend_assets;?>bootstrap/js/bootstrap.min.js"></script>

    <link href="<?php echo $backend_assets;?>dist/css/style.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $backend_assets;?>dist/css/style2.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $backend_assets;?>dist/css/mystyle.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $backend_assets;?>dist/css/front_common.css" rel="stylesheet" type="text/css"> 
    <!-- ================================================================== -->
    <!-- Material Design -->
    <script src="<?php echo $backend_assets;?>dist/js/material.min.js"></script>
    <!-- ================================================================== -->
    <script src="<?php echo $backend_assets;?>dist/js/ripples.min.js"></script>
    <!-- =================================================================== -->
    <script>
        $.material.init();
    </script>
    <script src="<?php echo $backend_assets;?>plugins/datatables/jquery.dataTables.min.js"></script>
    <!-- =================================================================== -->
    <script src="<?php echo $backend_assets;?>plugins/datatables/dataTables.bootstrap.min.js"></script>
    <!-- =================================================================== -->

    <!-- =================================================================== -->
    <!-- FastClick -->
    <script src="<?php echo $backend_assets;?>plugins/fastclick/fastclick.js"></script>
    <!-- =================================================================== -->
    <!-- AdminLTE App -->
    <link rel="stylesheet" href="<?php echo base_url().ADMIN_THEME; ?>plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

    <link href="<?php echo base_url().ADMIN_THEME; ?>plugins/tostar/toastr.min.css" rel="stylesheet"> <!-- toastr popup -->
    <link href="<?php echo base_url().ADMIN_THEME; ?>custom_js/css/admin_custom.css" rel="stylesheet">
    <!-- =================================================================== -->
    <script src="<?php echo $backend_assets;?>custom_js/js/jquery.validate.min.js"></script>
    <!-- =================================================================== -->
</head>

<?php
 $page_slug = $this->router->fetch_method();
 $controller = $this->router->fetch_class(); // get current controller, class = controller
?>
<body class="light-red-fixed sidebar-mini skin-green-light" id="tl_admin_main_body" data-base-url="<?php echo base_url(); ?>">
  
    <!-- Site wrapper -->
    <div class="wrapper">

    <header class="main-header">
        <!-- Logo -->
        <a href="<?php echo base_url();?>admin/dashboard" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini" title="LiveWire" ><img src="<?php echo base_url().ADMIN_THEME; ?>images/logo/icon_20.png"></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg" title="LiveWire"><img src="<?php echo base_url().ADMIN_THEME; ?>images/logo/logo.png" width="100" height="50" ></span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                <?php
                  $user_data = get_admin_session_data();
                ?>

                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="<?php echo base_url(ADMIN_PROFILE_THUMB).$user_data['image'];?>" alt="User profile picture" class="user-image" alt="User Image" > 
                            <span title="<?php echo $_SESSION[ADMIN_USER_SESS_KEY]['name'];?>" class="hidden-xs"><?php echo $_SESSION[ADMIN_USER_SESS_KEY]['name'];

                            ?></span>

                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header">
                                <img src="<?php echo base_url(ADMIN_PROFILE_THUMB).$user_data['image'];?>" class="img-circle" alt="User Image"> 
                                <p>
                                    <?php echo $_SESSION[ADMIN_USER_SESS_KEY]['name'];?> 
                                    <small><?php echo $_SESSION[ADMIN_USER_SESS_KEY]['emailId'];?></small>
                                </p>
                            </li>
                            <!-- Menu Body -->
                            <li class="user-body">
                                <div class="row">
                                  <div class="col-xs-12 text-center text-success" >
                                    <!-- <b><a style="cursor: pointer;" onclick="model()" >Change Password</a></b> -->
                                  </div>
                                </div>
                                <!-- /.row -->
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="<?php echo base_url();?>admin/profileView" class="btn btn-default btn-flat">Profile</a>
                                </div>
                                <div class="pull-right">
                                    <a href="<?php echo base_url(); ?>admin/logout" class="btn btn-default btn-flat">Sign out</a>
                                </div>
                          </li>
                        </ul>
                    </li>
                    <!-- Control Sidebar Toggle Button -->
                </ul>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                      <!-- Messages: style can be found in dropdown.less-->
                        <li class="dropdown tasks-menu">
                           
                        </li>   
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <aside class="main-sidebar">
        <section class="sidebar">
            <ul class="sidebar-menu">
                <li class="treeview <?php if($title == "Dashboard"){echo "active";}?>">
                    <a href="<?php echo base_url();?>admin/dashboard" title="Dashboard">
                        <i class="fa fa-dashboard" title="Dashboard"></i> 
                        <span title="Dashboard">Dashboard</span><span class="pull-right-container"></span>
                    </a>
                </li>

                <li class="treeview <?php if($title=='addParentCategory'||$title=='Category'){ echo 'active';}?>">
                    <a href="" title="Categories">
                        <i class="fa fa-list-alt" title="Categories"></i> 
                        <span title="Categories">Categories</span>
                        <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                    </a>

                    <ul class="treeview-menu ">

                        <li class="<?php if($title=='addParentCategory'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/Category/addParentCategory"><i class="fa fa-list-alt"></i>Category</a>
                        </li>
                        <li class="<?php if($title=='Category'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/Category"><i class="fa fa-tasks"></i>Sub-Category</a>
                        </li>
                    </ul>

                </li> 


                <li class="treeview <?php if($title=='UserList'||$title=='Worker'||$title=='Client'){ echo 'active';}?>">
                    <a href="" title="Users"><i class="fa fa-users"></i> <span>Users</span>
                        <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                    </a>
                    <ul class="treeview-menu ">
                        <li class="<?php if($title=='UserList'){ echo 'active';}?>"><a href="<?php echo base_url(); ?>admin/users/userList"><i class="fa fa-users"></i> All Users</a></li>
                        <!-- <li class="<?php if($title=='Worker'){ echo 'active';}?>"><a href="<?php echo base_url(); ?>admin/users/userListWorker"><i class="fa fa-briefcase"></i> Worker</a></li>
                        <li class="<?php if($title=='Client'){ echo 'active';}?>"><a href="<?php echo base_url(); ?>admin/users/userListClient"><i class="fa fa-user"></i>Client</a></li> -->
                    </ul>
                </li>


                <li class="treeview <?php if($title=='WorkList'||$title=='ShortTermWork'||$title=='LongTermWork'){ echo 'active';}?>">
                    <a href="" title="Jobs"><i class="fa fa-tasks"></i> <span>Jobs</span>
                        <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                    </a>
                    <ul class="treeview-menu ">
                        <li class="<?php if($title=='WorkList'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/Jobpost/jobList"><i class="fa fa-tasks"></i> All Jobs</a>
                        </li>
                        <li class="<?php if($title=='ShortTermWork'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/Jobpost/jobListProject"><i class="fa fa-tasks"></i>Pay By Project</a>
                        </li>
                        <li class="<?php if($title=='LongTermWork'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/Jobpost/jobListHourly"><i class="fa fa-tasks"></i>Pay By Hour</a>
                        </li>
                    </ul>
                </li>

                <li class="<?php if($title=='Payment'){ echo 'active';}?>">
                    <a href="<?php echo base_url(); ?>admin/Payment/paymentList" title="Payment">
                        <i class="fa fa-credit-card" title="Payment"></i>
                        <span title="Payment">Payment</span><span class="pull-right-container"></span>
                    </a>
                </li>

                <li class="<?php if($title=='Payout'){ echo 'active';}?>">
                    <a href="<?php echo base_url(); ?>admin/Payout/payoutList" title="Payout">
                        <i class="fa fa-credit-card" title="Payout"></i>
                        <span title="Payment">Payout</span><span class="pull-right-container"></span>
                    </a>
                </li>

                <li class="treeview <?php if($title=='About'||$title=='Privacy'||$title=='Term' || $title=='disclaimer' ){ echo 'active';}?>">
                    <a href="" title="Jobs"><i class="fa fa-book"></i> <span>Content</span>
                        <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                    </a>
                    <ul class="treeview-menu ">
                        <li class="<?php if($title=='About'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/aboutUs"><i class="fa fa-tasks"></i>About us</a>
                        </li>
                        <li class="<?php if($title=='Privacy'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/policy"><i class="fa fa-tasks"></i>Privacy policy</a>
                        </li>
                        <li class="<?php if($title=='Term'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/termAndCondition"><i class="fa fa-tasks"></i>Term & Condition</a>
                        </li>
                        <li class="<?php if($title=='disclaimer'){ echo 'active';}?>">
                            <a href="<?php echo base_url(); ?>admin/disclaimer"><i class="fa fa-tasks"></i>Disclaimer</a>
                        </li>
                    </ul>
                </li>

                <li class="treeview <?php echo ($controller == "dispute" && $page_slug == "list")? 'active' : ''; ?>">
                    <a href="<?php echo base_url();?>admin/dispute/list" title="Disputes">
                        <i class="fa fa-gavel" aria-hidden="true"></i> 
                        <span title="Disputes">Disputes- Work not done</span><span class="pull-right-container"></span>
                    </a>
                </li>

                <li class="treeview <?php if($title=='AddBlog'||$title=='BlogList'||$title=='EditBlog'){ echo 'active';}?> ">
                     <a href="<?php echo base_url();?>admin/blog/blogList" title="Blogs"><i class="fa fa-book"></i> <span>Blogs</span>
                        <span class="pull-right-container"></span>
                    </a>
                    <!-- <ul class="treeview-menu ">
                        <li class="<?php if($title=='AddBlog'){ echo 'active';}?>">
                            <a href="<?php echo base_url();?>admin/blog"><i class="fa fa-tasks"></i>Add blog</a>
                        </li>
                        <li class="<?php if($title=='BlogList'){ echo 'active';}?>">
                            <a href="<?php echo base_url();?>admin/blog/blogList""><i class="fa fa-tasks"></i>Blog list</a>
                        </li>
                    </ul> -->
                </li>

            </ul>
        </section>
    </aside>