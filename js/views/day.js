import { wrapper } from "../main.js";
import { templateDay } from "./templates.js";
import {
  getEventDay,
  getEventMonth,
  getEventYear,
  getEventTime,
  monthObject,
} from "./month.js";

function printDay(e) {
  var monthWrapper = document.querySelector(".month-wrapper");

  monthWrapper.innerHTML = "";

  let templateThisDay = templateDay;
  monthWrapper.insertAdjacentHTML("beforeend", templateThisDay);

  let dayNode = document.getElementById("day").content;
  let copyNode = document.importNode(dayNode, true);

  monthWrapper.lastChild.remove();

  monthWrapper.appendChild(copyNode);

  // GETDAY from Event
  var clickedDay = e.target;

  while (clickedDay.classList.value != "monthday") {
    clickedDay = clickedDay.parentElement;
  }

  clickedDay = clickedDay.dataset.action;

  loadDayEvents(
    JSON.parse(localStorage.getItem("pre-saved-events")),
    clickedDay
  );
  loadDayEvents(JSON.parse(localStorage.getItem("new-event")), clickedDay);
  setTimeTable();
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
      console.log(singleEvent);
      console.log(getEventTime(singleEvent.initial_time));
    }
  });
  function compare(a, b) {
    return getEventTime(a.initial_time) - getEventTime(b.initial_time);
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

      timeTable.appendChild(newEvent);
      newEvent.classList.add("automargin", "width100", "heigth100");

      //
      console.log(
        (newEvent.style.gridRowEnd =
          getEventTime(dailyEvents[i].final_time) / 10 + 1)
      );
      //

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

      backgroundFill.style.gridColumnStart = i + 3;
      backgroundFill.style.gridColumnEnd = 7;

      backgroundFill.style.gridRowStart = newEvent.style.gridRowStart;
      backgroundFill.style.gridRowEnd = newEvent.style.gridRowEnd;

      backgroundFill.style.zIndex = i;
    }
  }
}

export { printDay };
