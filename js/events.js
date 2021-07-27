//id de letras

import { deleteAlarm } from "./alarm.js";
import { setEventsOnLocal } from "./functions.js";
import { closeModal } from "./views/modalShowEvents.js";

let eventsArray = [
	{
		id: "ny",
		allday: true,
		title: "New year",
		initial_date: "2021-01-00",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "kd",
		allday: true,
		title: "Kings Day",
		initial_date: "2021-01-06",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "sf",
		allday: true,
		title: "Sait Friday",
		initial_date: "2021-04-02",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "em",
		allday: true,
		title: "Easter monday",
		initial_date: "2021-04-05",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "ld",
		allday: true,
		title: "Labor Day",
		initial_date: "2021-05-01",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "sj",
		allday: true,
		title: "Saint john's day",
		initial_date: "2021-06-24",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "cd",
		allday: true,
		title: "Catalonia day",
		initial_date: "2021-09-11",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "hs",
		allday: true,
		title: "National holiday of Spain",
		initial_date: "2021-10-12",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "as",
		allday: true,
		title: "All Saints",
		initial_date: "2021-11-01",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "cd",
		allday: true,
		title: "Day of the Constitution",
		initial_date: "2021-12-06",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "ic",
		allday: true,
		title: "Immaculate Conception's Day",
		initial_date: "2021-12-08",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "ch",
		allday: true,
		title: "Christmas",
		initial_date: "2021-12-24",
		final_date: 0,
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
	{
		id: "sh",
		allday: true,
		title: "Summer holidays",
		initial_date: "2021-08-16",
		between_dates: [
			"2021-08-17",
			"2021-08-18",
			"2021-08-19",
			"2021-08-20",
			"2021-08-21",
			"2021-08-22",
			"2021-08-23",
			"2021-08-24",
			"2021-08-25",
			"2021-08-26",
			"2021-08-27",
			"2021-08-28",
			"2021-08-29",
			"2021-08-30",
			"2021-08-31",
		],
		final_date: "2021-08-31",
		initial_time: "00:00",
		final_time: "23:59",
		alarm: false,
		reminder: false,
		description: "",
		type: "holiday",
	},
];

function setPreSaved() {
	setEventsOnLocal(eventsArray, "pre-saved-events");
}

let newEventsArray = [];

function setNewEvents() {
	setEventsOnLocal(newEventsArray, "new-event");
}

let objectId = JSON.parse(localStorage.getItem("objectId"));
function editEvent() {
	//Carga el modal de new event con los values del objeto
}

let exp = /^[a-z]+$/i;
//retorna cual array estoy trabajando
function chooseObject() {
	objectId = JSON.parse(localStorage.getItem("objectId"));
	let events;
	let key;
	const test = exp.test(objectId);

	if (test) {
		key = "pre-saved-events";
		events = JSON.parse(localStorage.getItem(key));
	} else {
		key = "new-event";
		events = JSON.parse(localStorage.getItem(key));
	}
	return [events, key];
}

function deleteEvent() {
	objectId = JSON.parse(localStorage.getItem("objectId"));
	//borra el evento segun su id de la lista de eventos y sus alarmas si tiene
	let variables = chooseObject();
	let indexEvent;
	let key = variables[1];
	let events = variables[0];

	for (const iterator of events) {
		if (iterator.id == objectId) {
			if (iterator.alarm) {
				deleteAlarm(objectId);
			}
			indexEvent = events.indexOf(iterator); //calculo en donde esta ese objeto
			events.splice(indexEvent, 1); //borro el evento de ese array
		}
	}
	console.log("guardando en local storage nuevo array de eventos", events, key);
	localStorage.setItem(key, JSON.stringify(events)); //lo guardo en localstorage
	closeModal();
}

export { setPreSaved, setNewEvents, editEvent, deleteEvent };
