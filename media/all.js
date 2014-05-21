/*var doubleHover = function(parentSelector) {
  $('a').live('mouseover',
     function() {
       var $this = $(this);
       $this.parents(parentSelector).find('a[href="' + $this.attr('href') + '"]').not($this).addClass('pseudo-hover');
     }
  );
  $('a').live('mouseout',
     function() {
       $('a').removeClass('pseudo-hover');
     }
  );
}*/

jQuery(document).ready(function($){

  /*doubleHover('.doublehover');*/

	$(".main-link").hover(function(){
		$(this).parents(".post-container").find(".image-link img").addClass("hovered");
	}, function(){
		$(this).parents(".post-container").find(".image-link img").removeClass("hovered");
	});
	
	$(".image-link").hover(function(){
		$(this).parents(".post-container").find(".main-link").addClass("hovered");
	}, function(){
		$(this).parents(".post-container").find(".main-link").removeClass("hovered");
	});

	var deviceAgent = navigator.userAgent.toLowerCase();
	var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
	if (agentID) {
 
		$('body').css({'-webkit-text-size-adjust':'none'});
 
	}


  //����������
 /* var $stripe = $("#scroller_stripe");
  var $stars = $("#stars2012");
  var stripeLeft = parseInt($stripe.css("left"));
  var mouserPressed = false;

  $(window).mousedown(function(){
    mouserPressed = true;
  }).mouseup(function(){
    mouserPressed = false;
  });

  setInterval(function(){
    var newStripeLeft = parseInt($stripe.css("left"));
    var diff = newStripeLeft - stripeLeft;
    if(!isNaN(diff) && diff != 0){
      console.log(newStripeLeft);

      if( ! $stars.is(":visible")){
        $stars.fadeIn("fast");
      }
    }
    else{
      if($stars.is(":visible")){
        $stars.fadeOut("fast");
      }
    }

    stripeLeft = newStripeLeft;
  }, 150);*/









	/*var $arm = $(".komandor-arm");
	var $img = $(".komandor-image");
	var imgWidth = 374;
	//var buttonDown = false;
	//var buttonHold = false;
	var mouseOver = false;
	var mouseX;
	var mouseY;
	var oldX;
	var time;
	var yp = 0;*/

	/*$img.mouseover(function(e){
		mouseOver = true;
		$('#pageMain').bind("mousemove.kmdr", komandorMouseMove);
	}).mouseleave(function(){
				*//*if (console && console.log) {
					console.log('mouseleave');
				}*//*
		komandorMouseOut();
	});
	
	function komandorMouseMove(e){
		var offset = $img.offset();


		if (offset.left != 0) {
			mouseX = imgWidth - (e.pageX - offset.left);
			mouseX *= 0.70;
			mouseX -= 92;

			mouseY = e.pageY - offset.top;
			if (mouseY < 20)
				mouseY = 20;
			mouseY = - mouseY + 100;
			mouseY *= 0.40;
			mouseY -= 165;

			if (mouseOver)
				$arm.stop().css({"bottom":mouseY, "right":mouseX});
			else
				$arm.css({"right":mouseX});
		}
	}
	
	function komandorMouseOut(){
		mouseOver = false;
		$arm.animate({"bottom":"-300px"}, "fast", function(){		
			$('#pageMain').unbind("mousemove.kmdr");
			buttonDown = false;
			$arm.removeClass("clicked");	
		});
	}*/
	
	/*$img.parent().click(function(e){	
		/*$arm.addClass("clicked");
		//buttonDown = true;
		setTimeout(function(){	
			$arm.removeClass("clicked");
		}, 500);*/
	//});
	
	//$(document).mouseup(function(e){
		//e.stopPropagation();
		//buttonDown = false;
		//$arm.removeClass("clicked");
	//});
	

	
});