const Accordion = {
	settings: {
	},

	init: function(el) {
		// Loop through the accordion's sections and set up the click behavior
		const sections = el.getElementsByClassName("accordion");
		const all_contents = el.getElementsByClassName("accordion-body");
		for (var i = 0; i < sections.length; i++) {
			const section = sections[i];
			const toggle = section.getElementsByClassName("accordion-head")[0];
			const content = section.getElementsByClassName("accordion-body")[0];

			toggle.addEventListener("click", function(e) {
				// Hide all content areas first
				for (var a = 0; a < all_contents.length; a++) {
					all_contents[a].style.display = "none";
				}
				// Show the relevant one
				content.style.display = "block";
			});
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