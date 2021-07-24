import { newEventsArray } from "./../events.js";

let Añadir = document.getElementById("uno");

let Quitar = document.getElementById("dos");

Añadir.addEventListener("click", añadirModal);
Quitar.addEventListener("click", quitarModal);

function añadirModal() {
  let modal = document.getElementById("showEventContainer");
  modal.classList.remove("hidden");
  modal.classList.add("show");
  Añadir.removeEventListener("click", añadirModal);
  añadir(5);
  console.log(newEventsArray);
}

function quitarModal() {
  let modal = document.getElementById("showEventContainer");
  modal.classList.add("hidden");
  modal.classList.remove("show");
  Añadir.addEventListener("click", añadirModal);
}

function añadir(i) {
  let title = document.getElementById("titleEvent").textContent;
  let titleContent = newEventsArray[i].title;
  document.getElementById("titleEvent").innerHTML = title + " " + titleContent;

  let startDate = document.getElementById("dateEvent").textContent;
  let startDateContent = newEventsArray[i].initial_date;
  document.getElementById("dateEvent").innerHTML =
    startDate + " " + startDateContent;

  let startTime = document.getElementById("timeEvent").textContent;
  let startTimeContent = newEventsArray[i].initial_time;
  document.getElementById("timeEvent").innerHTML =
    startTime + " " + startTimeContent;

  let alarm = document.getElementById("alarmEvent").textContent;
  let alarmContent = newEventsArray[i].alarm;
  document.getElementById("alarmEvent").innerHTML = alarm + " " + alarmContent;

  let expires = document.getElementById("expiresEvent").textContent;
  let expiresContent = newEventsArray[i].reminder;
  document.getElementById("expiresEvent").innerHTML =
    expires + " " + expiresContent;

  let note = document.getElementById("noteEvent").textContent;
  let noteContent = newEventsArray[i].description;
  document.getElementById("noteEvent").innerHTML = note + " " + noteContent;

  let type = document.getElementById("typeEvent").textContent;
  let typeContent = newEventsArray[i].type;
  document.getElementById("typeEvent").innerHTML = type + " " + typeContent;
}