const Page = {
	settings: {
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