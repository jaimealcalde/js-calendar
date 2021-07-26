import { monthDisplay } from "./views/month.js";
import { openModal } from "./modal.js";
import { printDay } from "./views/day.js";
import { addModal } from "./views/modalShowEvents.js";

function navigate() {
	console.log(location.hash);
	if (location.hash == "" || location.hash == "#") {
		monthDisplay();
	} else if (location.hash == "#day") {
		printDay();
	} else if (location.hash == "#new-event") {
		openModal();
	} else if (location.hash == "#show-event") {
		addModal();
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

/* function goBack (){
  if (location.hash=) {
    console.log("entre aqui cerrar e ir a mes");
    goToMonth();
  } else if (document.getElementById("dayView")) {
    console.log("entre aqui cerrar e ir a dia");
    goToDay();
  }
} */

function goToShowEvent() {
	location.hash = "show-event";
}

export { navigate, goToCreateEvent, goToMonth, goToDayView };
