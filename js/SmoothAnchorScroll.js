$(function(){
	$('a[href*=#]:not([href=#])').click(function(){

		if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname){

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

			if(target.length){

				var style = window.getComputedStyle($('header').get(0));
				var matrix = new WebKitCSSMatrix(style.webkitTransform);

				//console.log(matrix);

				$('html, body').animate({scrollTop: target.offset().top}, 250);
				setTimeout(function(){
					if(goinDown){
						console.log('ok then');
					} else if(goinUp){
						$('html, body').animate({scrollTop: target.offset().top - $('header').outerHeight()}, 0);
					}
				},150);
				return false;
			}
		}
	});
});