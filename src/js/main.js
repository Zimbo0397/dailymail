
var body = document.body;

// sidebar hamburger
(function () {
	var state = false,
		hamburger = document.querySelector('.hamburger'),
		sidebar = document.querySelector('#tablet-mobile-menu'),
		tilt = document.querySelector('#tablet-mobile-menu-tilt');
	function openSlider(e) {
		if (e) e.preventDefault();
		hamburger.classList.add('cross-state');
		sidebar.classList.add('opened');
		body.classList.add('sidebar-opened');
		state = true;
	}
	function closeSlider(e) {
		if (e) e.preventDefault();
		hamburger.classList.remove('cross-state');
		sidebar.classList.remove('opened');
		body.classList.remove('sidebar-opened');
		state = false;
	}
	function clickHandler (e) {
		if (state) {
			closeSlider(e);
		} else {
			openSlider(e);
		}
	}
	tilt.addEventListener('click', closeSlider);
	hamburger.addEventListener('click', clickHandler);
})();

// toggle state
function toggleState (selector) {
	var elements = document.querySelectorAll(selector);
	for (var i = 0; i < elements.length; i++) {
		(function () {
			var element = elements[i],
				state = false;
			element.addEventListener('click', function clickHandler (e) {
				e.preventDefault();
				var target = e.target;
				if (state) {
					if (!(target === this || target.classList.contains('js-close'))) return;
					this.classList.remove('opened');
					state = false;
				} else {
					this.classList.add('opened');
					state = true;
				}
			});
		})();
	}
}

toggleState('.search-submit');
toggleState('.sharebar-wrapper .subscribe');

function offset(el) {
	var rect = el.getBoundingClientRect();

	return {
		top: rect.top + document.body.scrollTop || window.pageYOffset,
		left: rect.left + document.body.scrollLeft || window.pageXOffset
	};
}
function getSize(el) {
	var styles = window.getComputedStyle(el);

	return {
		height: parseInt(styles.height) || 0,
		width: parseInt(styles.width) || 0
	};
}

