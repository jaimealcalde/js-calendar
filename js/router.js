import { monthDisplay } from "./views/month.js";
import { openModal } from "./modal.js";

function navigate() {
	if (location.hash == "" || location.hash == "#") {
		monthDisplay();
	} else if (location.hash == "#day") {
		//printDay();
	} else if (location.hash == "#new-event") {
		openModal();
	}
}

function goToCreateEvent(e) {
	e.preventDefault();
	location.hash = "new-event";
}

function goToMonth() {
	location.hash = "";
}

export { navigate, goToCreateEvent, goToMonth };
