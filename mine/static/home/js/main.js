jQuery(function ($) {

    'use strict';
	
	/*==============================================================*/
    // Table of index
    /*==============================================================*/

    /*==============================================================
    # Mobile Toggle Control
    # Menu add class
    # Menu Scrolling
	# Slider images Source
    # Parallax Scrolling
    # Magnific Popup
    ==============================================================*/

	/*==============================================================*/
	//Mobile Toggle Control
	/*==============================================================*/
	$(function(){ 
		var navMain = $("#main-menu");
		navMain.on("click", "a", null, function () {
			navMain.collapse('hide');
		});
	});
	
	/*==============================================================*/
    // Slider images Source
    /*==============================================================*/
	(function () {
		$('#apps-imagebg #slider-section, #blue #slider-bg-wrapper #slider-section, #dark #slider-bg-wrapper #slider-section').vegas({
			slides: [
				{ src: 'images/slider/1.jpg' },
				{ src: 'images/slider/2.jpg' },
				{ src: 'images/slider/3.jpg' },
			]
		});
	}());
	
	
	/*==============================================================*/
    // owlCarousel
    /*==============================================================*/
	$("#features-slider").owlCarousel({ 
		autoPlay: 3000, //Set AutoPlay to 3 seconds	 
		items : 3,		
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3],
		itemsTablet	:	[767,2],
		itemsMobile	:	[479,1],
		pagination	: false,
		navigation:true,
		loop:true,
		navigationText: [
		  "<i class='fa fa-angle-left '></i>",
		  "<i class='fa fa-angle-right'></i>"
		],
		
		
		afterAction: function(el){
		   //remove class active
		   this
		   .$owlItems
		   .removeClass('active')
		  
		   //add class active
		   this
		   .$owlItems //owl internal $ object containing items
		   .eq(this.currentItem + 1)
		   .addClass('active')
		  
		}
	});
	
	$("#screenshot-slider").owlCarousel({ 
		autoPlay: 4000, //Set AutoPlay to 4 seconds	 
		items : 4,
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet : [768,3],
		itemsMobile	: [479,1],
		pagination	: true,
	});
  
	$("#review-slider").owlCarousel({ 
		autoPlay: 3000, //Set AutoPlay to 4 seconds	 
		items : 2,
		itemsDesktop : [1199,2],
		itemsDesktopSmall : [979,2],
		itemsTablet : [768,2],
		itemsMobile	: [479,1],
		pagination	: false,
		navigation:true,
		navigationText: [
		  "<i class='fa fa-angle-left '></i>",
		  "<i class='fa fa-angle-right'></i>"
		],
	});
  
	
	/*==============================================================*/
    // Menu add class
    /*==============================================================*/
	(function () {	
		function menuToggle(){
			var windowWidth = $(window).width();
			if(windowWidth > 767 ){
				$(window).on('scroll', function(){
					if( $(window).scrollTop()>700 ){
						$('.navbar').addClass('main-nav');
					} else {
						$('.navbar').removeClass('main-nav');
					};
					if( $(window).scrollTop()>61 ){
						$('.menu-hide-page #navigation').removeClass('menu-hide');						
					} else {
						$('.menu-hide-page #navigation').addClass('menu-hide');
					}
				});
			}else{
				$('.menu-hide-page #navigation').removeClass('menu-hide');	
				$('.navbar').addClass('main-nav');
			};	
		}

		menuToggle();
	}());
	
	
	/*==============================================================*/
    // Menu Scrolling
    /*==============================================================*/
	$('#navigation .navbar-nav').onePageNav({
			currentClass: 'active',
			filter: ':not(.exclude)',
		});
	/*==============================================================*/
    // Parallax Scrolling
    /*==============================================================*/
	
	(function () {
		function parallaxInit() {				
			$("#ticket").parallax("50%", 0.3);
			$("#choose-color").parallax("50%", 0.3);
			$("#blue #choose-color").parallax("50%", 0.3);
		}	
		parallaxInit();
	}());
	
	
	/*==============================================================*/
    // Tabs Slide
    /*==============================================================*/
	(function () {
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {    
			var target = $(this).attr('href');  			  
			$(target).css('top','-'+$(window).width()+'px');   
			var top = $(target).offset().top;
			$(target).css({top:top}).animate({"top":"0px"}, "-20");
		})
	}());
	
	
	/*==============================================================*/
    // Magnific Popup
    /*==============================================================*/
	
	(function () {
		$('#photo-gallery .image-link').magnificPopup({
			gallery: {
			  enabled: true
			},
			type: 'image' 
		});
		$('.video-link').magnificPopup({type:'iframe'});
	}());
	
	
	
});

