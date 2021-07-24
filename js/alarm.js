import { doIfChecked } from "./modal.js";
import { getFullDate } from "./functions.js";

//* DESPLIEGA EL TIMER DE LA ALARMA SOLO SI ESTA CHEQUEADA LA BOX DE SET ALARM

function setAlarmTimer() {
	doIfChecked(
		"input[name=alarm]",
		["input[name=alarm-start]", "label[for=alarm-start]"],
		true
	);
}

//Se pone maximo y minimo solo cunado cambia la fecha del form
/** ------- SETEAR MINIMO Y MAXIMO DE ALARMA EN EL FORM */
function setAlarmLimits() {
	//*MAX VALUE -------------------------------------
	let maxAlarmTime =
		document.getElementById("event-start").value +
		"T" +
		document.getElementById("event-start-time").value;

	//validacion para el max value
	document.getElementById("alarm-start").setAttribute("max", maxAlarmTime);

	//format de set alarm: 2021-07-23T22:57

	//*MIN VALUE -------------------------------------------
	//format type: dd/mm/yyyy | format wanted: yyyy-mm-dd

	let minAlarmTime = getFullDate(new Date(Date.now()), 0, 0, 0);

	//tenia un espacio delante la hora y se lo borroo con el .split(" ")
	let minAlarmTimeHoursBadFormat = new Date(Date.now())
		.toLocaleString()
		.split(",")[1]
		.split(" ");

	//Separo hora de minutos
	minAlarmTimeHoursBadFormat = minAlarmTimeHoursBadFormat[1].split(":");

	let minAlarmTimeHours =
		minAlarmTimeHoursBadFormat[0] + ":" + minAlarmTimeHoursBadFormat[1];
	let minAlarmTimer = minAlarmTime + "T" + minAlarmTimeHours;

	//validacion para el max value
	document.getElementById("alarm-start").setAttribute("min", minAlarmTimer);
}

//TODO : coger la hora de la alarma y con eso hacer un timeout con un popup.
//TODO: hacer luegodel submit del modal que se ejecute el timeout

function alarmPopUp() {
	//modal, set time out

	let alarms = JSON.parse(localStorage.getItem("alarm-events"));

	for (let index = 0; index < alarms.length; index++) {
		const element = alarms[index];

		//tratar por fecha
		//luego por hora, psar todo a minutos y luego el timeout

		let timer = new Date(Date.now()) - element.alarm_start;

		let timeOutAlarm = setTimeout(modalAlarma, timer);
		//si se elimina hay q poner el timeout a cero

		//if new Date (Date.now) == objeto.date
	}

	var a;
}

function modalAlarma() {}

function arrayAlarmObjectCreate() {
	let eventsArray = JSON.parse(localStorage.getItem("new-event"));
	console.log(eventsArray);
	let alarmObjectsArray = [];

	for (const iterator of eventsArray) {
		if (iterator.alarm) {
			alarmObjectsArray.push(iterator);
		}
	}

	localStorage.setItem("alarm-events", JSON.stringify(alarmObjectsArray));
}

export { setAlarmTimer, setAlarmLimits, arrayAlarmObjectCreate, alarmPopUp };
