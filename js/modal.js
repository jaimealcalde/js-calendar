import { newEventsArray, setNewEvents } from "./events.js";
import { goToMonth } from "./router.js";
import { chargeMonthEvents } from "./views/month.js";

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
	goToMonth();
}

//when the modal opens
function openModal() {
	document.getElementById("new-event").style.display = "block";
	document
		.querySelector("input[name=alarm]")
		.addEventListener("change", setAlarmTimer);
}

function setAlarmTimer() {
	if (document.querySelector("input[name=alarm]").checked) {
		console.log("esta checked", true);
		console.log(document.querySelector("input[name=alarm-start]"));
		document
			.querySelector("input[name=alarm-start]")
			.classList.remove("label-hidden");
		document
			.querySelector("label[for=alarm-start]")
			.classList.remove("label-hidden");
	} else {
		document
			.querySelector("input[name=alarm-start]")
			.classList.add("label-hidden");
	}
}

function newEventCreate(e, idcounter, newEventsArray) {
	//el calendario debería borrarse los eventos en algun momento
	// final date por defecto mismo dia

	if (!localStorage.getItem("new-event")) {
		newEventsArray = [];
	} else {
		newEventsArray = JSON.parse(localStorage.getItem("new-event"));
	}

	console.log("entre aqui");
	e.preventDefault();

	let newEventObject = {
		id: idcounter,
		title: document.getElementById("title").value,
		initial_date: document.getElementById("event-start").value,
		final_date: 0,
		initial_time: document.getElementById("event-start-time").value,
		final_time: 0,
		alarm: document.getElementById("alarm").checked,
		alarm_date: "",
		reminder: document.getElementById("expired").checked,
		description: document.getElementById("notes").value,
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

	//chargeMonthEvents(setNewEvents(newEventsArray));

	closeModal();
}

export { openModal };
