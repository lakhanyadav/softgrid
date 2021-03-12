//skill
$(document).ready(function(){
    $(".add-skill-btn").click(function(){
        $(".frm-skill-prt").toggle();
    });
});

$(document).ready(function(){
    $('#myCarousel').carousel({
      interval:6000
    });
    $("#myCarousel").on("touchstart", function(event){
 
        var yClick = event.originalEvent.touches[0].pageY;
        $(this).one("touchmove", function(event){

        var yMove = event.originalEvent.touches[0].pageY;
        if( Math.floor(yClick - yMove) > 1 ){
            $(".carousel").carousel('next');
        }
        else if( Math.floor(yClick - yMove) < -1 ){
            $(".carousel").carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
});    
});
//animated  carousel start
$(document).ready(function(){
$(function(){
        $.fn.extend({
            animateCss: function (animationName) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.addClass('animated ' + animationName).one(animationEnd, function() {
                    $(this).removeClass(animationName);
                });
            }
        });
             $('.item1.active img').animateCss('fadeIn');
             $('.item1.active h2').animateCss('fadeIn');
             $('.item1.active p').animateCss('fadeIn');             
});    
//to start animation on  mousescroll , click and swipe
     $("#myCarousel").on('slide.bs.carousel', function () {
        $.fn.extend({
            animateCss: function (animationName) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.addClass('animated ' + animationName).one(animationEnd, function() {
                    $(this).removeClass(animationName);
                });
            }
        });    
// add animation type  from animate.css on the element which you want to animate
        $('.item1 img').animateCss('fadeIn');
        $('.item1 h2').animateCss('fadeIn');
        $('.item1 p').animateCss('fadeIn');
        
        $('.item2 img').animateCss('fadeIn');
        $('.item2 h2').animateCss('fadeIn');
        $('.item2 p').animateCss('fadeIn');
        
        $('.item3 img').animateCss('fadeIn');
        $('.item3 h2').animateCss('fadeIn');
        $('.item3 p').animateCss('fadeIn');
    });
});
//   Bubbles ------------------
    $('<div class="bubbles"></div>').appendTo(".bubble-bg");
    var bArray = [];
    var sArray = [5, 10, 15, 20];
    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    setInterval(function () {
        var size = randomValue(sArray);
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
        $('.individual-bubble').fadeOut(5000, function () {
            $(this).remove()
        });
    }, 350);

/*Datepicker*/
 $(function () {
    $('#datetimepicker1,#datetimepicker2,#datetimepicker3,#datetimepicker4').datetimepicker();
});

 $(function () {
    $('#datetimepicker5').datetimepicker({
        format: 'L'
    });
});
/*Week select*/
$('.tag .ui.dropdown').dropdown({
    allowAdditions: true
});
//slider
   $('#mainslider').nivoSlider({
        effect: 'random',
        slices: 15,
        boxCols: 12,
        boxRows: 4,
        animSpeed: 800,
        pauseTime: 5000,
        startSlide: 0,
        controlNav: false,
        controlNavThumbs: false,
        pauseOnHover: false,
        manualAdvance: false,
        prevText: '<i class="fa fa-long-arrow-left"></i>',
        nextText: '<i class="fa fa-long-arrow-right"></i>'
});
//how it work
$('.features-slider').owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout:10000,
    autoplayHoverPause:true,
    dots: false,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        400: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});

$( ".mobile-nav-pills > li" ).mouseover(function() {
//console.log('hover');
$('.features-slider').trigger('stop.owl.autoplay');
});
$( ".mobile-nav-pills > li" ).mouseout(function() {
//console.log('out');
$('.features-slider').trigger('play.owl.autoplay');
});

var _0x9e38x7 = $('.features-slider'),
    _0x9e38x8 = $('.mobile-nav-pills li');
_0x9e38x7['on']('changed.owl.carousel', function(_0x9e38x5) {
    var _0x9e38x9 = (_0x9e38x5['item']['index'] + 1) - _0x9e38x5['relatedTarget']['_clones']['length'] / 2;
    var _0x9e38xa = _0x9e38x5['item']['count'];
    if (_0x9e38x9 > _0x9e38xa || _0x9e38x9 == 0) {
        _0x9e38x9 = _0x9e38xa - (_0x9e38x9 % _0x9e38xa)
    };
    (_0x9e38x9 > _0x9e38xa || 0 == _0x9e38x9) && (_0x9e38x9 = _0x9e38xa - _0x9e38x9 % _0x9e38xa), _0x9e38x9--;
    var _0x9e38xb = $('.mobile-nav-pills li:nth(' + _0x9e38x9 + ')');
    _0x9e38xc(_0x9e38xb)
}), _0x9e38x8['on']('click', function() {
    var _0x9e38x3 = $(this)['data']('owl-item');
    _0x9e38x7['trigger']('to.owl.carousel', _0x9e38x3), _0x9e38xc($(this))
});

function _0x9e38xc(_0x9e38x3) {
    _0x9e38x8['removeClass']('active-icon');
    _0x9e38x3['addClass']('active-icon')
}
var _0x9e38x7 = $('.features-slider'),
    _0x9e38xd = $('.mobile-tab-pane');
_0x9e38x7['on']('changed.owl.carousel', function(_0x9e38x5) {
    var _0x9e38xe = (_0x9e38x5['item']['index'] + 1) - _0x9e38x5['relatedTarget']['_clones']['length'] / 2;
    var _0x9e38xf = _0x9e38x5['item']['count'];
    if (_0x9e38xe > _0x9e38xf || _0x9e38xe == 0) {
        _0x9e38xe = _0x9e38xf - (_0x9e38xe % _0x9e38xf)
    };
    (_0x9e38xe > _0x9e38xf || 0 == _0x9e38xe) && (_0x9e38xe = _0x9e38xf - _0x9e38xe % _0x9e38xf), _0x9e38xe--;
    var _0x9e38x10 = $('.mobile-tab-pane:nth(' + _0x9e38xe + ')');
    _0x9e38x12(_0x9e38x10)
}), $('.mobile-nav-pills li')['on']('click', function() {
    return false;
    var _0x9e38x11 = $(this)['data']('owl-item');
    _0x9e38x7['trigger']('to.owl.carousel', _0x9e38x11), _0x9e38x12($('.mobile-tab-pane'))
});

function _0x9e38x12(_0x9e38x11) {
    _0x9e38xd['removeClass']('active');
    _0x9e38x11['addClass']('active')
}

function testAnim(x) {
  $('.modal .modal-dialog').attr('class', 'modal-dialog  cascading-modal ' + x + '  animated');
};
$('.prfl-popup').on('show.bs.modal', function (e) {
    testAnim("zoomIn");
})
$('.prfl-popup').on('hide.bs.modal', function (e) {
    testAnim("zoomOut");
})


$("#btn-close").click(function(){
    $("#upload-img").hide();
});

$("#btn-close").click(function(){
    $("#upload-blnk").show();
}); 

