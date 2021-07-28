import { wrapper } from "../main.js";
import { templateDay } from "./templates.js";
import {
	getEventDay,
	getEventMonth,
	getEventYear,
	getEventTime,
	monthObject,
	toObjectDate,
	monthNames,
	clearNavigationEventListeners,
	sumEventsArray,
} from "./month.js";
import { goToDayView, goToMonth } from "../router.js";
import { closeModal, selectId } from "./modalShowEvents.js";
import { setEventsOnLocal } from "../functions.js";
import { printHeader } from "./header.js";

function eventToColor(oneEvent, newEvent) {
	switch (oneEvent.type) {
		case "holiday":
			newEvent.classList.add("light-orange-event");
			break;
		case "birthday":
			newEvent.classList.add("light-pink-event");
			break;
		case "work":
			newEvent.classList.add("light-yellow-event");
			break;
		case "to-do":
			newEvent.classList.add("light-blue-event");
			break;
		case "health-care":
			newEvent.classList.add("dark-green-event");
			break;
		case "social-life":
			newEvent.classList.add("dark-orange-event");
			break;
		case "sports":
			newEvent.classList.add("light-green-event");
			break;
		default:
			break;
	}
}

function setDay(e) {
	var clickedDay = e.target.textContent;
	setEventsOnLocal(clickedDay, "day");
	localStorage.setItem("day", JSON.stringify(clickedDay));

	let dateChange = localStorage.getItem("month");
	dateChange = JSON.parse(dateChange);
	toObjectDate();
	monthObject.date.setDate(clickedDay);
	dateChange = JSON.stringify(monthObject);
	localStorage.setItem("month", dateChange);

	goToDayView();
}

function printTitle() {
	let title = document.querySelector("#day-title");
	title.textContent = `${
		monthNames[monthObject.date.getMonth()]
	} ${monthObject.date.getDate()} ${monthObject.date.getFullYear()}`;

	// Activate go to month button
	let toMonthButton = document.getElementById("display-month");
	toMonthButton.addEventListener("click", goToMonth);
}

function printDay() {
	clearNavigationEventListeners();
	window.addEventListener("keydown", keyDownOption);

	wrapper.innerHTML = "";
	printHeader();
	let templateThisDay = templateDay;
	wrapper.insertAdjacentHTML("beforeend", templateThisDay);

	let dayNode = document.getElementById("day").content;
	let copyNode = document.importNode(dayNode, true);

	wrapper.lastChild.remove();

	wrapper.appendChild(copyNode);

	// GETDAY from Event
	var clickedDay = JSON.parse(localStorage.getItem("day"));

	let arrayEventos = sumEventsArray();

	loadDayEvents(arrayEventos, clickedDay);
	let nextDay = document.querySelector('[data-action="next-day"]');
	let beforeDay = document.querySelector('[data-action="before-day"]');
	nextDay.addEventListener("click", goNextDay);
	beforeDay.addEventListener("click", goBeforeDay);
}

function removeDayEventListeners() {
	let nextDay = document.querySelector('[data-action="next-day"]');
	let beforeDay = document.querySelector('[data-action="before-day"]');
	nextDay.removeEventListener("click", goNextDay);
	beforeDay.removeEventListener("click", goBeforeDay);
	window.removeEventListener("keydown", keyDownOption);
	let newEvent = document.querySelectorAll(".event-title");
	if (newEvent) {
		for (const iterator of newEvent) {
			iterator.removeEventListener("click", selectId);
		}
	}
	let backgroundFill = document.querySelectorAll(".event-background");
	if (backgroundFill) {
		for (const iterator of backgroundFill) {
			iterator.removeEventListener("click", selectId);
		}
	}

	let toMonthButton = document.getElementById("display-month");
	toMonthButton.removeEventListener("click", goToMonth);
}

function loadDayEvents(newEvent, clickedDay) {
	let eventsArray = [];
	newEvent.forEach((singleEvent) => {
		let monthEvent = getEventMonth(singleEvent.initial_date) - 1;
		let monthEventFinal = getEventMonth(singleEvent.final_date) - 1;
		let yearEvent = getEventYear(singleEvent.initial_date);
		let monthDisplayedOnCalendar = monthObject.date.getMonth();
		let yearDisplayed = monthObject.date.getFullYear();

		if (monthEvent == monthDisplayedOnCalendar && yearEvent == yearDisplayed) {
			//todos los casos en que el evento debe ser agregado

			let dayEvent = getEventDay(singleEvent.initial_date);
			let finalDayEvent;
			if (monthEventFinal > monthDisplayedOnCalendar) {
				finalDayEvent = monthObject.numOfDays;
			} else {
				finalDayEvent = getEventDay(singleEvent.final_date);
			}

			if (dayEvent <= clickedDay && finalDayEvent >= clickedDay) {
				eventsArray.push(singleEvent);
			}
		}
	});
	function compare(a, b) {
		if (getEventTime(a.initial_time) == getEventTime(b.initial_time)) {
			return getEventTime(a.final_time) + getEventTime(b.final_time);
		} else {
			return getEventTime(a.initial_time) - getEventTime(b.initial_time);
		}
	}

	eventsArray.sort(compare);

	insertDayEvents(eventsArray);
}

