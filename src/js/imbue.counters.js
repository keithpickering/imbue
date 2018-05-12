const Counter = {
	settings: {
		speed: 1000
	},

	init: function(el) {
		const _this = this;
		const number_el = el.getElementsByClassName("counter-number")[0];
		let speed = _this.settings.speed;
		if (number_el.hasAttribute("data-speed")) {
			speed = parseInt(number_el.getAttribute("data-speed"));
		}

		if (number_el) {
			let number = parseInt(number_el.innerText);
			let number_curr = 0;
			number_el.innerHTML = number_curr;

			if (number > 0) {
				const step_speed = speed / number;
				const steps = setInterval(function() {
					number_curr++;
					number_el.innerHTML = number_curr;

					if (number_curr === number)
						clearInterval(steps);
				}, step_speed);
			}
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