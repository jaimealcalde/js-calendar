import { start } from "./main.js";
import { goToMonth } from "./router.js";
import { gotoDay, monthDisplay } from "./views/month.js";
import { modalReminder } from "./views/reminder-pop-up.js";

function doubleDigits(someNumber) {
	if (someNumber < 10) {
		someNumber = "0" + someNumber.toString();
	} else {
		someNumber = someNumber.toString();
	}

	return someNumber;
}

//getFullDate format "yyyy-mm-dd"
function getFullDate(date, years, months, days) {
	let splitDate = date.toLocaleString().split(",")[0].split("/");

	let thisYear = splitDate[2];
	let thisMonth = splitDate[1];
	let thisDay = splitDate[0];

	thisYear = (parseInt(thisYear) + years).toString();
	thisMonth = (parseInt(thisMonth) + months).toString();
	thisDay = (parseInt(thisDay) + days).toString();

	let fullDate =
		thisYear + "-" + doubleDigits(thisMonth) + "-" + doubleDigits(thisDay);

	return fullDate;
}
//despliega los campos solo cuando los botones estan chequeados.
//también los hace campos required
function doIfChecked(domElementCheck, elementToSHow, state) {
	if (state == true) {
		if (document.querySelector(domElementCheck).checked) {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.remove("label-hidden");
				document.querySelector(iterator).required = true;
			}
		} else {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.add("label-hidden");
				document.querySelector(iterator).required = false;
			}
		}
	} else if (state == false) {
		if (!document.querySelector(domElementCheck).checked) {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.remove("label-hidden");
			}
		} else {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).required = false;
				document.querySelector(iterator).checked = false;
				document.querySelector(iterator).classList.add("label-hidden");
			}
		}
	}
}

function setEventsOnLocal(events, key) {
	let eventString = JSON.stringify(events);
	if (!localStorage.getItem(key)) {
		localStorage.setItem(key, eventString);
	} else {
		events = JSON.parse(localStorage.getItem(key));
	}
	return events;
}

//Seteo contador de ids a 0
function setCounter() {
	if (!localStorage.getItem("idcounter")) {
		localStorage.setItem("idcounter", "0");
	}
}
//retorna el evento

function isExpiredEvent(evento) {
	//new Date(element.alarm_date).getTime() me da el objeto de la fecha de alarma que le paso por string
	//alarmtime to go es en miliseguddos

	let fullStartDate = evento.initial_date + "T" + evento.initial_time;
	let fullStartDateObject = new Date(fullStartDate);

	let timeToGo = fullStartDateObject - new Date(Date.now()).getTime();

	if (fullStartDateObject > new Date(Date.now())) {
		evento["is_expired"] = false;
		evento["timeoutExpiredID"] = setTimeout(function () {
			timeIsOut(evento);
		}, timeToGo);
	}
	return evento;
}

//* When event is expired
function timeIsOut(evento) {
	let eventsArray = JSON.parse(localStorage.getItem("new-event"));

	for (const iterator of eventsArray) {
		if (iterator.id == evento.id) {
			iterator.is_expired = true;
			clearTimeout(iterator.timeoutExpiredID);
			iterator.timeoutExpiredID = "";
		}
	}

	localStorage.setItem("new-event", JSON.stringify(eventsArray));
	modalReminder(evento.id);
}

function resetCalendar() {
	localStorage.clear();
	start();
	monthDisplay();
}

export {
	doubleDigits,
	getFullDate,
	doIfChecked,
	setEventsOnLocal,
	setCounter,
	isExpiredEvent,
	resetCalendar,
};
