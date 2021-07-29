import { goBack, goToShowEvent } from "../router.js";
import { openEvent } from "./modalShowEvents.js";

document.getElementById("close-reminder").addEventListener("click", closePopUp);
document
	.getElementById("accept-button-reminder")
	.addEventListener("click", closePopUp);
document
	.getElementById("goToEventReminder")
	.addEventListener("click", showEventReminder);

let reminder = document.getElementById("reminderPopup");

function modalReminder(id) {
	console.log("Reminder pop-up");
	reminder.style.display = "block";
	document.getElementsByTagName("audio")[0].play();

	let eventsArray = JSON.parse(localStorage.getItem("new-event"));

	for (const iterator of eventsArray) {
		if (iterator.id == id) {
			console.log("expired-event");
			localStorage.setItem("expired-id-playing", iterator.id);
			document.getElementById("reminder-message").innerHTML = iterator.title;
		}
	}
}

function closePopUp() {
	reminder.style.display = "none";
	goBack();
}

function showEventReminder() {
	let id = JSON.parse(localStorage.getItem("expired-id-playing"));

	//Set item localStorage
	localStorage.setItem("objectId", id);
	reminder.style.display = "none";
	openEvent();
}

export { modalReminder };
