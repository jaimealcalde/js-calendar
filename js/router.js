import { monthDisplay } from "./views/month.js";

function navigate() {
	if (location.hash == "") {
		monthDisplay();
	} else if (location.hash == "day") {
		//printDay();
	}
}

export { navigate };
