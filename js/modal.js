import { goToMonth } from "./router.js";
import { setAlarmTimer, setAlarmLimits, alarmObjectCreate } from "./alarm.js";

// Get the modal
let modal = document.getElementById("new-event");

document.getElementById("cancel-btn").addEventListener("click", closeModal);
document.getElementById("cross").addEventListener("click", closeModal);
document
	.getElementById("modal-form")
	.addEventListener("submit", newEventCreate);

function closeModal() {
	modal.style.display = "none";
	goToMonth();
}

//when the modal opens, add event listeners
function openModal() {
	modal.style.display = "block";
	document
		.querySelector("input[name=set-all-day-event]")
		.addEventListener("change", setDateTime);
	document
		.querySelector("input[name=set-event-end-date]")
		.addEventListener("change", setEventEndDate);
	document
		.querySelector("input[name=set-event-end-time]")
		.addEventListener("change", setEventEndTime);
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

function doIfChecked(domElementCheck, elementToSHow, state) {
	if (state == true) {
		if (document.querySelector(domElementCheck).checked) {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.remove("label-hidden");
			}
		} else {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.add("label-hidden");
			}
		}
	} else if (state == false) {
		if (!document.querySelector(domElementCheck).checked) {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.remove("label-hidden");
			}
		} else {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.add("label-hidden");
			}
		}
	}
}

function setEventEndDate() {
	doIfChecked(
		"input[name=set-event-end-date]",
		["input[name=event-end-date]", "label[for=event-end-date]"],
		true
	);
}

function setEventEndTime() {
	doIfChecked(
		"input[name=set-event-end-time]",
		["input[name=event-end-time]", "label[for=event-end-time]"],
		true
	);
}

function setDateTime() {
	doIfChecked(
		"input[name=set-all-day-event]",
		[
			"input[name=event-start-time]",
			"label[for=event-start-time]",
			"input[name=set-event-end-date]",
			"label[for=set-event-end-date]",
			"input[name=set-event-end-time]",
			"label[for=set-event-end-time]",
		],
		false
	);
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
		allday: document.getElementById("set-all-day-event").checked,
		title: document.getElementById("title").value,
		initial_date: document.getElementById("event-start").value,
		final_date: document.getElementById("event-end-date").value,
		initial_time: document.getElementById("event-start-time").value,
		final_time: document.getElementById("event-end-time").value,
		alarm: document.getElementById("alarm").checked,
		alarm_date: document.getElementById("alarm-start").value,
		reminder: document.getElementById("expired").checked,
		description: document.getElementById("notes").value,
		type: document.getElementById("event-type").value,
	};

	// final date por defecto mismo dia, final time por defecto final del dia.

	if (!document.getElementById("set-event-end-date").checked) {
		//mismo dia de evento si no se setea end date
		newEventObject.final_date = newEventObject.initial_date;
	}

	//evento de una hora si no se setea la end time
	let finalHour;
	if (!document.getElementById("set-event-end-time").checked) {
		let initialHour = parseInt(newEventObject.initial_time.split(":")[0]);
		if (initialHour == "23") {
			finalHour = "00";
		} else {
			finalHour = initialHour + 1;

			if (finalHour < 10) {
				finalHour = "0" + finalHour.toString();
			} else {
				finalHour = finalHour.toString();
			}
		}

		newEventObject.final_time =
			finalHour + ":" + newEventObject.initial_time.split(":")[1];
	}

	//new counter number
	let idcounter = parseInt(localStorage.getItem("idcounter"));
	let idcounterNext = idcounter + 1;
	idcounterNext = idcounterNext.toString();
	localStorage.setItem("idcounter", idcounterNext);

	//push the object to the array into the localstorage
	newEventsArray.push(newEventObject);
	let newEventsString = JSON.stringify(newEventsArray);
	localStorage.setItem("new-event", newEventsString);

	closeModal();
}

export { openModal, doIfChecked };
