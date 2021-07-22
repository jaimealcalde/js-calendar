import { newEventsArray } from "./events.js";

// Get the modal
let modal = document.getElementById("new-event");

//dif ids per object
let idcounter = 0;

//button click display none

document.getElementById("cancel-btn").addEventListener("click", closeModal);
document.getElementById("cross").addEventListener("click", closeModal);
document
	.getElementById("modal-form")
	.addEventListener("submit", newEventCreate);

function closeModal() {
	document.getElementById("new-event").style.display = "none";
}

//when the modal opens
function openModal() {
	document.getElementById("new-event").style.display = "block";

	let pruebaJsonString = localStorage.getItem("pre-saved-events");
	let pruebaJSobject = JSON.parse(pruebaJsonString);
	let pruebaJson = document.createTextNode(pruebaJSobject[0].title);
	document.getElementById("new-event").appendChild(pruebaJson); //Cada vez q apreto el bton se impirme una vez mas era a slo modo de prueba
}

function newEventCreate(e, idcounter, newEventsArray) {
	//el calendario debería borrarse los eventos en algun momento
	// final date por defecto mismo dia

	newEventsArray = JSON.parse(localStorage.getItem("new-event"));

	console.log("entre aqui");
	e.preventDefault();

	let newEventObject = {
		id: idcounter,
		title: document.getElementById("title").value,
		initial_date: document.getElementById("event-start").value,
		final_date: 0,
		initial_time: document.getElementById("event-start-time").value,
		final_time: 0,
		alarm: true,
		reminder: true,
		description: "",
		type: "holiday",
	};

	// final date por defecto mismo dia
	//  final time por defecto final del dia.

	newEventObject.final_date = newEventObject.initial_date;
	newEventObject.final_time = "23:59";

	idcounter += 1;

	newEventsArray.push(newEventObject);
	let newEventsString = JSON.stringify(newEventsArray);

	localStorage.setItem("new-event", newEventsString);

	//salva los eventos ya creados

	closeModal();
}

export { openModal };
