import { goBack } from "./router.js";
import {
	setAlarmTimer,
	setAlarmLimits,
	arrayAlarmObjectCreate,
	alarmTimeout,
} from "./alarm.js";
import { doIfChecked, getFullDate, isExpiredEvent } from "./functions.js";
import { deleteEvent, returnObject } from "./events.js";

import { goToCreateEvent, pressEnter } from "./views/header.js";

let modal = document.getElementById("new-event");

function closeModal() {
	modal.style.display = "none";
	removeListenersModal();
	document.getElementById("modal-title").innerHTML = "New Event";
	document.getElementById("title").value = "New event";
	document.getElementById("set-all-day-event").checked = true;
	document.getElementById("event-start").value = "";
	document.getElementById("event-end-date").value = "";
	document.getElementById("event-start-time").value = "00:00";
	document.getElementById("event-end-time").value = "23:59";
	document.getElementById("alarm").checked = false;
	document.getElementById("alarm-start").value = "";
	document.getElementById("expired").checked = false;
	document.getElementById("notes").value =
		"Enter a description of the event. Come on !";
	document.getElementById("event-type").value = "holiday";
	localStorage.setItem("edit-flag", "false");
	goBack();
}

function enterKeyTyped(e) {
	if (e.key == "Enter") {
		newEventCreate(e);
	} else if (e.key == "Escape") {
		closeModal();
	}
}

function openModal() {
	document
		.getElementById("open-modal")
		.removeEventListener("click", goToCreateEvent);

	window.removeEventListener("keydown", pressEnter);

	modal.style.display = "block";
	setEventDateLimits();

	window.addEventListener("keydown", enterKeyTyped);

	document.getElementById("cancel-btn").addEventListener("click", closeModal);
	document.getElementById("cross").addEventListener("click", closeModal);
	document
		.getElementById("modal-form")
		.addEventListener("submit", newEventCreate);
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

function removeListenersModal() {
	document
		.getElementById("cancel-btn")
		.removeEventListener("click", closeModal);
	document.getElementById("cross").removeEventListener("click", closeModal);
	document
		.getElementById("modal-form")
		.removeEventListener("submit", newEventCreate);
	document
		.querySelector("input[name=set-all-day-event]")
		.removeEventListener("change", setDateTime);
	document
		.querySelector("input[name=set-event-end-date]")
		.removeEventListener("change", setEventEndDate);
	document
		.querySelector("input[name=set-event-end-time]")
		.removeEventListener("change", setEventEndTime);
	setAlarmLimits();
	document
		.querySelector("input[name=alarm]")
		.removeEventListener("change", setAlarmTimer);
	document
		.getElementById("event-start")
		.removeEventListener("change", setAlarmLimits);
	document
		.getElementById("event-start-time")
		.removeEventListener("change", setAlarmLimits);
}

function setEventDateLimits() {
	//seteo el de dia tmb, limita un año
	document
		.getElementById("event-start")
		.setAttribute("min", getFullDate(new Date(Date.now()), 0, 0, 0));
	document
		.getElementById("event-start")
		.setAttribute("max", getFullDate(new Date(Date.now()), 1, 0, 0));

	document.getElementById("event-start").value = getFullDate(
		new Date(Date.now()),
		0,
		0,
		0
	);
}

function setEventEndDate() {
	doIfChecked(
		"input[name=set-event-end-date]",
		["input[name=event-end-date]", "label[for=event-end-date]"],
		true
	);

	document
		.getElementById("event-end-date")
		.setAttribute("min", document.getElementById("event-start").value);

	document
		.getElementById("event-end-date")
		.setAttribute("max", getFullDate(new Date(Date.now()), 1, 0, 0));
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

	setEventEndTime();
	setEventEndDate();
}

//*Crea el objeto del evento y lo guarda en localStorage
function newEventCreate(e) {
	e.preventDefault();
	let newEventObject;
	let newEventsArray;
	//Si estoy editando
	if (JSON.parse(localStorage.getItem("edit-flag"))) {
		newEventObject = returnObject(JSON.parse(localStorage.getItem("objectId")));
		deleteEvent();
		//editarlo y volverlo a guardar en local storage
		newEventObject.id = localStorage.getItem("idcounter");
		newEventObject.allday =
			document.getElementById("set-all-day-event").checked;
		newEventObject.title = document.getElementById("title").value;
		newEventObject.initial_date = document.getElementById("event-start").value;
		newEventObject.final_date = document.getElementById("event-end-date").value;
		newEventObject.initial_time =
			document.getElementById("event-start-time").value;
		newEventObject.final_time = document.getElementById("event-end-time").value;
		newEventObject.alarm = document.getElementById("alarm").checked;
		newEventObject.alarm_date = document.getElementById("alarm-start").value;
		newEventObject.reminder = document.getElementById("expired").checked;
		newEventObject.description = document.getElementById("notes").value;
		newEventObject.type = document.getElementById("event-type").value;
	} else {
		// si no estoy editando

		newEventObject = {
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

		//new counter number
		let idcounter = parseInt(localStorage.getItem("idcounter"));
		let idcounterNext = idcounter + 1;
		idcounterNext = idcounterNext.toString();
		localStorage.setItem("idcounter", idcounterNext);
	}

	if (!localStorage.getItem("new-event")) {
		newEventsArray = [];
	} else {
		newEventsArray = JSON.parse(localStorage.getItem("new-event"));
	}

	// final date por defecto mismo dia, final time por defecto final del dia.
	if (!document.getElementById("set-event-end-date").checked) {
		//mismo dia de evento si no se setea end date
		newEventObject.final_date = newEventObject.initial_date;
	}

	//evento de una hora si no se setea la end time y de todo el dia hasta las 23:59
	let finalHour;
	let finalMins = newEventObject.initial_time.split(":")[1];
	if (!document.getElementById("set-event-end-time").checked) {
		let initialHour = parseInt(newEventObject.initial_time.split(":")[0]);
		if (initialHour == "23") {
			finalHour = "00";
		} else if (document.getElementById("set-all-day-event").checked) {
			finalHour = "23";
			finalMins = "59";
		} else {
			finalHour = initialHour + 1;
			if (finalHour < 10) {
				finalHour = "0" + finalHour.toString();
			} else {
				finalHour = finalHour.toString();
			}
		}
		newEventObject.final_time = finalHour + ":" + finalMins;
	}

	//push the object with the expired property into to the array into the localstorage
	if (document.getElementById("expired").checked) {
		newEventsArray.push(isExpiredEvent(newEventObject));
	} else {
		newEventsArray.push(newEventObject);
	}

	let newEventsString = JSON.stringify(newEventsArray);
	localStorage.setItem("new-event", newEventsString);

	if (document.getElementById("alarm").checked) {
		arrayAlarmObjectCreate();
		alarmTimeout(newEventObject);
	}
	closeModal();
}

export { openModal };
