import { deleteAlarm } from "../alarm.js";
import { goBack, goToShowEvent } from "../router.js";
import { openEvent } from "./modalShowEvents.js";

document.getElementById("close-pop-up").addEventListener("click", closePopUp);
document
	.getElementById("accept-button-alarm")
	.addEventListener("click", closePopUp);
document.getElementById("goEvent").addEventListener("click", showEventAlarm);
let popup = document.getElementById("cookiesPopup");

function modalAlarma(id) {
	popup.style.display = "block";
	document.getElementsByTagName("audio")[0].play();

	let eventsArray = JSON.parse(localStorage.getItem("new-event"));

	for (const iterator of eventsArray) {
		if (iterator.id == id) {
			console.log("guardando-evento");
			localStorage.setItem("alarm-id-playing", iterator.id);
			document.getElementById("alarm-message").innerHTML =
				"Alarma del evento " +
				iterator.title +
				"que empieza el: " +
				iterator.initial_date +
				" a las: " +
				iterator.initial_time;
		}
	}

	deleteAlarm(id);
}

function closePopUp() {
	popup.style.display = "none";
	goBack();
}

function showEventAlarm() {
	let id = JSON.parse(localStorage.getItem("alarm-id-playing"));

	//Set item localStorage
	localStorage.setItem("objectId", id);
	popup.style.display = "none";
	openEvent();
}

export { modalAlarma };
