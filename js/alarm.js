import { getFullDate, doIfChecked } from "./functions.js";
import { modalAlarma } from "./views/pop-up.js";

function setAlarmTimer() {
	doIfChecked(
		"input[name=alarm]",
		["input[name=alarm-start]", "label[for=alarm-start]"],
		true
	);
}

function setAlarmLimits() {
	let maxAlarmTime =
		document.getElementById("event-start").value +
		"T" +
		document.getElementById("event-start-time").value;

	document.getElementById("alarm-start").setAttribute("max", maxAlarmTime);

	//format de set alarm: 2021-07-23T22:57
	let minAlarmTime = getFullDate(new Date(Date.now()), 0, 0, 0);
	let minAlarmTimeHoursBadFormat;

	if (new Date(Date.now()).toLocaleString().includes(",")) {
		minAlarmTimeHoursBadFormat = new Date(Date.now())
			.toLocaleString()
			.split(",")[1]
			.split(" ");
	} else {
		minAlarmTimeHoursBadFormat = new Date(Date.now())
			.toLocaleString()
			.split(" ")[1];
	}

	//Separo hora de minutos
	minAlarmTimeHoursBadFormat = minAlarmTimeHoursBadFormat[1].split(":");
	let minAlarmTimeHours =
		minAlarmTimeHoursBadFormat[0] + ":" + minAlarmTimeHoursBadFormat[1];

	let minAlarmTimer = minAlarmTime + "T" + minAlarmTimeHours;

	document.getElementById("alarm-start").setAttribute("min", minAlarmTimer);
}

function alarmTimeout(evento) {
	let alarms = JSON.parse(localStorage.getItem("alarm-events"));

	//estoy recorriendo las alarmas ya presetedas
	for (const element of alarms) {
		if (element.id == evento.id) {
			let alarmTimeToGo;
			//if (element.alarm_date) {
			element.expiredAlarm = false;
			alarmTimeToGo =
				new Date(element.alarm_date).getTime() - new Date(Date.now()).getTime();

			//* Cada timeout arroja por defecto un timeout ID
			if (!element.timeoutID && alarmTimeToGo > 0) {
				console.log(
					alarmTimeToGo,
					"Se estableció alarma para el evento con id: ",
					element.id
				);
				//puse 9000 que es 9 segs por probar
				/* 	element["timeoutID"] = setTimeout(function () {
					modalAlarma(element.id);
				}, 6000); */
				console.log("por setear alarma para el elemnto", element);
				element["timeoutID"] = setTimeout(function () {
					modalAlarma(element.id);
				}, alarmTimeToGo);
			}
		}
		localStorage.setItem("alarm-events", JSON.stringify(alarms));
	}
}

function deleteAlarm(eventoId) {
	//* Cada timeout arroja por defecto un timeout ID
	let alarms = JSON.parse(localStorage.getItem("alarm-events"));
	let indexAlarm;

	for (const iterator of alarms) {
		if (iterator.id == eventoId) {
			clearTimeout(iterator.timeoutID); //borro el contador del timeout
			iterator.timeoutID = ""; //borro el id del timeout
			iterator.alarm_date = "";
			indexAlarm = alarms.indexOf(iterator); //calculo en donde esta ese objeto
		}
	}
	alarms.splice(indexAlarm, 1); //borro la alarma de ese array

	localStorage.setItem("alarm-events", JSON.stringify(alarms)); //lo guardo en localstorage

	expiredAlarm(eventoId);
}

function expiredAlarm(id) {
	let eventsArray = JSON.parse(localStorage.getItem("new-event"));

	for (const iterator of eventsArray) {
		if (iterator.id == id) {
			iterator["expired-alarm"] = true;
			iterator.alarm = false;
		}
	}

	localStorage.setItem("new-event", JSON.stringify(eventsArray));
	//localStorage.removeItem("alarm-id-playing");
	//EVENT LISTENER de que si algo esta expired que se ponga oscuro gris.
}

//arma el objeto en localstorage de alarmas, si elevento.alarm==true
function arrayAlarmObjectCreate() {
	let eventsArray = JSON.parse(localStorage.getItem("new-event"));
	let alarmObjectsArray = [];

	for (const iterator of eventsArray) {
		if (iterator.alarm) {
			alarmObjectsArray.push(iterator);
		}
	}
	localStorage.setItem("alarm-events", JSON.stringify(alarmObjectsArray));
}

export {
	setAlarmTimer,
	setAlarmLimits,
	arrayAlarmObjectCreate,
	alarmTimeout,
	deleteAlarm,
};
