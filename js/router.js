//import { printMonth } from "./views/month.js";
//import { printDay } from "./views/day.js";
import { printHeader } from "./views/header.js";

function navigate() {
	if (location.hash == "") {
		printHeader();
	} else if (location.hash == "day") {
		//printDay();
	}
}

export { navigate };
