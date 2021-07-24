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
  console.log(clickedDay);

  loadDayEvents(JSON.parse(localStorage.getItem("pre-saved-events")));
  loadDayEvents(JSON.parse(localStorage.getItem("new-event")));
  setTimeTable();
}

function loadDayEvents(newEvent) {
  let eventsArray = [];
  newEvent.forEach((singleEvent) => {
    if (
      23 == getEventDay(singleEvent.initial_date) &&
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

    if (i <= 9) {
      newTime.textContent = `0${i}:00`;
    } else {
      newTime.textContent = `${i}:00`;
    }
    timeTable.appendChild(newTime);
    newTime.style.gridColumnStart = 1;
    newTime.style.gridColumnEnd = 1;
    newTime.style.gridRowStart = i * 60;
  }
}

function insertDayEvents(dailyEvents) {
  let timeTable = document.querySelector(".day-wrapper__grid");

  for (let i = 0; i < dailyEvents.length || i < 5; i++) {
    if (dailyEvents[i] != undefined) {
      let newEvent = document.createElement("div");

      timeTable.appendChild(newEvent);

      newEvent.style.gridColumnStart = i + 2;
      newEvent.style.gridColumnEnd = i + 2;

      newEvent.style.gridRowStart = getEventTime(dailyEvents[i].initial_time);
      newEvent.style.gridRowEnd = getEventTime(dailyEvents[i].final_time);

      newEvent.textContent = dailyEvents[i].title;
    }
  }
}

export { printDay };
