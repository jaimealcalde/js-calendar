import { deleteAlarm } from "../alarm.js";
import { goBack } from "../router.js";

document.getElementById("close-pop-up").addEventListener("click", closePopUp);
let popup = document.getElementById("cookiesPopup");

function modalAlarma(id) {
	popup.style.display = "block";
	document.getElementsByTagName("audio")[0].play();

	let eventsArray = JSON.parse(localStorage.getItem("new-event"));

	for (const iterator of eventsArray) {
		if (iterator.id == id) {
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

export { modalAlarma };
