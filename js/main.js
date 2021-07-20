import { navigate } from "./router.js";

var wrapper = document.getElementById("calendar");

navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };

// PRUEBAS

// Create a new Date with the actual month by default. Change the day of the month to the 1st day, and GET THE FIRST DAY OF THE MONTH
var month = new Date();

month.setDate(1);
var firstDay = month.getDay();

//
var lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
lastDay = lastDay.getDate();
console.log(lastDay);

if (firstDay == 0) firstDay = 7;
//console.log(firstDay);

var grid = document.querySelector(".month-grid");
grid.style.gridTemplateRows = `repeat(5, 6rem)`;

for (let i = 1; i <= lastDay; i++) {
  var newElement = document.createElement("div");
  newElement.innerHTML = i;
  grid.appendChild(newElement);
}

var testing = document.querySelector(".month-grid > div");
testing.style.gridColumnStart = firstDay;
