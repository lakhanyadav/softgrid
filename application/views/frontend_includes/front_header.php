<!DOCTYPE html>
<html class="no-js">
<head>
    <?php
    
        $home = "";
        $data = $this->uri->segment('2');
        $blogData = $this->uri->segment('1');

        switch ($blogData) {
            case 'blog':
                $blog = 'active';
            break;
        }

        switch($data){
            case 'login':
                $signup = "active";
            break;

            default:
               $home = "active";
            break;
        }  
    ?>
    <?php  $frontend_asset = base_url(); ?>

    <title>Demo  | <?php echo !empty($title) ? $title : '' ; ?></title>
    <meta name="google-site-verification" content="BG46uyyZPz8YLFu8hHUiGtieijDWRpUhpis_-fFo6vo" />
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
      <!--link files-->
    
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800" rel="stylesheet">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>bootstrap.min.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>bootstrap-theme.min.css" 
      rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>bootstrap-datetimepicker.min.css" 
      rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>font-awesome.min.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>owl.carousel.min.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>bootstrap-select.min.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>owl.theme.default.min.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>animate.css" rel="stylesheet" type="text/css">
    <?php if(!empty($front_styles)) { load_css($front_styles); } //load required page styles ?>  
    <!-- <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>semantic.min.css" rel="stylesheet" type="text/css"> -->

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>style.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>style2.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>mystyle.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>nivo-slider.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>form-wizard-blue.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_ASSETS_CSS;?>responsive.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_TOASTR;?>toastr.min.css" rel="stylesheet" type="text/css">

    <link href="<?php echo $frontend_asset.LV_CUSTOM_CSS;?>front_common.css" rel="stylesheet" type="text/css"> 

    <script type="text/javascript">
        var base_url = '<?php echo base_url(); ?>'
        var imgUrl = base_url+'FRONT_THEME';
    </script>
    <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>jquery-3.3.1.min.js"></script>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js">
    </script>
    <!-- <script src="https://js.stripe.com/v3/"></script> -->
    <!-- for gmail login -->
    <script src="https://apis.google.com/js/api:client.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=<?php echo getenv('GOOGLE_API_KEY') ?>&libraries=places" async defer></script>

<style>
.payment-info-txt{
    text-align: center;
    line-height: 25px;
    color: #049a43;
    font-weight: 400;
    font-size: 16px !important;
    text-decoration: underline;
}
</style>
    
</head>
<body >
<div class="wrapper">
<header class="headerSec">
    <nav class="navbar navbar-default mainHeader navbar-fixed-top">
        <div class="innerHeader">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right mainMenu">
                        <li class="<?php echo $home; ?>"><a href="<?php echo base_url('') ?>">User Info</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</header>
<div id="contact_me"></div>