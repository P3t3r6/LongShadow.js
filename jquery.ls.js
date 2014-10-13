(function ( $ ){
	$.fn.ls = function( options ) {
		var defaults = {
			type 		: 	'text',
			lightSource	: 	'top left',
			color 		: 	'parent',
			opacity		: 	'15',
			overflow 	: 	'parent',
			size 		: 	'parent'
		};

		var settings = $.extend({}, defaults, options);
	
			//console.log(this);

			if(settings.overflow == 'this'){
				this.css('overflow', 'auto');
			} else if(settings.overflow == 'parent'){
				this.parent().css('overflow', 'auto');
			}
			
			var lightSrc = settings.lightSource.split(' ');
			if(
					((lightSrc[0] == 'top') || 
					(lightSrc[0] == 'middle') || 
					(lightSrc[0] == 'bottom')) && 
					((lightSrc[1] == 'left') || 
					(lightSrc[1] == 'center') || 
					(lightSrc[1] == 'right'))
				){
				y = lightSrc[0];
				x = lightSrc[1];
			} else if(
					((lightSrc[1] == 'top') || 
					(lightSrc[1] == 'middle') || 
					(lightSrc[1] == 'bottom')) && 
					((lightSrc[0] == 'left') || 
					(lightSrc[0] == 'center') || 
					(lightSrc[0] == 'right'))
				){
				y = lightSrc[1];
				x = lightSrc[0];
			} else {
				console.group('LongShadow.js is confused  :/');
				console.warn('ls.js - Bad lightSource coordinates!');
				console.warn('ls.js - Please use \'top\', \'middle\' or \'bottom\' for the Y coordinates, and \'left\', \'center\' or \'right\' for the X value.');
				console.warn('ls.js - Did you confuse the \'middle\' (Y) with the \'center\' (X) or vice-versa?');
				console.warn('ls.js - Typo maybe? - \'' + settings.lightSource + '\'');
				console.warn('ls.js - For more help, use $(' + this + ').ls(help);');
				console.groupEnd();
			}

			switch(y){
				case 'top':
					this.y = 1;
					yIter = 'increment';
				break;
				
				case 'middle':
					this.y = 0;
					yIter = 'static';
				break;
				
				case 'bottom':
					this.y = -1;
					yIter = 'decrement';
				break;
			}
			
			switch(x){
				case 'left':
					this.x = 1;
					xIter = 'increment';
				break;
				
				case 'center':
					this.x = 0;
					xIter = 'static';
				break;
				
				case 'right':
					this.x = -1;
					xIter = 'decrement';
				break;
			}

			if(settings.color == 'this'){
				var o = settings.opacity;
				prop = this.css('background-color');
				prop = prop.slice((parseInt(prop.indexOf('('))+1), prop.indexOf(')'));
				p = prop.split(', ');
				r = parseInt(p[0]); g = parseInt(p[1]); b = parseInt(p[2]);
				r = (r-o > 0 ? r-o : r);
				g = (g-o > 0 ? g-o : g);
				b = (b-o > 0 ? b-o : b);
				settings.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
			}

			if(settings.color == 'parent'){
				var o = settings.opacity;
				prop = this.parent().css('background-color');
				prop = prop.slice((parseInt(prop.indexOf('('))+1), prop.indexOf(')'));
				p = prop.split(', ');
				r = parseInt(p[0]); g = parseInt(p[1]); b = parseInt(p[2]);
				r = (r-o > 0 ? r-o : r);
				g = (g-o > 0 ? g-o : g);
				b = (b-o > 0 ? b-o : b);
				settings.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
			}

			shadowStr = this.x + 'px ' + this.y + 'px 0px ' + settings.color;
			
			if(settings.size == 'this'){
				settings.size = defaultSize(this, 'this');
			} else if(settings.size == 'parent'){
				settings.size = defaultSize(this, 'parent');
			} else {
				settings.size = settings.size;
			}

			for(var len = 1; len < settings.size; len++){
				this.x = doTheMath(xIter, this.x);
				shadowStr += ', ' + this.x + 'px ' + this.y + 'px 0px ' + settings.color;
				this.y = doTheMath(yIter, this.y);
				shadowStr += ', ' + this.x + 'px ' + this.y + 'px 0px ' + settings.color;
			}
			
			this.css(settings.type + '-shadow', shadowStr);
		//});
//---------------------------------- FUNCTIONS ------------------------------------------

		function defaultSize(ths, target){
			var lightSrc = settings.lightSource.split(' ');

			if((lightSrc[0] == 'top') || (lightSrc[0] == 'bottom') || (lightSrc[1] == 'top') || (lightSrc[1] == 'bottom')){
				if(target == 'parent'){
					return ths.parent().outerHeight() - ths.position().top;
				} else {
					return (settings.type == 'text' ? ths.outerHeight() : ths.parent().outerHeight()) - ths.position().top;
				}
			} else if ((lightSrc[0] == 'middle') || (lightSrc[1] == 'middle')){
				if(target == 'parent'){
					return ths.parent().outerWidth();
				} else {
					return (settings.type == 'text' ? ths.outerWidth() : ths.parent().outerWidth());
				}
			}
		}
	};
}( jQuery ));


function longShadow(target, type, x, y, color, size, overflowed){

}

function clearShadow(target, type){
	$(target).css(type + '-shadow', '');
}

function doTheMath(iter, i){
	if(iter == 'increment'){
		i++;
		return i;
	}
	if(iter == 'static'){
		return i;
	}
	if(iter == 'decrement'){
		i--;
		return i;
	}
}