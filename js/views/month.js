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

var monthObject = { date: new Date() };

function setStandardCalendar() {
  // Create a new Date with the actual month by default. Change the day of the month to the 1st day, and GET THE FIRST DAY OF THE MONTH
  monthObject["firstDay"] = new Date(monthObject["date"]);

  monthObject["firstDay"].setDate(1);
  monthObject["firstDay"] = monthObject["firstDay"].getDay();

  // The last day of this month is equals to day 0 of the next month
  monthObject["lastDay"] = new Date(
    monthObject["date"].getFullYear(),
    monthObject["date"].getMonth() + 1,
    0
  );
  monthObject["lastDay"] = monthObject["lastDay"].getDate();

  if (monthObject["firstDay"] == 0) monthObject["firstDay"] = 7; // DAY 0 IS SUNDAY
  //monthObject["firstDay"] = firstDay;

  // Calculate Number of weeks

  if (monthObject["date"].getMonth() == 1) {
    if (monthObject["firstDay"] == 1 && monthObject["lastDay"] == 28) {
      monthObject["numberOfWeeks"] = 4;
    } else {
      monthObject["numberOfWeeks"] = 5;
    }
  } else if (monthObject["lastDay"] == 31) {
    if (monthObject["firstDay"] == 6 || monthObject["firstDay"] == 7) {
      monthObject["numberOfWeeks"] = 6;
    } else {
      monthObject["numberOfWeeks"] = 5;
    }
  } else if (monthObject["lastDay"] == 30 && monthObject["firstDay"] == 7) {
    monthObject["numberOfWeeks"] = 6;
  } else {
    monthObject["numberOfWeeks"] = 5;
  }

  let grid = document.querySelector(".month-grid");

  grid.style.gridTemplateRows = `repeat(${monthObject["numberOfWeeks"]}, 6rem)`;

  // Create days and append it to the grid
  for (let i = 1; i <= monthObject["lastDay"]; i++) {
    let newElement = document.createElement("div");
    newElement.innerHTML = `<div class="month-day"><p>${i}</p></div>`;
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
  navTitle.innerHTML = `${monthObject["date"].getDate()} ${
    monthNames[monthObject["date"].getMonth()]
  } of ${monthObject["date"].getFullYear()}`;

  var monthButtons = document.querySelectorAll(".nav-button");
  monthButtons.forEach((monthButton) => {
    monthButton.addEventListener("click", changeMonth);
  });
}

function changeMonth(e) {
  if (e.target.id == "next-button") {
    monthObject["date"].setMonth(monthObject["date"].getMonth() + 1);
    printMonth();
    setStandardCalendar();
  } else if (e.target.id == "before-button") {
    monthObject["date"].setMonth(monthObject["date"].getMonth() - 1);
    printMonth();
    setStandardCalendar();
    console.log(monthObject["date"]);
  }
}

export { printMonth, setStandardCalendar, changeMonth };
