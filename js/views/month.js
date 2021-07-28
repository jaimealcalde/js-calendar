import { wrapper } from "../main.js";
import { templateMonth } from "./templates.js";
import { printHeader } from "./header.js";
import { setDay, eventToColor, removeDayEventListeners } from "./day.js";
import { setEventsOnLocal } from "../functions.js";
import { selectId } from "./modalShowEvents.js";

function printMonth() {
	//TODO borar contendio y borrar event listener
	wrapper.innerHTML = "";
	printHeader();
	//insert the template HTML in the main.html div calendar
	let templateThisMonth = templateMonth;
	wrapper.insertAdjacentHTML("beforeend", templateThisMonth);

	//clone the template of month
	let monthNode = document.getElementById("month").content;
	let copyNode = document.importNode(monthNode, true);

	//delete de template from the html

	wrapper.lastChild.remove();

	wrapper.appendChild(copyNode);
}

let today = new Date();

// Transform the getMonth() into month name to use it in the title
let monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
function setMonth() {
	var monthObject = { date: new Date(Date.now()) };
	setEventsOnLocal(monthObject, "month");
}

let monthObject = JSON.parse(localStorage.getItem("month"));

function toObjectDate() {
	if (monthObject) {
		if (typeof monthObject.date == "string") {
			let date = monthObject.date.split("T")[0];
			monthObject["date"] = new Date(date);
		}
	}
}

function setLimitDates() {
	monthObject["limitYearBefore"] = today.getFullYear();
	monthObject["limitYearAfter"] = today.getFullYear() + 1;
	monthObject["limitMonth"] = today.getMonth();
	localStorage.setItem("month", JSON.stringify(monthObject));
}

function setStandardCalendar() {
	toObjectDate();
	// Create a new Date with the actual month by default. Change the day of the month to the 1st day,
	//and GET THE FIRST DAY OF THE MONTH

	monthObject["firstDay"] = new Date(monthObject["date"]);

	monthObject["firstDay"].setDate(1);
	monthObject["firstDay"] = monthObject["firstDay"].getDay();

	// The last day of this month is equals to day 0 of the next month
	monthObject["numOfDays"] = new Date(
		monthObject.date.getYear(),
		monthObject.date.getMonth() + 1,
		0
	);
	monthObject["numOfDays"] = monthObject["numOfDays"].getDate();

	if (monthObject["firstDay"] == 0) monthObject["firstDay"] = 7; // DAY 0 IS SUNDAY

	// Calculate Number of weeks
	if (monthObject["date"].getMonth() == 1) {
		if (monthObject["firstDay"] == 1 && monthObject["numOfDays"] == 28) {
			monthObject["numberOfWeeks"] = 4;
		} else {
			monthObject["numberOfWeeks"] = 5;
		}
	} else if (monthObject["numOfDays"] == 31) {
		if (monthObject["firstDay"] == 6 || monthObject["firstDay"] == 7) {
			monthObject["numberOfWeeks"] = 6;
		} else {
			monthObject["numberOfWeeks"] = 5;
		}
	} else if (monthObject["numOfDays"] == 30 && monthObject["firstDay"] == 7) {
		monthObject["numberOfWeeks"] = 6;
	} else {
		monthObject["numberOfWeeks"] = 5;
	}

	let grid = document.querySelector(".month-grid");
	grid.style.gridTemplateRows = `repeat(${monthObject["numberOfWeeks"]}, 6rem)`;

	// Create days and append it to the grid
	for (let i = 1; i <= monthObject["numOfDays"]; i++) {
		let newElement = document.createElement("div");

		newElement.classList.add("monthday");
		newElement.dataset.action = `${i}`;

		if (i >= 10) {
			newElement.innerHTML = `<div class="monthday--header"><div class="monthday--header__plus">+</div><div class="monthday--header__num">${i}</div></div><div id="event-month"class="month-event"></div><div id="event-month" class="month-event"></div><div id="event-month" class="month-event"></div>`;
		} else {
			newElement.innerHTML = `<div class="monthday--header"><div class="monthday--header__plus">+</div><div class="monthday--header__num">0${i}</div></div><div id="event-month"class="month-event"></div><div id="event-month" class="month-event"></div><div id="event-month" class="month-event"></div>`;
		}

		grid.appendChild(newElement);

		// Event listeners for each Day
		let headerNum = document.querySelector(
			`[data-action="${i}"] .monthday--header`
		);
		headerNum.addEventListener("click", setDay);
	}

	// Set where starts the first element of the grid
	let gridStart = document.querySelector(".month-grid > div");
	gridStart.style.gridColumnStart = monthObject["firstDay"];

	//const date = new Date(2009, 10, 10);  // 2009-11-10const month = date.toLocaleString('default', { month: 'long' });
	let navTitle = document.querySelector(".nav-title > h4");
	navTitle.innerHTML = `${
		monthNames[monthObject["date"].getMonth()]
	}  ${monthObject["date"].getFullYear()}`;

	var monthButtons = document.querySelectorAll(".nav-button");
	monthButtons.forEach((monthButton) => {
		monthButton.addEventListener("click", changeMonth);
	});

	document.getElementById("goToday").addEventListener("click", gotoDay);
	window.addEventListener("keydown", pressSpace);

	let arrayEventos = sumEventsArray();
	chargeMonthEvents(arrayEventos);
}

