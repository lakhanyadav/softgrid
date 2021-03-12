<?php      
    $frontend_asset= base_url();
 ?>

<div id="footer-wrapper">
    <footer id="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3 centered">
                    <div class="footer-logo">
                        <a href="<?php echo base_url(); ?>">
                        </a>
                    </div>
                    <ul class="contact-info-list">
                    </ul>
                    <ul class="social-links text-center">
                        
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</div>

</div>

<style type="text/css">
    .usr-slct .error{
        display: block;
        text-align: center;
    }

</style>


 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>bootstrap.min.js"></script>
 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>bootstrap-select.min.js"></script>
 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>jquery.nivo.slider.pack.js"></script>
 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>owl.carousel.min.js"></script>
 <!-- <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>owl.carousel.js"></script> -->
 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>moment.min.js"></script>
 <!-- <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>owl.navigation.js"></script> -->
 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>bootstrap-datetimepicker.js"></script>
 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>form-wizard.js"></script>
 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>custom.js"></script>
 <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script> 
 <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
 <script src="<?php echo $frontend_asset.LV_ASSETS_JS;?>wow.js"></script>
 <script src="<?php echo $frontend_asset.LV_CUSTOM;?>chat.js"></script>
 <script>
    new WOW().init(); 
</script>
 <?php 
 if(!empty($front_scripts)) { load_js($front_scripts);} //load required page scripts 
 ?>
 
<div id="tl_front_loader" class="tl_loader" style="display: none;"></div> <!-- Loader -->
<script src="<?php echo $frontend_asset.LV_TOASTR;?>toastr.min.js"></script>
<script src="<?php echo $frontend_asset.LV_CUSTOM;?>front_common.js"></script>
 <script>
    $('.tag .ui.dropdown').dropdown({
        allowAdditions: true
    });
    var user_logged = 0;
</script>

</body>
</html>