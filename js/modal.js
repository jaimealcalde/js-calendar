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
	document.getElementById("new-event").style.display = "none";
	goToMonth();
}

//when the modal opens
function openModal() {
	document.getElementById("new-event").style.display = "block";
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

function setEventEndDate() {
	if (document.querySelector("input[name=set-event-end-date]").checked) {
		document
			.querySelector("input[name=event-end-date]")
			.classList.remove("label-hidden");
		document
			.querySelector("label[for=event-end-date]")
			.classList.remove("label-hidden");
	} else {
		document
			.querySelector("input[name=event-end-date]")
			.classList.add("label-hidden");
		document
			.querySelector("label[for=event-end-date]")
			.classList.add("label-hidden");
	}
}

function setEventEndTime() {
	if (document.querySelector("input[name=set-event-end-time]").checked) {
		document
			.querySelector("input[name=event-end-time]")
			.classList.remove("label-hidden");
		document
			.querySelector("label[for=event-end-time]")
			.classList.remove("label-hidden");
	} else {
		document
			.querySelector("input[name=event-end-time]")
			.classList.add("label-hidden");
		document
			.querySelector("label[for=event-end-time]")
			.classList.add("label-hidden");
	}
}

function setDateTime() {
	//si no es evento del dia sacar las horas y eso

	if (!document.getElementById("set-all-day-event").checked) {
		document
			.querySelector("input[name=event-start-time]")
			.classList.remove("label-hidden");
		document
			.querySelector("label[for=event-start-time]")
			.classList.remove("label-hidden");
		document
			.querySelector("input[name=set-event-end-date]")
			.classList.remove("label-hidden");
		document
			.querySelector("label[for=set-event-end-date]")
			.classList.remove("label-hidden");
		document
			.querySelector("input[name=set-event-end-time]")
			.classList.remove("label-hidden");
		document
			.querySelector("label[for=set-event-end-time]")
			.classList.remove("label-hidden");
	} else {
		document
			.querySelector("input[name=event-start-time]")
			.classList.add("label-hidden");
		document
			.querySelector("label[for=event-start-time]")
			.classList.add("label-hidden");
		document
			.querySelector("input[name=set-event-end-date]")
			.classList.add("label-hidden");
		document
			.querySelector("label[for=set-event-end-date]")
			.classList.add("label-hidden");
		document
			.querySelector("input[name=set-event-end-time]")
			.classList.add("label-hidden");
		document
			.querySelector("label[for=set-event-end-time]")
			.classList.add("label-hidden");
	}
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

export { openModal };
