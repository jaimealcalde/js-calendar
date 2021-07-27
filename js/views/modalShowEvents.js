import { setEventsOnLocal } from "../functions.js";
import { goBack } from "../router.js";

let close = document.getElementById("cross-show-container");
let modal = document.getElementById("showEventContainer");
let clickedDay = JSON.parse(localStorage.getItem("day"));
close.addEventListener("click", closeModal);

//el evento tanto en el mes como en el dia tienen el id
function selectId(e) {
	let objectId = e.target.dataset.id;
	setEventsOnLocal(clickedDay, "objectId");
	localStorage.setItem("Id", JSON.stringify(objectId));
	showEvent();
}

function showEvent() {
	modal.style.display = "block";
	convert();
	chooseObject();
}

function closeModal() {
	modal.style.display = "none";
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

	console.log(test);
	if (test) {
		addNew(preSavedEvents, objectId);
		console.log("entre aca");
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

export { showEvent, selectId };
