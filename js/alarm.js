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

function alarmPopUp() {
	//modal, set time out

	let alarms = JSON.parse(localStorage.getItem("alarm-events"));

	//estoy recorriendo las alarmas ya presetedas
	//pero que lo haga solo una vez no todas las veces, on change?
	for (let index = 0; index < alarms.length; index++) {
		const element = alarms[index];

		//new Date(element.alarm_date).getTime() me da el objeto de la fecha de alarma que le paso por string
		//alarmtime to go es en miliseguddos
		let alarmTimeToGo;
		if (element.alarm_date) {
			alarmTimeToGo =
				new Date(element.alarm_date).getTime() - new Date(Date.now()).getTime();
		}
		//? Cada timeout arroja por defecto un timeout ID
		if (!element.timeOutAlarm) {
			element["timeoutID"] = setTimeout(modalAlarma, alarmTimeToGo);
		}
	}
	localStorage.setItem("alarm-events", JSON.stringify(alarms));
}

//*TODO delete arlarm
//*TODO si se elimina hay q poner el timeout a cero, CLEARTIMEOUT (id)
//*TODO habria q eliminar el objeto de alarm events del localstorage y tmb de los eventos
//* PROBAR ESTo
function deleteAlarm(eventoId) {
	//? Cada timeout arroja por defecto un timeout ID
	let alarms = JSON.parse(localStorage.getItem("alarm-events"));
	let indexAlarm;

	for (const iterator of alarms) {
		if (iterator.id == eventoId) {
			clearTimeout(iterator.timeoutID); //borro el contador del timeout
			iterator.timeoutID = ""; //borro el id del timeout
			indexAlarm = alarms.indexOf(iterator); //calculo en donde esta ese objeto
		}
	}
	alarms.splice(indexAlarm, 1); //borro la alarma de ese array
}

//*TODO MODAL O POPUP no se sabe aun
function modalAlarma() {
	console.log("Alarma sonando");
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
	alarmPopUp,
	deleteAlarm,
};
