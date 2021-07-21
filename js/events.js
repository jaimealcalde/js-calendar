var events = [
	{
		id: 0,
		title: "Soy un evento cargado por Paola Estefania",
		initial_date: "",
		final_date: 0,
		time: 0,
		alarm: true,
		reminder: true,
		description: "",
		type: "holiday",
	},
	{
		id: 1,
		title: "",
		initial_date: "",
		final_date: 0,
		time: 0,
		alarm: true,
		reminder: true,
		description: "",
		type: "holiday",
	},
];

function setPreSaved(events) {
	var eventString = JSON.stringify(events);
	localStorage.setItem("pre-saved-events", eventString);
}

export { events, setPreSaved };
