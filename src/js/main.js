
var body = document.body;

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

document.addEventListener('DOMContentLoaded', function (e) {
	document.body.classList.add('loaded');
});

