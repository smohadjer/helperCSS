helper = {
	//source: http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
	formatAMPM: function(hours, minutes) {
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		//minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	},
	
	/* scroll page by 1px using arrow up and arrow down keys */
	/* useful for debugging scroll related issues */
	scrollByPixel: function() {
		$(document).on('keyup keydown keypress', function(e) {
			e.preventDefault(); /* to avoid browser's default scrolling */

			if (e.type !== 'keyup') {
				return;
			}

			var code = e.keyCode ? e.keyCode : e.which;

		        if (code == 40) {
		            console.log("down pressed");
					$(window).scrollTop($(window).scrollTop() + 1);
		        } else if (code == 38) {
		            console.log("up pressed");
					$(window).scrollTop($(window).scrollTop() - 1);
		        }
		});			
	},	

	// http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
	updateQueryStringParameter: function(uri, key, value) {
		var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
		var separator = uri.indexOf('?') !== -1 ? '&' : '?';
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + '=' + value + '$2');
		}
		else {
			return uri + separator + key + '=' + value;
		}
	},

	createCookie: function(name,value,days) {
		var expires;

		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = '; expires='+date.toGMTString();
		} else {
			expires = '';
		}

		document.cookie = name + '=' + value + expires + '; path=/';
	},

	readCookie: function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for (var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		return null;
	},

	eraseCookie: function(name) {
		this.createCookie(name, '', -1);
	},

	// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
	getParameterByName: function(name) {
		name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
			results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	},

	//custom event for handling mobile/desktop customizations
	setMobileDesktopMediaQueryEvents: function() {
		var mediaQueryDesktop = window.matchMedia('screen and (min-width: 768px)');
		var mediaQueryMobile = window.matchMedia('screen and (max-width: 767px)');

		mediaQueryDesktop.addListener(function(obj) {
			if (obj.matches) {
				helper.isMobile = false;
				$(document).trigger('mediaQueryDesktopMatched');
			}
		});

		mediaQueryMobile.addListener(function(obj) {
			if (obj.matches) {
				helper.isMobile = true;
				$(document).trigger('mediaQueryMobileMatched');
			}
		});

		//using setTimeout to make sure all plugins are already initialized
		setTimeout(function() {
			if (mediaQueryDesktop.matches) {
				helper.isMobile = false;
				$(document).trigger('mediaQueryDesktopMatched');
			}

			if (mediaQueryMobile.matches) {
				helper.isMobile = true;
				$(document).trigger('mediaQueryMobileMatched');
			}
		}, 0);
	}
};

