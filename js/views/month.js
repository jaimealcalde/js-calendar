import { wrapper } from "../main.js";
import { templateMonth } from "./templates.js";
import { printHeader } from "./header.js";
import { events } from "../events.js";

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

function setLimitDates() {
  monthObject["limitYearBefore"] = monthObject.date.getFullYear();
  monthObject["limitYearAfter"] = monthObject.date.getFullYear() + 1;
  monthObject["limitMonth"] = monthObject.date.getMonth();
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

    newElement.innerHTML = `<div class="monthday--header"><div class="monthday--header__num">${i}</div><div class="monthday--header__plus">+</div></div><div class="month-event" data-action="event1"></div><div class="month-event" data-action="event2"></div><div class="month-event" data-action="event3"></div>`;

    grid.appendChild(newElement);
  }

  // Set where starts the first element of the grid
  let gridStart = document.querySelector(".month-grid > div");
  gridStart.style.gridColumnStart = monthObject["firstDay"];

  // Event listeners for each Day
  /*
  let monthDays = document.querySelectorAll(".month-day");
  monthDays.forEach((monthDay) => {
    monthDay.addEventListener("click", printDay);
  });
  */

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

  let navTitle = document.querySelector(".nav-title > h4");
  navTitle.innerHTML = `${
    monthNames[monthObject["date"].getMonth()]
  }  ${monthObject["date"].getFullYear()}`;

  var monthButtons = document.querySelectorAll(".nav-button");
  monthButtons.forEach((monthButton) => {
    monthButton.addEventListener("click", changeMonth);
  });

  // Hide the month before arrow by default
  if (
    monthObject.date.getMonth() == monthObject.limitMonth &&
    monthObject.date.getFullYear() == monthObject.limitYearBefore
  ) {
    document
      .querySelector('[data-action="before-button"]')
      .classList.add("invisible");
  }
}

function chargeMonthEvents() {
  let eventArray = [];
  let cellsArray = [];

  for (let i = 0; i < events.length; i++) {
    if (events[i].initial_date.getMonth() == monthObject.date.getMonth()) {
      var eventCells = document.querySelectorAll(
        `[data-action="${events[i].initial_date.getDate()}"] > .month-event`
      );
      eventArray.push(events[i]);
    }
  }
  eventCells.forEach((eventCell) => {
    if (eventCell.textContent == "") {
      cellsArray.push(eventCell);
    }
  });
  console.log(eventArray);
  console.log(cellsArray);
  for (let i = 0; i < cellsArray.length; i++) {
    cellsArray[i].textContent = eventArray[i].title;
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

function changeMonth(e) {
  if (e.target.dataset.action == "next-button") {
    if (
      monthObject.date.getFullYear() >= monthObject.limitYearAfter &&
      monthObject.date.getMonth() >= monthObject.limitMonth
    ) {
    } else {
      monthObject["date"].setMonth(monthObject["date"].getMonth() + 1);
      printMonth();
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
      setStandardCalendar();
      hiddenMonthButtons();
    }
  }
}
function monthDisplay() {
  printMonth();
  setLimitDates();
  setStandardCalendar();
  chargeMonthEvents();
  hiddenMonthButtons();
}

export { monthDisplay, changeMonth };
