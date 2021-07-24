//id de letras

import { setEventsOnLocal } from "./functions.js";

let eventsArray = [
	{
		id: "a",
		title: "Que lindo calendario",
		initial_date: "2021-07-31",
		final_date: 0,
		initial_time: 0,
		final_time: 0,
		alarm: true,
		reminder: true,
		description: "",
		type: "holiday",
	},
	{
		id: "b",
		allday: true,
		title: "hacemos muchs pruebas",
		initial_date: "2021-07-29",
		final_date: "",
		initial_time: "",
		final_time: "",
		alarm: false,
		alarm_date: "",
		reminder: false,
		description: "Costumbre",
		type: "holiday",
	},
	{
		id: "c",
		title: "Que susto se carga si",
		initial_date: "2021-07-30",
		final_date: 0,
		initial_time: 0,
		final_time: 0,
		alarm: true,
		reminder: true,
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

export { setPreSaved, setNewEvents };
//export { eventsArray, setPreSaved, setNewEvents };
