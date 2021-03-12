<footer class="main-footer">
    <div class="pull-right hidden-xs">
 
    </div>
    <strong>Copyright &copy; <?php echo date('Y'); ?> <a href="http://dev.mindiii.com/livewire/admin">Live wire</a></strong> All rights
    reserved.
  </footer>

  <div class="control-sidebar-bg"></div>
</div>
<div id="getCategoryPopUp"></div>
</body>
<?php $backend_assets = base_url().ASSETS."/"?>
<!-- jQuery 2.2.3 -->
<!-- <script src="<?php echo base_url().ADMIN_THEME; ?>plugins/jQueryUI/jquery-ui.min.js"></script> -->
<script src="<?php echo $backend_assets;?>dist/js/app.min.js"></script>

<!-- ================================================================================ -->
<!-- AdminLTE for demo purposes -->
<script src="<?php echo $backend_assets;?>dist/js/demo.js"></script>
<!-- ================================================================================ -->

<!-- ================================================================================ -->
 <script src="<?php echo $backend_assets;?>plugins/bootbox/bootbox.min.js"></script>
 <!-- ================================================================================ -->
<script src="<?php echo $backend_assets;?>js/toastr/toastr.min.js"></script>
<script src="<?php echo $backend_assets;?>toaster/jquery.toaster.js"></script>
<div id="tl_admin_loader" class="tl_loader" style="display: none;"></div> <!-- Loader -->
<script type="text/javascript">
var base_url = '<?php echo base_url(); ?>'
</script>
<script src="<?php echo $backend_assets;?>custom_js/custom_ajax.js"></script>
<script src="<?php echo $backend_assets;?>custom_js/js/admin_common.js"></script> 
<!-- ================================================================================ -->
 

</html>