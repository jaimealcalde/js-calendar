import { wrapper } from "../main.js";
import { templateMonth } from "./templates.js";

function printMonth() {
  //TODO borar contendio y borrar event listener

  //insert the template HTML in the main.html div calendar
  let templateThisMonth = templateMonth;
  wrapper.insertAdjacentHTML("beforeend", templateThisMonth);

  //clone the template of month
  let monthNode = document.getElementById("month").content;
  let copyNode = document.importNode(monthNode, true);

  //delete de template from the html
  wrapper.innerHTML = "";

  wrapper.appendChild(copyNode);
}

let month = new Date();

function setStandardCalendar() {
  // Create a new Date with the actual month by default. Change the day of the month to the 1st day, and GET THE FIRST DAY OF THE MONTH

  let firstDay = new Date(month);
  firstDay.setDate(1);
  firstDay = firstDay.getDay();

  // The last day of this month is equals to day 0 of the next month
  let lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  lastDay = lastDay.getDate();

  if (firstDay == 0) firstDay = 7; // DAY 0 IS SUNDAY

  // Calculate Number of weeks
  let numberOfWeeks;
  if (month.getMonth() == 1) {
    if (firstDay == 1 && lastDay == 28) {
      numberOfWeeks = 4;
    } else {
      numberOfWeeks = 5;
    }
  } else if (lastDay == 31) {
    if (firstDay == 6 || firstDay == 7) {
      numberOfWeeks = 6;
    } else {
      numberOfWeeks = 5;
    }
  } else if (lastDay == 30 && firstDay == 7) {
    numberOfWeeks = 6;
  } else {
    numberOfWeeks = 5;
  }

  let grid = document.querySelector(".month-grid");

  grid.style.gridTemplateRows = `repeat(${numberOfWeeks}, 6rem)`;

  // Create days and append it to the grid
  for (let i = 1; i <= lastDay; i++) {
    let newElement = document.createElement("div");
    newElement.innerHTML = `<div class="month-day"><p>${i}</p></div>`;
    grid.appendChild(newElement);
  }

  // Set where starts the first element of the grid
  let gridStart = document.querySelector(".month-grid > div");
  gridStart.style.gridColumnStart = firstDay;

  // Event listeners for each Day
  /*
  let monthDays = document.querySelectorAll(".month-day");
  monthDays.forEach((monthDay) => {
    monthDay.addEventListener("click", printDay);
  });
  */

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
  navTitle.innerHTML = `${month.getDate()} ${
    monthNames[month.getMonth()]
  } of ${month.getFullYear()}`;
}

export { printMonth, setStandardCalendar };
