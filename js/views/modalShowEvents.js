import { setEventsOnLocal } from "../functions.js";
import { goBack, goToShowEvent } from "../router.js";
import { editEvent, deleteEvent } from "../events.js";

//buttons
let close = document.getElementById("cross-show-container");
let cancelButton = document.getElementById("cancel-event");
let editButton = document.getElementById("edit-event");
let deleteButton = document.getElementById("delete-event");

let modal = document.getElementById("showEventContainer");
let clickedDay = JSON.parse(localStorage.getItem("day"));

function addEventListenerShowEvent() {
	close.addEventListener("click", closeModal);
	cancelButton.addEventListener("click", closeModal);
	editButton.addEventListener("click", editEvent);
	deleteButton.addEventListener("click", deleteEvent);
}

function removeEventListenerShowEvent() {
	close.removeEventListener("click", closeModal);
	cancelButton.removeEventListener("click", closeModal);
	editButton.removeEventListener("click", editEvent);
	deleteButton.removeEventListener("click", deleteEvent);
}

//el evento tanto en el mes como en el dia tienen el id
function selectId(e) {
	let objectId = e.target.dataset.id;
	setEventsOnLocal(clickedDay, "objectId");
	localStorage.setItem("Id", JSON.stringify(objectId));
	openEvent();
}
function showEvent() {
	convert();
	chooseObject();
}

function openEvent() {
	addEventListenerShowEvent();
	modal.style.display = "block";
	goToShowEvent();
}

function borrarContenidoModal() {
	document.getElementById("titleEvent").innerHTML = "";

	document.getElementById("dateEvent").innerHTML = "";

	document.getElementById("timeEvent").innerHTML = "";

	document.getElementById("alarmEvent").innerHTML = "";

	document.getElementById("expiresEvent").innerHTML = "";

	document.getElementById("noteEvent").innerHTML = "";

	document.getElementById("typeEvent").innerHTML = "";
}

function closeModal() {
	modal.style.display = "none";
	borrarContenidoModal();
	removeEventListenerShowEvent();
	goBack();
}

let preSavedEvents;
let newEventsArray;
function convert() {
	preSavedEvents = JSON.parse(localStorage.getItem("pre-saved-events"));
	newEventsArray = JSON.parse(localStorage.getItem("new-event"));
}

let exp = /^[a-z]+$/i;
function chooseObject() {
	let objectId = JSON.parse(localStorage.getItem("Id"));

	const test = exp.test(objectId);

	if (test) {
		addNew(preSavedEvents, objectId);
	} else {
		addNew(newEventsArray, objectId);
	}
}

function addNew(arrayObjetos, id) {
	let eventToShow;
	for (let index = 0; index < arrayObjetos.length; index++) {
		const element = arrayObjetos[index];

		if (element.id == id) {
			console.log(element.id, id);
			eventToShow = element;
		}
	}

	let title = document.getElementById("titleEvent").textContent;
	let titleContent = eventToShow.title;
	document.getElementById("titleEvent").innerHTML = title + " " + titleContent;

	let startDate = document.getElementById("dateEvent").textContent;
	let startDateContent = eventToShow.initial_date;
	document.getElementById("dateEvent").innerHTML =
		startDate + " " + startDateContent;

	let endDate = document.getElementById("endDateEvent").textContent;
	let endDateContent = eventToShow.final_date;
	document.getElementById("endDateEvent").innerHTML =
		endDate + " " + endDateContent;

	let endTime = document.getElementById("endTimeEvent").textContent;
	let endTimeContent = eventToShow.final_time;
	document.getElementById("endTimeEvent").innerHTML =
		endTime + " " + endTimeContent;

	let startTime = document.getElementById("timeEvent").textContent;
	let startTimeContent = eventToShow.initial_time;
	document.getElementById("timeEvent").innerHTML =
		startTime + " " + startTimeContent;

	let alarm = document.getElementById("alarmEvent").textContent;
	let alarmContent = eventToShow.alarm;
	document.getElementById("alarmEvent").innerHTML = alarm + " " + alarmContent;

	let expires = document.getElementById("expiresEvent").textContent;
	let expiresContent = eventToShow.reminder;
	document.getElementById("expiresEvent").innerHTML =
		expires + " " + expiresContent;

	let note = document.getElementById("noteEvent").textContent;
	let noteContent = eventToShow.description;
	document.getElementById("noteEvent").innerHTML = note + " " + noteContent;

	let type = document.getElementById("typeEvent").textContent;
	let typeContent = eventToShow.type;
	document.getElementById("typeEvent").innerHTML = type + " " + typeContent;
}

export { showEvent, selectId, closeModal, openEvent };
