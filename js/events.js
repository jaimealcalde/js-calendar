//id de letras

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

function setPreSaved(eventsArray) {
	let eventString = JSON.stringify(eventsArray);
	//salva los pre cargados
	if (!localStorage.getItem("pre-saved-events")) {
		localStorage.setItem("pre-saved-events", eventString);
	}
}

let newEventsArray = [];

function setNewEvents(newEventsArray) {
	let eventStringNew = JSON.stringify(newEventsArray);

	if (!localStorage.getItem("new-event")) {
		localStorage.setItem("new-event", eventStringNew);
	} else {
		newEventsArray = JSON.parse(localStorage.getItem("new-event"));
	}

	return newEventsArray;
}

//Seteo contador de ids a 0

function setCounter() {
	console.log("seteando contadores");
	if (!localStorage.getItem("idcounter")) {
		localStorage.setItem("idcounter", "0");
	}
}

export { eventsArray, setPreSaved, newEventsArray, setNewEvents, setCounter };