function setTimeTable() {
	let timeTable = document.querySelector(".day-wrapper__grid");
	for (let i = 0; i < 24; i++) {
		let newTime = document.createElement("div");
		newTime.classList.add("day-time");

		if (i < 10) {
			newTime.textContent = `0${i}:00`;
		} else {
			newTime.textContent = `${i}:00`;
		}
		timeTable.appendChild(newTime);
		newTime.style.gridColumnStart = 1;
		newTime.style.gridColumnEnd = 1;

		if (i == 0) {
			newTime.style.gridRowStart = 1;
		} else {
			newTime.style.gridRowStart = i * 12 + 1;
		}
		newTime.style.gridRowEnd = parseInt(newTime.style.gridRowStart) + 12;
	}
}

function insertDayEvents(dailyEvents) {
	let timeTable = document.querySelector(".day-wrapper__grid");

	//Insert 5 events max
	for (let i = 0; i < dailyEvents.length && i < 5; i++) {
		if (dailyEvents[i] != undefined) {
			let newEvent = document.createElement("div");
			newEvent.dataset.id = dailyEvents[i].id;

			eventToColor(dailyEvents[i], newEvent);

			timeTable.appendChild(newEvent);
			newEvent.addEventListener("click", selectId);

			newEvent.classList.add("event-title");

			newEvent.style.gridColumnStart = i + 2;
			newEvent.style.gridColumnEnd = i + 2;

			if (dailyEvents[i].between_dates) {
				newEvent.style.gridRowStart = 1;
				if (
					dailyEvents[i].between_dates[dailyEvents[i].between_dates.length] -
						1 ==
					dailyEvents[i].final_date
				) {
					newEvent.style.gridRowEnd =
						Math.round(getEventTime(dailyEvents[i].final_time) / 5) + 1;
				}
				newEvent.style.gridRowEnd = 288;
			} else {
				newEvent.style.gridRowStart =
					getEventTime(dailyEvents[i].initial_time) / 5 + 1;
				newEvent.style.gridRowEnd =
					Math.round(getEventTime(dailyEvents[i].final_time) / 5) + 1;
			}
			if (dailyEvents[i].title.length > 15) {
				let shortTitle = dailyEvents[i].title.slice(0, 15);
				shortTitle = shortTitle + "...";
				newEvent.textContent = shortTitle;
			} else {
				newEvent.textContent = dailyEvents[i].title;
			}

			newEvent.style.zIndex = i;

			// Set full background color and z-index
			let backgroundFill = document.createElement("div");
			timeTable.appendChild(backgroundFill);
			backgroundFill.dataset.id = dailyEvents[i].id;
			backgroundFill.addEventListener("click", selectId);
			backgroundFill.classList.add("event-background");
			eventToColor(dailyEvents[i], backgroundFill);

			backgroundFill.style.gridColumnStart = i + 3;
			backgroundFill.style.gridColumnEnd = 8;

			backgroundFill.style.gridRowStart = newEvent.style.gridRowStart;
			backgroundFill.style.gridRowEnd = newEvent.style.gridRowEnd;

			backgroundFill.style.zIndex = i;
		}
	}
}

// CAMBIAR FECHA LOCAL A UN DIA MAS. ACTUALIZARLO EN LOCALSTORAGE

function keyDownOption(e) {
	switch (e.key) {
		case "ArrowLeft":
			goBeforeDay();
			break;
		case "ArrowRight":
			goNextDay();
			break;
		default:
			break;
	}
}

function goNextDay() {
	let day = localStorage.getItem("day");
	day = JSON.parse(day);
	day++;

	let dateChange = localStorage.getItem("month");
	dateChange = JSON.parse(dateChange);
	toObjectDate();
	monthObject.date.setDate(day);
	dateChange = JSON.stringify(monthObject);
	localStorage.setItem("month", dateChange);
	localStorage.setItem("day", monthObject.date.getDate());

	dayDisplay();
}

function goBeforeDay() {
	let day = localStorage.getItem("day");
	day = JSON.parse(day);
	day--;

	let dateChange = localStorage.getItem("month");
	dateChange = JSON.parse(dateChange);
	toObjectDate();
	monthObject.date.setDate(day);
	dateChange = JSON.stringify(monthObject);
	localStorage.setItem("month", dateChange);
	localStorage.setItem("day", monthObject.date.getDate());

	dayDisplay();
}

function hiddenDayNavButtons() {
	let limitDate = new Date(
		monthObject.date.getFullYear(),
		monthObject.date.getMonth() + 1,
		0
	);

	toObjectDate();
	if (
		monthObject.date.getMonth() == monthObject.limitMonth &&
		monthObject.date.getFullYear() == monthObject.limitYearAfter &&
		monthObject.date.getDate() == limitDate.getDate()
	) {
		document
			.querySelector('[data-action="next-day"]')
			.classList.add("invisible");
	} else if (
		monthObject.date.getMonth() == monthObject.limitMonth &&
		monthObject.date.getFullYear() == monthObject.limitYearBefore &&
		monthObject.date.getDate() == 1
	) {
		document
			.querySelector('[data-action="before-day"]')
			.classList.add("invisible");
	}
}

function dayDisplay() {
	printDay();
	hiddenDayNavButtons();
	printTitle();
	setTimeTable();
}

export { printDay, setDay, eventToColor, dayDisplay, removeDayEventListeners };
