(function(){

	//duplicate hover state for parent menu when dropdown.
	(jQuery)('#header-wrapper ul.dropdown').hover(function(){
		$(this).parent().find('> a').addClass('expanded-menu');
	},function(){
		$(this).parent().find('> a').removeClass('expanded-menu');
	});

	//mega menu position
	(jQuery).fn.megamenu = function(width){
		var $that = (jQuery)(this),
			$window = (jQuery)(window);

		function update(){
			$that.find('.megamenu').each(function(){
				var $this = (jQuery)(this),
					windowW = $window.width(),
					offSetLeft = $this.offset().left,
					parentWidth = $this.width(),
					megaMenuCols = $this.find('> .dropdown > li.has-dropdown').length,
					megaMenuWidth,
					mainMenuWidth = $('#top .top-bar').width(),
					dropdownWidth = 295,
					longestMenu = 1;

				//fill in empty blanks if not equal length
				$this.find('> .dropdown > li.has-dropdown > .dropdown').each(function(){
					var currentLength = (jQuery)(this).find('> li').length;
					if(currentLength > longestMenu){
						longestMenu = currentLength;
					}
				});

				$this.find('> .dropdown > li.has-dropdown > .dropdown').each(function(){
					var $dropdown = (jQuery)(this);
					var currentLength = $dropdown.find('> li').length;
					if(currentLength < longestMenu){
						for (var i = 1; i <= longestMenu - currentLength; i++) {
							$dropdown.append('<li class="empty-megamenu"></li>');
						}
					}
				});

				dropdownWidth = mainMenuWidth / megaMenuCols;
				var megaMenuWidth = megaMenuCols * dropdownWidth > width ? width : mainMenuWidth,
					blankGutterW = windowW * 0.9 < width ? windowW * 0.05 : ( windowW - width ) / 2;

				//calculate default mega menu position - align in middle with parent item
				var megaMenuRight = megaMenuWidth / 2 - parentWidth / 2;

				//take care of mega menu position if it is pushed to outside of viewport
				megaMenuRight = ( megaMenuWidth / 2 > offSetLeft + parentWidth / 2 - blankGutterW ) ? width - (offSetLeft + parentWidth) : megaMenuRight;
				var megaMenuPosition = windowW - offSetLeft - parentWidth - blankGutterW

				//finally set mega menu position
				if (windowW > 1300 || megaMenuRight > megaMenuPosition) {
					megaMenuRight = megaMenuPosition;
				}

   				$this.find('> .dropdown > li.has-dropdown').css('width', dropdownWidth + 'px');
   				$this.find('> .dropdown > li.has-dropdown > .dropdown').css({'width': dropdownWidth + 'px', 'min-width': dropdownWidth + 'px'});
				$this.find('> .dropdown').css({
					'width': megaMenuWidth + 'px',
					'right':  - megaMenuRight + 'px'
				});
			});
		
			//take care of offset issue for other dropdown
			$that.find('li:not(.megamenu).has-dropdown > .dropdown').each(function(){
				var $this = (jQuery)(this);
				var	windowW = (jQuery)(window).width(),
					offSetLeft = $this.offset().left;
				if($this.width() + offSetLeft > windowW) {
					$this.css({
						'left': '-100%',
						'max-width': '100%'
					});
				}
			});
		}

		$(window).resize(update);
		update();
	};
	//end mega menu

	//set hover delay for mega menu item in case mouse is hovering on other menu items
	(function hoverdelay(){
		(jQuery)('#top .top-bar:not(.expanded) .top-bar-section li.has-dropdown').each(function(){

			var $this = (jQuery)(this),
				menuTimeoutShow,
				menuTimeoutHide;
			$this.on("mouseenter tap", function(e) {
				if(e.type == "tap") e.stopPropagation();
				clearTimeout(menuTimeoutShow);
				clearTimeout(menuTimeoutHide);

				menuTimeoutShow = setTimeout(function() {
				$this.addClass("hippo-menu-hovered");
					if( $this.hasClass("hippo-menu-hovered")){
						$this.children('ul').stop().css("visibility", "visible").animate({
							"opacity": 1
						}, 200);
					}
				}, 300);
			});

			$this.on("mouseleave", function(e) {
				clearTimeout(menuTimeoutShow);
				clearTimeout(menuTimeoutHide);
				menuTimeoutHide = setTimeout(function() {
				$this.removeClass("hippo-menu-hovered");
					if(!$this.hasClass("hippo-menu-hovered")){
						$this.children("ul").css({
							"opacity": 0,
							"visibility": "hidden"
						});
					}
				}, 300);
			});
		});	
	})();//end hippo menu hover function

})(jQuery);
	
(jQuery)('.top-bar-section').megamenu(1200);