
<div class="clearfix"></div>
<div class="mtgn-blnk-top"></div>
<!--job list-page-->
<section class="list-top-clr list-top-clr2  headr-top-pad">
	<div class="list-top">
		<div class="list-top-text-prt">
			<div class="container">
                <form>
				<div class="list-filtr-prt" align="center">
					<input type="date" name="date" id="date" placeholder="Search date here "> 
                    <!-- <button type="button" class="search_date">Seach by date</button> -->
				</div>
				<div class="main-search-input-wrap">

					<div class="main-search-input fl-wrap no_apply_btn_flter">
                       
                        

					</div>
				</div>
			</div>
            </form>
		</div>
		<div class="bubble-bg">
			<div class="bubbles"></div>	 
		</div>		
	</div>

</section>
<div class="clearfix"></div>
<section class="body-prt sec-pad-40">
	<div class="container" >
		<div class="row" id="healp_offer_loadmore">
			<div class="" id="healp_offer_list">
            	<div  style="text-align: center;" ><img src="<?php echo base_url().LV_ASSETS_IMG;?>New.gif" ></div> 
        	</div>
		</div>
	</div>

</section>
<script type="text/javascript">

    // Get the fillter color product
    $('body').on('change', "#date", function (event) {

        var date = $("#date").val();
         
        product_list();

    });// End


	
    product_list();

    function product_list(is_load_more=0){ 

        var base_url = '<?php echo base_url(); ?>';
        var date = $("#date").val();
        $.ajax({
            url: base_url+"home/showList",
            type: "POST",
            data:{date:date},
            dataType: "JSON",
            beforeSend: function() {
            }, 
            success: function(data){
                $("#healp_offer_list").html(data.html_receive);
	
            },
        }); 
    }
</script>