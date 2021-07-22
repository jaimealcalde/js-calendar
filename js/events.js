let eventsArray = [
	{
		id: 0,
		title: "Soy un evento cargado por Paola Estefania",
		initial_date: new Date("July 25, 2021"),
		final_date: 0,
		initial_time: 0,
		final_time: 0,
		alarm: true,
		reminder: true,
		description: "",
		type: "holiday",
	},
	{
		id: 1,
		title: "HOLAA",
		initial_date: new Date("July 25, 2021"),
		final_date: 0,
		initial_time: 0,
		final_time: 0,
		alarm: true,
		reminder: true,
		description: "",
		type: "holiday",
	},
];

function setPreSaved(eventsArra) {
	console.log("estoy en set pre-saved", newEventsArray);

	let eventString = JSON.stringify(eventsArray);
	//salva los pre cargados
	if (!localStorage.getItem("pre-saved-events")) {
		localStorage.setItem("pre-saved-events", eventString);
	}
}

let newEventsArray = [];
function setNewEvents(newEventsArray) {
	newEventsArray = JSON.parse(localStorage.getItem("new-event"));
	return newEventsArray;
}
newEventsArray = setNewEvents(newEventsArray);

export { eventsArray, setPreSaved, newEventsArray };
