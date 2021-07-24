import { doIfChecked } from "./modal.js";
import { doubleDigits, getFullDate } from "./tools.js";

//* DESPLIEGA EL TIMER DE LA ALARMA SOLO SI ESTA CHEQUEADA LA BOX DE SET ALARM

function setAlarmTimer() {
	doIfChecked(
		"input[name=alarm]",
		["input[name=alarm-start]", "label[for=alarm-start]"],
		true
	);
}

console.log(getFullDate(new Date(Date.now()), 0, 0, 0));

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

	//*MIN VALUE ---------------------------------------
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

function alarmPopUp() {}

function alarmObjectCreate() {}

/*   window.addEventListener('storage', () => {
   When local storage changes, dump the list to
   the console.
  console.log(JSON.parse(window.localStorage.getItem('sampleList')));
});
 */

export { setAlarmTimer, setAlarmLimits, alarmObjectCreate };