function pressSpace(e) {
	if (e.key == " ") {
		gotoDay();
	}
}

function sumEventsArray() {
	let arrayPreEvents = JSON.parse(localStorage.getItem("pre-saved-events"));
	let arrayNewEvents = JSON.parse(localStorage.getItem("new-event"));
	if (arrayNewEvents.length > 0) {
		for (const events of arrayNewEvents) {
			arrayPreEvents.push(events);
		}
	}
	return arrayPreEvents;
}

function getEventYear(eventDate) {
	let yearEvent = eventDate.split("-")[0];
	return yearEvent;
}
function getEventMonth(eventDate) {
	let monthEvent = eventDate.split("-")[1];
	if (monthEvent[0] == 0) {
		monthEvent = monthEvent[1];
	}
	return monthEvent;
}

function getEventDay(eventDate) {
	let dayEvent = eventDate.split("-")[2];
	if (dayEvent[0] == 0) {
		dayEvent = dayEvent[1];
	}

	return dayEvent;
}

function getEventTime(eventDate) {
	let timeEvent = eventDate.split(":");
	let minutes = parseInt(timeEvent[0]) * 60 + parseInt(timeEvent[1]);
	return minutes;
}

// Recorrer todos los dias del mes, voy a leer las posiciones que tengo para los eventos. Voy a buscar los eventos del dia. Ordeno de los eventos. Imprimir los eventos.

function chargeMonthEvents(newEventsArray) {
	toObjectDate();

	//Recorre todas las celdas y selecciona los contenedores de los eventos
	for (let i = 1; i <= monthObject.numOfDays; i++) {
		var eventArray = [];
		//array de 3 div para publicar eventos
		var eventCells = document.querySelectorAll(
			`[data-action="${i}"] > .month-event`
		);

		//los que coincida el mes con el mes corriente
		//y os pongo dentro del evento array
		newEventsArray.forEach((newEvent) => {
			// i es el dia

			let monthEvent = getEventMonth(newEvent.initial_date) - 1;
			let yearEvent = getEventYear(newEvent.initial_date);
			let monthDisplayedOnCalendar = monthObject.date.getMonth();
			let yearDisplayed = monthObject.date.getFullYear();

			if (
				monthEvent == monthDisplayedOnCalendar &&
				yearEvent == yearDisplayed
			) {
				//todos los casos en que el evento debe ser agregado

				let dayEvent = getEventDay(newEvent.initial_date);
				let finalDayEvent = getEventDay(newEvent.final_date);

				if (dayEvent <= i && finalDayEvent >= i) {
					eventArray.push(newEvent);
				}
				function compare(a, b) {
					if (getEventTime(a.initial_time) == getEventTime(b.initial_time)) {
						return getEventTime(a.final_time) - getEventTime(b.final_time);
					} else {
						return getEventTime(a.initial_time) - getEventTime(b.initial_time);
					}
				}

				eventArray.sort(compare);
			}
		});
		/* newEventsArray.forEach((newEvent) => {
			if (newEvent.between_dates) {
				newEvent.between_dates.forEach((everyDate) => {
					if (
						getEventDay(everyDate) == i &&
						getEventMonth(everyDate) - 1 == monthObject.date.getMonth() &&
						getEventYear(everyDate) == monthObject.date.getFullYear()
					) {
						eventArray.unshift(newEvent);
					}
				});
			}
		}); */

		//eventarray es array con eventos a insertar
		// 0 1 2 recorro los div, inserto los titulos.
		for (let i = 0; i < 3; i++) {
			if (eventArray[i] != undefined) {
				if (eventCells[i].textContent == "") {
					eventCells[i].dataset.id = eventArray[i].id;
					eventToColor(eventArray[i], eventCells[i]);

					// Limit title characters for events to 13 on the month View
					if (eventArray[i].title.length > 13) {
						let shortTitle = eventArray[i].title.slice(0, 13);
						shortTitle = shortTitle + "...";
						eventCells[i].textContent = shortTitle;
					} else {
						eventCells[i].textContent = eventArray[i].title;
					}
				}
			}
		}

		let plusSelector = document.querySelector(
			`[data-action="${i}"]  .monthday--header__plus`
		);
		if (eventArray.length < 4) {
			plusSelector.classList.add("invisible");
		} else if (plusSelector.classList.contains("invisible")) {
			plusSelector.classList.remove("invisible");
		}
	}
}

