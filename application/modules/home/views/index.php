<?php      
    $frontend_asset= base_url();
?>
<section class="slider-container">
    <div class="slider">
        <!-- Slider Image -->
        <div id="mainslider" class="nivoSlider slider-image">

            <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>slider/test_2.png" alt="main slider" title="#with_dog" />

            <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>slider/test6.jpg" alt="main slider" title="#make_up" />

            <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>slider/test5.jpg" alt="main slider" title="#hand" />

            <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>slider/test7.jpg" alt="main slider" title="#cup_kake" />

            <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>slider/test8.jpg" alt="main slider" title="#carpenter" />
        </div>

        <!-- Slider Caption with_dog -->
        <div id="with_dog" class="nivo-html-caption slider-caption-1">
            <div class="slider-progress"></div>
            <div class="slide1-text slide-1">
                <div class="middle-text">
                    <div class="cap-dec wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0s">
                        <h3 class="slider-hed-prt">TOO BUSY TO ENJOY LIFE?</h3>
                    </div>
                    <div class="cap-title text-center slider-para" >
                        <h3 class="wow fadeInRight" data-wow-duration="1.0s" data-wow-delay="1.2s"><b>GET HELP AT HOME!</b></h3>
                    </div>
                    <div class="cap-contact mt-40-res">               
                        <?php if(is_user_logged_in() !== TRUE){ ?>
                            <p class="wow fadeIn sgn_as"><b>SIGN UP AS</b></p>
                            <div class="text-center"> 
                                <a href="<?php echo base_url(); ?>auth/signup?userType=<?php echo "hirer"; ?>" class="wow fadeIn snd-btn-reqst bck-fild banr_btn"><span><img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>/hirer-image.png" /></span>Hirer</a>
                            </div>
                        <?php } ?>  
                    </div>
                </div>
            </div>
        </div>

        <!-- Slider Caption make_up -->
        <div id="make_up" class="nivo-html-caption slider-caption-2">
            <div class="slider-progress"></div>
            <div class="slide1-text slide-2">
                <div class="middle-text">
                    <div class="cap-dec wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0s">
                        <h3 class="slider-hed-prt">NO LONGER WORKING FULL TIME?</h3>
                    </div>
                    <div class="cap-title text-center slider-para" data-wow-duration="1.2s" data-wow-delay="0.2s">
                        <h3 class="wow fadeInRight" data-wow-duration="1.0s" data-wow-delay="1.2s"><b>YOUR SKILLS ARE NEEDED!</b></h3>
                    </div>
                    <div class="cap-contact mt-40-res">
                        <?php if(is_user_logged_in() !== TRUE){ ?>
                            <div class="text-center">
                                <p class="wow fadeIn sgn_as"><b>SIGN UP AS</b></p>
                                <a href="" class="wow fadeIn snd-btn-reqst bck-fild banr_btn back_blck" data-toggle="modal" data-target="#sgn_up_wrker"><span><img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>/icn-img-whte-hire.png" /></span>Worker</a>
                            </div>   
                        <?php } ?>                          
                    </div>
                </div>
            </div>
        </div>

        <!-- Slider Caption make_up -->
        <div id="hand" class="nivo-html-caption slider-caption-2">
            <div class="slider-progress"></div>
            <div class="slide1-text slide-2">
                <div class="middle-text">
                    <div class="cap-dec wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0s">
                        <h3 class="slider-hed-prt">TOO BUSY TO ENJOY LIFE?</h3>
                    </div>
                    <div class="cap-title text-center slider-para" data-wow-duration="1.2s" data-wow-delay="0.2s">
                        <h3 class="wow fadeInRight" data-wow-duration="1.0s" data-wow-delay="1.2s"><b>GET HELP AT HOME!</b></h3>
                    </div>
                    <div class="cap-contact mt-40-res">
                    
                        <?php if(is_user_logged_in() !== TRUE){ ?>
                            <p class="wow fadeIn sgn_as"><b>SIGN UP AS</b></p>
                            <div class="text-center"> 
                                <a href="<?php echo base_url(); ?>auth/signup?userType=<?php echo "hirer"; ?>" class="wow fadeIn snd-btn-reqst bck-fild banr_btn"><span><img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>/hirer-image.png" /></span>Hirer</a>
                            </div>
                        <?php } ?>  
                    </div>
                </div>
            </div>
        </div>

        <!-- Slider Caption make_up -->
        <div id="cup_kake" class="nivo-html-caption slider-caption-2">
            <div class="slider-progress"></div>
            <div class="slide1-text slide-2">
                <div class="middle-text">
                    <div class="cap-dec wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0s">
                        <h3 class="slider-hed-prt">NO LONGER WORKING FULL TIME?</h3>
                    </div>
                    <div class="cap-title text-center slider-para" data-wow-duration="1.2s" data-wow-delay="0.2s">
                        <h3 class="wow fadeInRight" data-wow-duration="1.0s" data-wow-delay="1.2s"><b>YOUR SKILLS ARE NEEDED!</b></h3>
                    </div>
                    <div class="cap-contact mt-40 mt-40-res">
                        <?php if(is_user_logged_in() !== TRUE){ ?>
                            <div class="text-center">
                                <p class="wow fadeIn sgn_as"><b>SIGN UP AS</b></p>
                                <a href="" class="wow fadeIn snd-btn-reqst bck-fild banr_btn back_blck" data-toggle="modal" data-target="#sgn_up_wrker"><span><img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>/icn-img-whte-hire.png" /></span>Worker</a>
                            </div>   
                        <?php } ?>                          
                    </div>
                </div>
            </div>
        </div>

        <!-- Slider Caption make_up -->
        <div id="carpenter" class="nivo-html-caption slider-caption-2">
            <div class="slider-progress"></div>
            <div class="slide1-text slide-2">
                <div class="middle-text">
                    <div class="cap-dec wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0s">
                        <h3 class="slider-hed-prt">NO LONGER WORKING FULL TIME?</h3>
                    </div>
                    <div class="cap-title text-center slider-para" data-wow-duration="1.2s" data-wow-delay="0.2s">
                        <h3 class="wow fadeInRight" data-wow-duration="1.0s" data-wow-delay="1.2s"><b>YOUR SKILLS ARE NEEDED!</b></h3>
                    </div>
                    <div class="cap-contact mt-40 mt-40-res">
                        <?php if(is_user_logged_in() !== TRUE){ ?>
                            <div class="text-center">
                                <p class="wow fadeIn sgn_as"><b>SIGN UP AS</b></p>
                                <a href="" class="wow fadeIn snd-btn-reqst bck-fild banr_btn back_blck" data-toggle="modal" data-target="#sgn_up_wrker"><span><img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>/icn-img-whte-hire.png" /></span>Worker</a>
                            </div>   
                        <?php } ?>                    
                    </div>
                </div>
            </div>
        </div>


    </div>

