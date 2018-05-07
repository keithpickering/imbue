'use strict';

const Accordion = {
	settings: {
		// Expand the first item by default
		first_expanded: true,
		// Allow items to be toggled independently
		toggle: false
	},

	openAccordion: function(toggle, content) {
		if (content.children.length) {
			toggle.classList.add("is-open");
			var final_height = content.children[0].offsetHeight;
			content.style.height = final_height + "px";
		}
	},

	closeAccordion: function(toggle, content) {
		toggle.classList.remove("is-open");
		content.style.height = 0;
	},

	init: function(el) {
		const _this = this;

		// Loop through the accordion's sections and set up the click behavior
		const sections = el.getElementsByClassName("accordion");
		const all_toggles = el.getElementsByClassName("accordion-head");
		const all_contents = el.getElementsByClassName("accordion-body");
		for (var i = 0; i < sections.length; i++) {
			const section = sections[i];
			const toggle = all_toggles[i];
			const content = all_contents[i];

			// Click behavior
			toggle.addEventListener("click", function(e) {
				if (!_this.settings.toggle) {
					// Hide all content areas first
					for (var a = 0; a < all_contents.length; a++) {
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
			if (_this.settings.first_expanded && i === 0) {
				_this.openAccordion(toggle, content);
			}
		}
	}
};

(function() {
	// Initiate all instances on the page
	const accordions = document.getElementsByClassName("accordions");
	for (var i = 0; i < accordions.length; i++) {
		Accordion.init(accordions[i]);
	}
})();