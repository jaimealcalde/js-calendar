import { navigate } from "./router.js";

var wrapper = document.getElementById("calendar");

navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };

// PRUEBAS

// Create a new Date with the actual month by default. Change the day of the month to the 1st day, and GET THE FIRST DAY OF THE MONTH
var month = new Date();

month.setMonth(0);

month.setDate(1);
var firstDay = month.getDay();

// The last day of this month is equals to day 0 of the next month
var lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
lastDay = lastDay.getDate();

if (firstDay == 0) firstDay = 7; // DAY 0 IS SUNDAY

// Calculate Number of weeks
var numberOfWeeks;
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

var grid = document.querySelector(".month-grid");

grid.style.gridTemplateRows = `repeat(${numberOfWeeks}, 6rem)`;

for (let i = 1; i <= lastDay; i++) {
  var newElement = document.createElement("div");
  newElement.innerHTML = `<div class="month-day"><p>${i}</p></div>`;
  grid.appendChild(newElement);
}

var testing = document.querySelector(".month-grid > div");
testing.style.gridColumnStart = firstDay;
