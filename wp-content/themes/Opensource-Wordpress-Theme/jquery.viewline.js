/*

 Awkward Viewline - jQuery Plugin 
 http://www.jquery.com
 http://www.awkward.se/sandbox/awkward-viewline-a-jquery-plugin
 http://demo.awkward.se/viewline
 Version: 0.1 (Beta)

 Copyright (C) 2010 Awkward (http://www.awkward.se)
 Licensed under Attribution-ShareAlike 3.0 Unported
 http://creativecommons.org/licenses/by-sa/3.0/


 Markup example for $("#viewline").viewline();
 
 <div id="viewline">
     <div>
     	<img src="images/01.jpg" alt="01" />
     	<div class="caption"></div>
     </div>
     <div><img src="images/02.jpg" alt="02" /></div>
     <div><img src="images/03.jpg" alt="03" /></div>
 </div>

*/

(function($)
{
	$.fn.viewline = function(options)
	{
		// Default configuration properties
		var defaults =
		{
			arrow_content:		false,
			vertical_align:		false,
			smart_width: 		true,
			viewline_width:		0, /* 0 = window width (default) / Any int value */
			auto_play:			true,
			interval:			4000,
			pauseonover:		true,
			arrow_wrapper:		null, /* null (default) / Any ID (#id) or Class (.class) */
			animation:			'dropdown', /* dropdown (default) / popup / fade */
			animation_in:		400,
			animation_out:		400,
			animation_delay:	400
		};
		
		var options = $.extend(defaults, options);
		var viewline = $(this);
		var viewline_width = (options.viewline_width === 0) ? $(document).width() : options.viewline_width;
		if (options.vertical_align) { viewline.css('margin-top', ($(document).height()/2)-(viewline.height()/2) + 'px'); }
		
		// Add arrows
		var leftArrow = $('<span id="left-arrow"></span>');
		var rightArrow = $('<span id="right-arrow"></span>');
		if (options.arrow_content) { leftArrow.html('&laquo;'); }
		if (options.arrow_content) { rightArrow.html('&raquo;'); }
		jQuery(((options.arrow_wrapper) ? options.arrow_wrapper : viewline)).append(leftArrow, rightArrow);
		leftArrow.css('top', (viewline.height()/2)-(leftArrow.height()/2) + 'px');
		rightArrow.css('top', (viewline.height()/2)-(rightArrow.height()/2) + 'px');
		leftArrow.hide();
		
		// Get content object, put the object and other values in arrays 
		// and remove the object from the DOM.
		var contentArray = [];
		var contentCount = 0;
		var contentWidth = 10000;
		
		viewline.children('div').each(function()
		{
			var content = $(this);
			content.css('float', 'left');
			content.css('position', 'relative');
			contentArray.push(content);
			content.find('.caption').css('display', 'block');
			content.find('.caption').hide();
			//contentWidth += content.width(); BugFix (need a preeloader)
			content.remove();
			contentCount++;
		});
		
		// Create and add a content wrapper
		var contentWrapper = $('<div></div>');
		contentWrapper.css('width', contentWidth + 'px');
		contentWrapper.css('position', 'absolute');
		viewline.append(contentWrapper);
		
		// Put the content in the content wrapper
		for (var i=0, len=contentCount; i<len; ++i)
		{
			var content = contentArray[i];
			var caption = content.find('.caption');
			contentWrapper.append(content);
			
			content.mouseenter(function ()
			{
				if (options.animation == 'fade') { $(this).find('.caption').delay(options.animation_delay).fadeIn(options.animation_in); }
				else if (options.animation == 'popup') { $(this).find('.caption').delay(options.animation_delay).slideUp(options.animation_in); }
				else { $(this).find('.caption').delay(400).slideDown(options.animation_in); }
			});
			
			content.mouseleave(function ()
			{
				if (options.animation == 'fade') { $(this).find('.caption').stop(true, true).fadeOut(options.animation_out); }
				else if (options.animation == 'popup') { $(this).find('.caption').stop(true, true).slideDown(options.animation_out); }
				else { $(this).find('.caption').stop(true, true).slideUp(options.animation_out); }
			});
		}
		
		// Bind click events for the arrows
		var currentContentID = 0;
		var animationDistance = 0;
		var remainingWidth = 0;
		var smartWidthInit = false;
		var oldAnimationDistance = 0;
		var animating = false;
		
		rightArrow.click(function()
		{
			// Pause Autoplay
			if (options.pauseonover) { window.clearInterval(scrollinterval); }
			animateRight();
		});
		
		function animateRight()
		{
			if (currentContentID < contentCount-1 && !animating)
			{
				// BugFix
				updateContentWidth();
				
				// Pause Autoplay
				if (options.pauseonover) { window.clearInterval(scrollinterval); }
				
				// First we check if the content will fill the screen after animation.
				remainingWidth = 0;
				
				// Loop trough the content array to find out 
				// the total width for the content that remains.
				for (var i=currentContentID+1, len=contentCount; i<len; ++i)
				{
					var object = contentArray[i];
					remainingWidth += object.width();
				}
				
				// If the remaining width is wider than the browser window.
				if (remainingWidth > viewline_width || !options.smart_width)
				{
					animationDistance -= contentArray[currentContentID].width();
					oldAnimationDistance = animationDistance;
				}
				// Else
				else
				{
					if (options.smart_width) { animationDistance = -(contentWidth - (remainingWidth + (viewline_width - remainingWidth))); }
					else { animationDistance -= contentArray[currentContentID].width(); }
					rightArrow.fadeOut(300);
					smartWidthInit = true;
				}
				animating = true;
				contentWrapper.animate({left: animationDistance + 'px'}, 500, function() { animating = false; });
				currentContentID++;
				if (currentContentID == contentCount-1) { rightArrow.fadeOut(300); }
				leftArrow.fadeIn(500);
			}
		}
		
		leftArrow.click(function()
		{
			// Pause Autoplay
			if (options.pauseonover) { window.clearInterval(scrollinterval); }
			animateLeft();
		});
		
		function animateLeft()
		{
			// Do animation unless you're on the first content object
			if (currentContentID !== 0 && !animating)
			{
				// BugFix
				updateContentWidth();
				
				// Pause Autoplay
				if (options.pauseonover) { window.clearInterval(scrollinterval); }
				
				if (!smartWidthInit) { animationDistance += contentArray[currentContentID-1].width(); }
				else
				{
					animationDistance = oldAnimationDistance;
					smartWidthInit = false;
				}
				animating = true;
				contentWrapper.animate({left: animationDistance + 'px'}, 500, function() { animating = false; });
				currentContentID--;
			}
			if (currentContentID === 0) { leftArrow.fadeOut(500); }
			rightArrow.fadeIn(500);
		}
		
		// BugFix
		// The correct width is returned when all content is fully loaded.
		function updateContentWidth()
		{
			contentWidth = 0;
			for (var i=0, len=contentCount; i<len; ++i)
			{
				var content = contentArray[i];
				contentWidth += content.width();
			}
		}
		
		// Auto Play
		if (options.auto_play)
		{
			var scrollinterval = window.setInterval(animateRight, options.interval);
			if (options.pauseonover)
			{
				viewline.mouseenter(function() { window.clearInterval(scrollinterval); });
				viewline.mouseleave(function() { scrollinterval = window.setInterval(animateRight, options.interval); });
			}
		}
	};
})(jQuery);