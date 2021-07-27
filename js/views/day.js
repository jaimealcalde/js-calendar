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
  today,
} from "./month.js";
import { goToDayView } from "../router.js";

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
  let title = document.querySelector(".nav-title h4");
  title.textContent = `${
    monthNames[monthObject.date.getMonth()]
  } ${monthObject.date.getDate()} ${monthObject.date.getFullYear()}`;
}

function printDay() {
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

  loadDayEvents(
    JSON.parse(localStorage.getItem("pre-saved-events")),
    clickedDay
  );
  loadDayEvents(JSON.parse(localStorage.getItem("new-event")), clickedDay);

  let nextDay = document.querySelector('[data-action="next-day"]');
  let beforeDay = document.querySelector('[data-action="before-day"]');

  nextDay.addEventListener("click", goNextDay);
  beforeDay.addEventListener("click", goBeforeDay);
}

function loadDayEvents(newEvent, clickedDay) {
  let eventsArray = [];
  newEvent.forEach((singleEvent) => {
    if (
      clickedDay == getEventDay(singleEvent.initial_date) &&
      getEventMonth(singleEvent.initial_date) - 1 ==
        monthObject.date.getMonth() &&
      getEventYear(singleEvent.initial_date) == monthObject.date.getFullYear()
    ) {
      eventsArray.push(singleEvent);
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
    newTime.classList.add("automargin", "width100", "heigth100");

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
      newTime.style.gridRowStart = i * 6 + 1;
    }
    newTime.style.gridRowEnd = parseInt(newTime.style.gridRowStart) + 6;
  }
}

function insertDayEvents(dailyEvents) {
  let timeTable = document.querySelector(".day-wrapper__grid");

  //Insert 5 events max
  for (let i = 0; i < dailyEvents.length || i < 5; i++) {
    if (dailyEvents[i] != undefined) {
      let newEvent = document.createElement("div");
      newEvent.dataset.id = dailyEvents[i].id;

      eventToColor(dailyEvents[i], newEvent);

      timeTable.appendChild(newEvent);
      //newEvent.addEventListener("click", selectId);

      newEvent.classList.add(
        "event-title",
        "automargin",
        "width100",
        "height100"
      );

      newEvent.style.gridColumnStart = i + 2;
      newEvent.style.gridColumnEnd = i + 2;

      newEvent.style.gridRowStart =
        getEventTime(dailyEvents[i].initial_time) / 10 + 1;
      newEvent.style.gridRowEnd = Math.round(
        getEventTime(dailyEvents[i].final_time) / 10 + 1
      );

      newEvent.textContent = dailyEvents[i].title;

      newEvent.style.zIndex = i;

      // Set full background color and z-index
      let backgroundFill = document.createElement("div");
      timeTable.appendChild(backgroundFill);
      backgroundFill.dataset.id = dailyEvents[i].id;
      //backgroundFill.addEventListener("click", selectId);
      backgroundFill.classList.add("event-background");
      eventToColor(dailyEvents[i], backgroundFill);

      backgroundFill.style.gridColumnStart = i + 3;
      backgroundFill.style.gridColumnEnd = 7;

      backgroundFill.style.gridRowStart = newEvent.style.gridRowStart;
      backgroundFill.style.gridRowEnd = newEvent.style.gridRowEnd;

      backgroundFill.style.zIndex = i;
    }
  }
}

// CAMBIAR FECHA LOCAL A UN DIA MAS. ACTUALIZARLO EN LOCALSTORAGE

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

  console.log(dateChange);
  console.log(monthObject);

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

  console.log(dateChange);
  console.log(monthObject);

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

export { printDay, setDay, eventToColor, dayDisplay };
