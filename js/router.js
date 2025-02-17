import { monthDisplay } from "./views/month.js";
import { openModal } from "./modal.js";
import { dayDisplay } from "./views/day.js";
import { showEvent } from "./views/modalShowEvents.js";
import { editEvent } from "./events.js";

function navigate() {
	if (location.hash == "" || location.hash == "#") {
		monthDisplay();
	} else if (location.hash == "#day") {
		dayDisplay();
	} else if (location.hash == "#new-event") {
		openModal();
	} else if (location.hash == "#show-event") {
		showEvent();
	} else if (location.hash == "#fix-event") {
		editEvent();
	}
}

function goToCreateEvent() {
	location.hash = "new-event";
}

function goToMonth() {
	location.hash = "";
}

function goToDayView() {
	location.hash = "day";
}

function goBack() {
	if (document.getElementById("monthView")) {
		location.hash = "";
	} else if (document.getElementById("dayView")) {
		location.hash = "day";
	}
}

function goToEditEvent() {
	location.hash = "fix-event";
}

function goToShowEvent() {
	location.hash = "show-event";
}

export {
	navigate,
	goToCreateEvent,
	goToMonth,
	goToDayView,
	goBack,
	goToShowEvent,
	goToEditEvent,
};
