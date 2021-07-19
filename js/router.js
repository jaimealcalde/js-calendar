import { printMonth } from "./views/month.js";
//import { printDay } from "./views/day.js";

function navigate() {
	if (location.hash == "") {
		printMonth();
	} else if (location.hash == "day") {
		//printDay();
	}
}

export { navigate };
