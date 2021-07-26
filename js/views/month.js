import { wrapper } from "../main.js";
import { templateMonth } from "./templates.js";
import { printHeader } from "./header.js";
import { printDay } from "./day.js";

function printMonth() {
  //TODO borar contendio y borrar event listener

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

var monthObject = { date: new Date() };
let limitDate = new Date();

function setLimitDates() {
  monthObject["limitYearBefore"] = limitDate.getFullYear();
  monthObject["limitYearAfter"] = limitDate.getFullYear() + 1;
  monthObject["limitMonth"] = limitDate.getMonth();
}

function setStandardCalendar() {
  // Create a new Date with the actual month by default. Change the day of the month to the 1st day,
  //and GET THE FIRST DAY OF THE MONTH

  monthObject["firstDay"] = new Date(monthObject["date"]);

  monthObject["firstDay"].setDate(1);
  monthObject["firstDay"] = monthObject["firstDay"].getDay();

  // The last day of this month is equals to day 0 of the next month
  monthObject["numOfDays"] = new Date(
    monthObject["date"].getFullYear(),
    monthObject["date"].getMonth() + 1,
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
      newElement.innerHTML = `<div class="monthday--header"><div class="monthday--header__num">${i}</div><div class="monthday--header__plus">+</div></div><div class="month-event"></div><div class="month-event"></div><div class="month-event"></div>`;
    } else {
      newElement.innerHTML = `<div class="monthday--header"><div class="monthday--header__num">0${i}</div><div class="monthday--header__plus">+</div></div><div class="month-event"></div><div class="month-event"></div><div class="month-event"></div>`;
    }

    grid.appendChild(newElement);

    // Event listeners for each Day
    let headerNum = document.querySelector(
      `[data-action="${i}"] .monthday--header__num`
    );
    headerNum.addEventListener("click", printDay);
  }

  // Set where starts the first element of the grid
  let gridStart = document.querySelector(".month-grid > div");
  gridStart.style.gridColumnStart = monthObject["firstDay"];

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

  //const date = new Date(2009, 10, 10);  // 2009-11-10const month = date.toLocaleString('default', { month: 'long' });
  let navTitle = document.querySelector(".nav-title > h4");
  navTitle.innerHTML = `${
    monthNames[monthObject["date"].getMonth()]
  }  ${monthObject["date"].getFullYear()}`;

  var monthButtons = document.querySelectorAll(".nav-button");
  monthButtons.forEach((monthButton) => {
    monthButton.addEventListener("click", changeMonth);
  });
  chargeMonthEvents(JSON.parse(localStorage.getItem("pre-saved-events")));
  chargeMonthEvents(JSON.parse(localStorage.getItem("new-event")));
}

function getEventYear(eventDate) {
  let yearEvent = eventDate.split("-")[0];
  return yearEvent;
}
function getEventMonth(eventDate) {
  let monthEvent = eventDate.split("-")[1];
  return monthEvent;
}

function getEventDay(eventDate) {
  let dayEvent = eventDate.split("-")[2];

  return dayEvent;
}

function getEventTime(eventDate) {
  let timeEvent = eventDate.split(":");
  let minutes = parseInt(timeEvent[0]) * 60 + parseInt(timeEvent[1]);
  return minutes;
}

// Recorrer todos los dias del mes, voy a leer las posiciones que tengo para los eventos. Voy a buscar los eventos del dia. Ordeno de los eventos. Imprimir los eventos.

function chargeMonthEvents(newEventsArray) {
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
      if (
        getEventDay(newEvent.initial_date) == i &&
        getEventMonth(newEvent.initial_date) - 1 ==
          monthObject.date.getMonth() &&
        getEventYear(newEvent.initial_date) == monthObject.date.getFullYear()
      ) {
        eventArray.push(newEvent);

        function compare(a, b) {
          return getEventTime(a.initial_time) - getEventTime(b.initial_time);
        }
        eventArray.sort(compare);
      }
    });

    // 0 1 2 recorro los div, inserto los titulos.
    for (let i = 0; i < 3; i++) {
      if (eventArray[i] != undefined) {
        if (eventCells[i].textContent == "") {
          eventCells[i].dataset.action = eventArray[i].id;
          eventCells[i].textContent = eventArray[i].title;
        }
      }
    }
  }
}

// Hide the navigation arrows in each case to limit the user's navigation
function hiddenMonthButtons() {
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
function clearNavigationEventListeners() {
  var monthButtons = document.querySelectorAll(".nav-button");
  monthButtons.forEach((monthButton) => {
    monthButton.removeEventListener("click", changeMonth);
  });
}

function changeMonth(e) {
  if (e.target.dataset.action == "next-button") {
    if (
      monthObject.date.getFullYear() >= monthObject.limitYearAfter &&
      monthObject.date.getMonth() >= monthObject.limitMonth
    ) {
    } else {
      monthObject["date"].setMonth(monthObject["date"].getMonth() + 1);
      printMonth();
      clearNavigationEventListeners();
      setStandardCalendar();
      hiddenMonthButtons();
    }
  } else if (e.target.dataset.action == "before-button") {
    if (
      monthObject.date.getFullYear() <= monthObject.limitYearBefore &&
      monthObject.date.getMonth() <= monthObject.limitMonth
    ) {
    } else {
      monthObject["date"].setMonth(monthObject["date"].getMonth() - 1);
      printMonth();
      clearNavigationEventListeners();
      setStandardCalendar();
      hiddenMonthButtons();
    }
  }
}
function monthDisplay() {
  printMonth();
  clearNavigationEventListeners();
  setLimitDates();
  setStandardCalendar();
  hiddenMonthButtons();
}

export {
  monthDisplay,
  changeMonth,
  chargeMonthEvents,
  getEventDay,
  getEventMonth,
  getEventYear,
  getEventTime,
  monthObject,
};
