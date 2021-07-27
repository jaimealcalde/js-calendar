import { monthDisplay } from "./views/month.js";
import { openModal } from "./modal.js";
import { dayDisplay, printDay } from "./views/day.js";
import { showEvent } from "./views/modalShowEvents.js";

function navigate() {
	if (location.hash == "" || location.hash == "#") {
		monthDisplay();
	} else if (location.hash == "#day") {
		dayDisplay();
	} else if (location.hash == "#new-event") {
		openModal();
	} else if (location.hash == "#show-event") {
		showEvent();
	}
}

function goToCreateEvent(e) {
	e.preventDefault();
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
		goToMonth();
	} else if (document.getElementById("dayView")) {
		goToDayView();
	}
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
};
