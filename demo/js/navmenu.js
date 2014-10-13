//
//	         ----  README!!! D:  ---
//
//  I'm thinkin about make a plugin outta this too,
//  so if you are going to use this pleease let me know.
//  Okay ... hum, That's it. Thank you. Cyaaa.

$(function(){
	var prevScroll = 0, currScroll = 0, scrollAmnt = 0, transY = 0;
	var header = $('header');
	var headerOuterH = header.outerHeight();

	header.css('position', 'fixed');
	header.css('top', '0px');
	header.css('left', '0px');

	$(document).scroll(function(){
		prevScroll = currScroll;
		currScroll = $(window).scrollTop();

		//console.log('prev - ' + prevScroll);
		//console.log('curr - ' + currScroll);
		
		if(currScroll > prevScroll){
			scrollAmnt = currScroll - prevScroll;
			scrollAmnt = (scrollAmnt > headerOuterH ? headerOuterH : scrollAmnt);

			if((transY - scrollAmnt) < (-headerOuterH)){
				transY = (-headerOuterH);
			}else if ((transY - scrollAmnt) >= (-headerOuterH)){
				transY = transY - scrollAmnt;
			}

			goinDown = true;
			goinUp = false;
			header.css('-webkit-transform', 'translateY(' + (transY) + 'px)');
		}

		if(currScroll < prevScroll){
			scrollAmnt = prevScroll - currScroll;
			scrollAmnt = (scrollAmnt > headerOuterH ? headerOuterH : scrollAmnt);

			if((transY + scrollAmnt) > 0){
				transY = 0;
			} else if ((transY + scrollAmnt) <= 0){
				transY = transY + scrollAmnt;
			}
			
			goinDown = false;
			goinUp = true;
			header.css('-webkit-transform', 'translateY(' + transY + 'px)');
		}
	});
});