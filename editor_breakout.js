jQuery(document).ready(function($) {
	var $el = $('#post-body-content');
	var pause_handler = false;
	var reset_editor_breakout = function() {
		$el.css({
			'left' : 'initial',
			'width': '100%'
		});
	};
	var build_editor_breakout = function() {
		reset_editor_breakout();
		var pos   = Math.ceil( $el.offset().left );
		var width = $el.width();
		$el.css({
			'left' : (-1*pos) + 'px',
			'width': $('body').width()
		});
	};
	var start_editor_breakout = function() {
		$(window).on('resize', build_editor_breakout);
		$(window).resize();
	};
	var stop_editor_breakout = function() {
		$(window).off('resize', build_editor_breakout);
		reset_editor_breakout();
		$(window).resize();
	};
	var MutationObserver = (function () {
		var prefixes = ['WebKit', 'Moz', 'O', 'Ms', '']
		for(var i=0; i < prefixes.length; i++) {
			if(prefixes[i] + 'MutationObserver' in window) {
				return window[prefixes[i] + 'MutationObserver'];
			}
		}
		return false;
	}());
	if(MutationObserver) {
		// Use MutationObserver
		var dfw_observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if( $('body').hasClass('focus-on') ) {
					start_editor_breakout();
				} else {
					stop_editor_breakout();
				}
			});
		});
		dfw_observer.observe( document.body, { attributes: true } );
	}
	else {
		// Fallback
		var test_for_dfw = function() {
			if( $('body').hasClass('focus-on') ) {
				start_editor_breakout();
			} else {
				stop_editor_breakout();
			}
			setTimeout(function() {
				test_for_dfw();
			}, 100);
		}
		test_for_dfw();
	}
});