// Hide the navigation arrows in each case to limit the user's navigation
function hiddenMonthButtons() {
	toObjectDate();
	if (monthObject.date.getMonth() == monthObject.limitMonth) {
		if (monthObject.date.getFullYear() == monthObject.limitYearAfter) {
			document
				.querySelector('[data-action="next-button"]')
				.classList.add("invisible");
		} else if (monthObject.date.getFullYear() == monthObject.limitYearBefore) {
			document
				.querySelector('[data-action="before-button"]')
				.classList.add("invisible");
		}
	}
}

function addEventListenerDays() {
	//Eventlisteners para cada evento, para abrir la vista evento

	let eventosMes = document.querySelectorAll("#event-month");
	for (const eventos of eventosMes) {
		eventos.addEventListener("click", selectId);
	}
	window.addEventListener("keydown", changeMonth);
}
//erase navigationEventSLiteners
function clearNavigationEventListeners() {
	var monthButtons = document.querySelectorAll(".nav-button");
	if (monthButtons) {
		monthButtons.forEach((monthButton) => {
			monthButton.removeEventListener("click", changeMonth);
		});
	}

	let goToDayVar = document.getElementById("goToday");
	if (goToDayVar) {
		goToDayVar.removeEventListener("click", gotoDay);
	}

	let eventosMes = document.querySelectorAll("#event-month");
	if (eventosMes) {
		for (const eventos of eventosMes) {
			eventos.removeEventListener("click", selectId);
		}
	}

	window.removeEventListener("keydown", pressSpace);

	window.removeEventListener("keydown", changeMonth);
}

function changeMonth(e) {
	if (e.target.dataset.action == "next-button" || e.key == "ArrowRight") {
		toObjectDate();
		if (
			monthObject.date.getFullYear() >= monthObject.limitYearAfter &&
			monthObject.date.getMonth() >= monthObject.limitMonth
		) {
		} else {
			monthObject["date"].setMonth(monthObject["date"].getMonth() + 1);
			localStorage.setItem("month", JSON.stringify(monthObject));
			clearNavigationEventListeners();
			printMonth();
			setStandardCalendar();
			hiddenMonthButtons();
			todayRed();
			addEventListenerDays();
		}
	} else if (
		e.target.dataset.action == "before-button" ||
		e.key == "ArrowLeft"
	) {
		if (
			monthObject.date.getFullYear() <= monthObject.limitYearBefore &&
			monthObject.date.getMonth() <= monthObject.limitMonth
		) {
		} else {
			monthObject["date"].setMonth(monthObject["date"].getMonth() - 1);
			localStorage.setItem("month", JSON.stringify(monthObject));
			clearNavigationEventListeners();
			printMonth();
			setStandardCalendar();
			hiddenMonthButtons();
			todayRed();
			addEventListenerDays();
		}
	}
}

function todayRed() {
	//pone en rojo el dia de hoy
	let elementosDia = document.querySelectorAll(".monthday");

	for (let index = 0; index < elementosDia.length; index++) {
		const days = elementosDia[index];

		//si año y mes están ok
		if (
			new Date(JSON.parse(localStorage.getItem("month")).date).getMonth() ==
				new Date(Date.now()).getMonth() &&
			new Date(JSON.parse(localStorage.getItem("month")).date).getFullYear() ==
				new Date(Date.now()).getFullYear()
		) {
			if (days.dataset.action == new Date().getDate()) {
				days.firstChild.classList.add("goToday-header");
				days.firstChild.lastChild.classList.add("goToday-num");
			} else {
				if (days.firstChild.classList.contains("goToday-header")) {
					days.firstChild.classList.remove("goToday-header");
					days.firstChild.lastChild.classList.remove("goToday-num");
				}
			}
		}
	}
}

function monthDisplay() {
	clearNavigationEventListeners();
	if (document.getElementById("dayView")) {
		removeDayEventListeners();
	}
	printMonth();
	setStandardCalendar();
	setLimitDates();
	hiddenMonthButtons();
	todayRed();
	addEventListenerDays();
}

function gotoDay() {
	monthObject.date = new Date(Date.now());
	localStorage.setItem("month", JSON.stringify(monthObject));
	clearNavigationEventListeners();
	printMonth();
	setStandardCalendar();
	hiddenMonthButtons();
	todayRed();
	addEventListenerDays();
}

export {
	monthDisplay,
	changeMonth,
	chargeMonthEvents,
	getEventDay,
	getEventMonth,
	getEventYear,
	getEventTime,
	gotoDay,
	setMonth,
	monthObject,
	toObjectDate,
	monthNames,
	today,
	sumEventsArray,
	clearNavigationEventListeners,
};