</section>
<!--features-->
<section class="feture sec-pad">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div class="section-title text-center main-hed main-hed-mrgn">
					<!-- <h4>core features</h4> -->
					<div class="featuresHead">
                        <h2 class="main-hed main-hed-mrgn mt-10 fnt-wgt-700 mb-20 main-hed-index">Live Wire is a modern tool to rekindle the ‘good old days’ where community support through the ages and stages of life results in a happier life for all!</h2>
                    </div>
				</div>
				<div class="row">
					<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<div class="single-feature text-center">
							<img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>feature1.png" />
							<div class="feature-text">
								<h4 class="text-tnsfrm-upr mb-20 fnt-wgt-600 mt-20">Available Work</h4>
								<p class="para">Live Wire specializes in help at home - eg. babysitting, tutoring, school lifts, house sitting, diy, baking, pet walking, admin assistance and more!</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<div class="single-feature text-center">
							<img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>feature3.png" />
							<div class="feature-text">
								<h4 class="text-tnsfrm-upr mb-20 fnt-wgt-600 mt-20">Project</h4>
								<p class="para">Find help in ONCE off situations where a helping hand is needed. View worker profile videos and chat to them before you hire. A budget is set for these projects.</p>
							</div>
						</div>
					</div>
                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="single-feature text-center">
                            <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>feature2.png" />
                            <div class="feature-text">
                                <h4 class="text-tnsfrm-upr mb-20 fnt-wgt-600 mt-20">Hourly Work</h4>
                                <p class="para">Find long term help, paid by the hour to ease the stress of daily living. Worker profile video and chat will help you find the perfect match for your family.</p>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</section>
<!--insight section-->
<section class="insight-sec sec-pad">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="section-title text-center main-hed mb-0">
                    <h2 class="main-hed main-hed-mrgn fnt_sze_30 mt-10 fnt-wgt-700 quote_box main-hed-index">Find somebody near you with the time and skills you need right now!</h2>
                </div>
                <div class="videoSec">
                    <video controls poster="<?php echo $frontend_asset.LV_ASSETS_IMG;?>livewire.png">
                      <source src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>LiveWireHomeVideol.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
        </div>
    </div>
