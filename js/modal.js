import { goToMonth } from "./router.js";
import { setAlarmTimer, setAlarmLimits } from "./alarm.js";

// Get the modal
let modal = document.getElementById("new-event");

document.getElementById("cancel-btn").addEventListener("click", closeModal);
document.getElementById("cross").addEventListener("click", closeModal);
document
	.getElementById("modal-form")
	.addEventListener("submit", newEventCreate);

function closeModal() {
	document.getElementById("new-event").style.display = "none";
	goToMonth();
}

//when the modal opens
function openModal() {
	document.getElementById("new-event").style.display = "block";
	setAlarmLimits();
	document
		.querySelector("input[name=alarm]")
		.addEventListener("change", setAlarmTimer);
	document
		.getElementById("event-start")
		.addEventListener("change", setAlarmLimits);
	document
		.getElementById("event-start-time")
		.addEventListener("change", setAlarmLimits);
}

function newEventCreate(e, newEventsArray) {
	if (!localStorage.getItem("new-event")) {
		newEventsArray = [];
	} else {
		newEventsArray = JSON.parse(localStorage.getItem("new-event"));
	}

	e.preventDefault();

	let newEventObject = {
		id: localStorage.getItem("idcounter"),
		title: document.getElementById("title").value,
		initial_date: document.getElementById("event-start").value,
		final_date: 0,
		initial_time: document.getElementById("event-start-time").value,
		final_time: 0,
		alarm: document.getElementById("alarm").checked,
		alarm_date: document.getElementById("alarm-start").value,
		reminder: document.getElementById("expired").checked,
		description: document.getElementById("notes").value,
		type: "holiday",
	};

	// final date por defecto mismo dia, final time por defecto final del dia.

	newEventObject.final_date = newEventObject.initial_date;
	newEventObject.final_time = "23:59";

	let idcounter = parseInt(localStorage.getItem("idcounter"));
	let idcounterNext = idcounter + 1;
	idcounterNext = idcounterNext.toString();
	localStorage.setItem("idcounter", idcounterNext);

	newEventsArray.push(newEventObject);
	let newEventsString = JSON.stringify(newEventsArray);
	localStorage.setItem("new-event", newEventsString);

	closeModal();
}

export { openModal };