// fixed navbar
(function () {
	var top,
		oldPosition,
		fixPosition = 0,
		state = true,
		visible = false,
		direction = true,
		navbarHeight = 0,
		styleTransitionOn = 'transform 300ms',
		styleTransitionOff = 'none',
		styleNavbarShow = 'translateY(0) translateZ(0)',
		styleNavbarHide = 'translateY(-100%) translateZ(0)',
		navbar = document.querySelector('#header'),
		navbarOffsetBlock = document.querySelector('.header-ad-section'),
		articleLeft = document.querySelector('#itemsContainer .container > .left'),
		articleRight = document.querySelector('#itemsContainer .container > .right > .inner'),
		rightSidebarState,
		leftSidebarTop,
		leftSidebarTopOffset,
		rightSidebarLeft,
		leftSidebarBottom,
		rightSidebarBreak,
		leftSidebarHeight,
		rightSidebarHeight;

	fixPosition = offset(navbar).top;
	navbarHeight = getSize(navbar).height;

	leftSidebarTopOffset = navbarHeight;
	leftSidebarHeight = getSize(articleLeft).height;
	rightSidebarHeight = getSize(articleRight).height;
	leftSidebarTop = offset(articleLeft).top;
	rightSidebarLeft = offset(articleRight.parentNode).left;
	leftSidebarBottom = leftSidebarTop + leftSidebarHeight;
	rightSidebarBreak = leftSidebarBottom - rightSidebarHeight;

	articleRight.style.left = rightSidebarLeft + 'px';

	window.addEventListener('resize', function () {
		fixPosition = getSize(navbarOffsetBlock).height;
		navbarHeight = getSize(navbar).height;

		leftSidebarTopOffset = navbarHeight;

		leftSidebarHeight = getSize(articleLeft).height;
		rightSidebarHeight = getSize(articleRight).height;
		leftSidebarTop = offset(articleLeft).top;
		rightSidebarLeft = offset(articleRight.parentNode).left;
		leftSidebarBottom = leftSidebarTop + leftSidebarHeight;
		rightSidebarBreak = leftSidebarBottom - rightSidebarHeight;

		articleRight.style.left = rightSidebarLeft + 'px';

	});
	window.addEventListener('load', function () {
		fixPosition = getSize(navbarOffsetBlock).height;
		navbarHeight = getSize(navbar).height;

		leftSidebarTopOffset = navbarHeight;

		leftSidebarHeight = getSize(articleLeft).height;
		rightSidebarHeight = getSize(articleRight).height;
		leftSidebarTop = offset(articleLeft).top;
		rightSidebarLeft = offset(articleRight.parentNode).left;
		leftSidebarBottom = leftSidebarTop + leftSidebarHeight;
		rightSidebarBreak = leftSidebarBottom - rightSidebarHeight;

		articleRight.style.left = rightSidebarLeft + 'px';

	});

	if (leftSidebarHeight > rightSidebarHeight && window.innerWidth > 991) {
		function fixRight (top) {
			top = top + leftSidebarTopOffset;
			if (top < leftSidebarTop) {
				if (rightSidebarState === 1) return;
				articleRight.classList.remove('fixed');
				// articleRight.classList.remove('bottom');
				rightSidebarState = 1;
			} else if (top > leftSidebarTop && top < rightSidebarBreak) {
				if (rightSidebarState === 2) return;
				articleRight.style.top = leftSidebarTopOffset + 'px';
				articleRight.classList.add('fixed');
				// articleRight.classList.remove('bottom');
				rightSidebarState = 2;
			} else {
				// if (rightSidebarState === 3) return;
				// articleRight.classList.remove('fixed');
				// articleRight.classList.add('bottom');
				articleRight.style.top = rightSidebarBreak + leftSidebarTopOffset - top + 'px';
				rightSidebarState = 3;
			}
		}
	} else {
		function fixRight () {
			return;
		}
	}

	function fixNavigation() {
		hideNavigation();
		window.requestAnimationFrame(function () {
			body.classList.add('navbar-fixed');
		});
		visible = true;
	}
	function unfixNavigation() {
		window.requestAnimationFrame(function () {
			body.classList.remove('navbar-fixed');
			navbar.style.transform = styleNavbarShow;
		});
		visible = false;
		state = false;
	}
	function showNavigation() {
		navbar.style.transition = styleTransitionOn;
		if (visible) {
			navbar.style.transform = styleNavbarHide;
		}
		setTimeout(function () {
			window.requestAnimationFrame(function () {
				navbar.style.transform = styleNavbarShow;
			});
		}, 20);
		state = true;
	}
	function hideNavigation() {
		if (visible) {
			navbar.style.transition = styleTransitionOn;
		} else {
			navbar.style.transition = styleTransitionOff;
		}
		window.requestAnimationFrame(function () {
			navbar.style.transform = styleNavbarHide;
		});
		state = false;
	}
	window.addEventListener('scroll', function (e) {
		var topCurrent, topOffset;
		topCurrent = document.body.scrollTop || window.pageYOffset;
		if (topCurrent > top) {
			direction = true;
		} else {
			direction = false;
		}
		top = topCurrent;
		if (direction) {
			topOffset = navbarHeight;
		} else {
			topOffset = 0;
		}

		if (oldPosition > top + 2) {
			if (visible && !state) {
				showNavigation();
			}
		} else if (visible && oldPosition < top - 2) {
			if (state) {
				hideNavigation();
			}
		}

		if (top > fixPosition + topOffset) {
			if (!visible) {
				fixNavigation();
			}
		} else {
			if (visible) {
				unfixNavigation();
			}
		}
		oldPosition = top;

		fixRight(top);
	});
})();

document.addEventListener('DOMContentLoaded', function (e) {
	document.body.classList.add('loaded');
});

(function () {
	var state = false,
		tilt = document.querySelector('#tablet-mobile-menu-tilt'),
		trigger = document.querySelector('.js-trending-trigger'),
		target = document.querySelector('#trending-modal');

	function openHandler (e) {
		if (e) e.preventDefault();
		body.classList.add('trending-opened');
		state = true;
		target.addEventListener('wheel', closeHandler);
		document.addEventListener('wheel', closeHandler);
		tilt.addEventListener('click', closeHandler);
	}

	function closeHandler (e) {
		if (e) e.preventDefault();
		body.classList.remove('trending-opened');
		state = false;
		target.removeEventListener('wheel', closeHandler);
		document.removeEventListener('wheel', closeHandler);
		tilt.removeEventListener('click', closeHandler);
	}

	trigger.addEventListener('click', openHandler);
})();