</section>
<!--how it works-->
<section class="hw-it-wrks sec-pad">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div class="section-title text-center main-hed ">
					<h4>Easy to use</h4>
					<h2 class="main-hed mt-10 fnt-wgt-700">How it works</h2>
				</div>
			</div>
		</div>
		<!-- Start About Content -->
        <div class="row">
            <div class="mobile-features">
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 wow fadeInLeft" data-wow-duration="1s">
                    <div class="features-slider owl-carousel owl-theme">
                        <div class="item">
                            <div class="single-feat-img">
                                <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>how_it_work/how-it-wrk1.png" alt="appnova" class="img-responsive">
                            </div>
                        </div>
                        <div class="item">
                            <div class="single-feat-img">
                                <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>how_it_work/IMG_0614.PNG" alt="appnova" class="img-responsive">
                            </div>
                        </div>
                        <div class="item">
                            <div class="single-feat-img">
                                <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>how_it_work/IMG_0615.PNG" alt="appnova" class="img-responsive">
                            </div>
                        </div>
                        <div class="item">
                            <div class="single-feat-img">
                                <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>how_it_work/how-it-wrk4.png" alt="appnova" class="img-responsive">
                            </div>
                        </div>
                        <div class="item">
                            <div class="single-feat-img">
                                <img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>how_it_work/how-it-wrk5.png" alt="appnova" class="img-responsive">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 wow fadeInRight" data-wow-duration="1s">
                    <ul class="nav nav-pills mobile-nav-pills nav-stacked">
                        <li class="active-icon" data-owl-item="0"><a href="#tab_a" data-toggle="pill"><i class="fa fa-user"></i></a></li>
                        <li data-owl-item="1"><a href="#tab_b" data-toggle="pill"><i class="fa fa-briefcase"></i></a></li>
                        <li data-owl-item="2"><a href="#tab_c" data-toggle="pill"><i class="fa fa-handshake-o"></i></a></li>
                        <li data-owl-item="3"><a href="#tab_d" data-toggle="pill"><i class="fa fa-check-square-o"></i></a></li>
                        <li data-owl-item="4"><a href="#tab_e" data-toggle="pill"><i class="fa fa-registered"></i></a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane mobile-tab-pane active" id="tab_a" data-owl-item="0">
                            <h4>SIGN UP</h4>
                            <p class="para">Easily create a profile by following the simple prompts.</p>
                            <p class="para mt-10">* Free To Join - all workers 40+ years</p>
                        </div>
                        <div class="tab-pane mobile-tab-pane" id="tab_b" data-owl-item="1">
                            <h4>ASK FOR HELP / OFFER HELP</h4>
                            <p class="para">Select to hire or work and follow the prompts to provide details. You can be both a worker and a hirer - it is easy to switch over on the app!</p>
                        </div>
                        <div class="tab-pane mobile-tab-pane" id="tab_c" data-owl-item="2">
                            <h4>HIRER AND WORKER MATCH</h4>
                            <p class="para">The Live Wire App will identify hirer and worker matches and notify you!</p>
                        </div>
                        <div class="tab-pane mobile-tab-pane" id="tab_d" data-owl-item="3">
                            <h4>OFFER ACCEPTANCE / AGREEMENT</h4>
                            <p class="para">Hirers can view worker profiles and chat to candidates before accepting applications / hiring candidates.</p>
                        </div>
                        <div class="tab-pane mobile-tab-pane" id="tab_e" data-owl-item="4">
                            <h4>PAY SAFELY</h4>
                            <p class="para">Payment for work is held by Live Wire and paid on completion of a project or batch of hourly work. A % service fee is retained by Live Wire .</p>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</section>
<div class="clearfix"></div>
<!--download app-->
<section class="dwnload-app-sec sec-pad" id="download-app">
	<div class="container">
		<div class="row">
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div class="dwnld-app-sec-txt">
					<h2 class="main-hed main-hed2">Download Free <br/> <span>Mobile App</span></h2>
					<p class="para mt-20">This app is a networking and recruitment tool. People who lack the time or skills for the demands of daily life can meet and recruit people over 40 years of age and no longer working full time who offer their skills on an hourly or project basis.</p>
					<div class="download-app-btn">
						<div class="btn-wrap">
                        	<a href="https://apps.apple.com/us/app/live-wire-skills-for-hire/id1439288966?ls=1" target="_blank" class="btn default_color download-btn">
                            	<i class="fa fa-mobile"></i>
                            	<em> Available on </em>
                            	App store
                        	</a>
                        	<a href="https://play.google.com/store/apps/details?id=com.Livewire"  target="_blank" class="btn default_color download-btn">
                            	<i class="fa fa-android"></i>
                            	<em> Available on </em>
                            	Google Play
                        	</a>                                 
                    	</div>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div class="app-dwnload-img mrgn-top">
					<img src="<?php echo $frontend_asset.LV_ASSETS_IMG;?>how_it_work/app-download-mobile2.png" />
				</div>
			</div>
		</div>
	</div>
</section>

<!--sgn_up_wrker-->
<div class="modal fade" id="sgn_up_wrker" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog wrker_age_pop" role="document">
        <div class="modal-content mdl-subs">
            <div class="modal-header mdl-hdr">
                <h5 class="modal-title prmte" id="exampleModalLabel">Sign up as Worker</h5>
                <button type="button" class="close mdl-clse" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="">
                <div class="modal-body pop_sngle_prjct mdl-body"> 
                    <div class="regfrm">
                        <p class="para text-center mb-15">Are you over 40?</p> 
                    </div>
                </div>
                <div class="modal-footer mdl-ftr">
                    <div class="form-group text-right pay-btn">
                        <a href="<?php echo base_url(); ?>auth/signup?userType=<?php echo "worker"; ?>" class="lve-wre-btn clr-grn pop-btn mt-10 ">Yes</a>
                        <a href="javascript:void(0)" data-dismiss="modal" class="cls-txt age_message">No</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>