const Page = {
	settings: {
	},

	el_visible: function(el) {
	    var bounding = el.getBoundingClientRect();
	    return (
	        bounding.top >= 0 &&
	        bounding.left >= 0 &&
	        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
	    );
	},

	init: function(el) {
		const _this = this;

		// Mobile menu toggle
		const page_head = document.getElementById("page-head");
		const menu_toggle = document.getElementById("page-menu-toggle");
		const menu = document.getElementById("page-menu");

		menu_toggle.addEventListener("click", function(e) {
			e.preventDefault();
			menu.classList.toggle("is-active");
		});
	}
};

(function() {
	Page.init();
})();
const Accordion = {
	settings: {
		// Expand the first item by default
		first_expanded: false,
		// Allow items to be toggled independently
		toggle: false
	},

	openAccordion: function(toggle, content) {
		if (content.children.length) {
			toggle.classList.add("is-open");
			let final_height = Math.floor(content.children[0].offsetHeight);
			content.style.height = final_height + "px";
		}
	},

	closeAccordion: function(toggle, content) {
		toggle.classList.remove("is-open");
		content.style.height = 0;
	},

	init: function(el) {
		const _this = this;

		// Override default settings with classes
		let is_first_expanded = _this.settings.first_expanded;
		if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
		let is_toggle = _this.settings.toggle;
		if (el.classList.contains("is-toggle")) is_toggle = true;

		// Loop through the accordion's sections and set up the click behavior
		const sections = el.getElementsByClassName("accordion");
		const all_toggles = el.getElementsByClassName("accordion-head");
		const all_contents = el.getElementsByClassName("accordion-body");
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const toggle = all_toggles[i];
			const content = all_contents[i];

			// Click behavior
			toggle.addEventListener("click", function(e) {
				if (!is_toggle) {
					// Hide all content areas first
					for (let a = 0; a < all_contents.length; a++) {
						_this.closeAccordion(all_toggles[a], all_contents[a]);
					}

					// Expand the clicked item
					_this.openAccordion(toggle, content);
				} else {
					// Toggle the clicked item
					if (toggle.classList.contains("is-open")) {
						_this.closeAccordion(toggle, content);
					} else {
						_this.openAccordion(toggle, content);
					}
				}
			});

			// Expand the first item
			if (i === 0 && is_first_expanded) {
				_this.openAccordion(toggle, content);
			}
		}
	}
};

(function() {
	// Initiate all instances on the page
	const accordions = document.getElementsByClassName("accordions");
	for (let i = 0; i < accordions.length; i++) {
		Accordion.init(accordions[i]);
	}
})();
const Counter = {
	settings: {
		speed: 1000
	},

	count: function(number_el, number) {
		const _this = this;

		let speed = _this.settings.speed;
		if (number_el.hasAttribute("data-speed")) {
			speed = parseInt(number_el.getAttribute("data-speed"));
		}

		if (number_el && number > 0) {
			const step_min = 50;
			let step_speed = Math.abs(Math.floor(speed / number));
			    step_speed = Math.max(step_speed, step_min);

		    const start_time = new Date().getTime();
		    const end_time = start_time + speed;
		    let timer;

		    const step = () => {
		    	const now = new Date().getTime();
		    	const left = Math.max((end_time - now) / speed, 0);
		    	const value = Math.round(number - (left * number));
		    	number_el.innerHTML = value;
		    	if (value == number)
		    		clearInterval(timer);
		    };

		    timer = setInterval(step, step_speed);
		    step();
		}
	},

	init: function(el) {
		const _this = this;
		const number_el = el.getElementsByClassName("counter-number")[0];
		const number = parseInt(number_el.innerText);

		number_el.innerHTML = "0";

		if (Page.el_visible(number_el)) {
			_this.count(number_el, number);
		} else {
			let active = false;
			window.addEventListener("scroll", function() {
				if (!active) {
					if (Page.el_visible(number_el)) {
						active = true;
						_this.count(number_el, number);
					}
				}
			});
		}
	}
};

(function() {
	// Initiate all instances on the page
	const counters = document.getElementsByClassName("counter");
	for (let i = 0; i < counters.length; i++) {
		Counter.init(counters[i]);
	}
})();