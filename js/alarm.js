//* DESPLIEGA EL TIMER DE LA ALARMA SOLO SI ESTA CHEQUEADA LA BOX DE SET ALARM
function setAlarmTimer() {
	if (document.querySelector("input[name=alarm]").checked) {
		document
			.querySelector("input[name=alarm-start]")
			.classList.remove("label-hidden");
		document
			.querySelector("label[for=alarm-start]")
			.classList.remove("label-hidden");
	} else {
		document
			.querySelector("input[name=alarm-start]")
			.classList.add("label-hidden");
		document
			.querySelector("label[for=alarm-start]")
			.classList.add("label-hidden");
	}
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

	//*MIN VALUE ---------------------------------------
	//format type: dd/mm/yyyy | format wanted: yyyy-mm-dd
	let minAlarmTimeBadFormat = new Date(Date.now())
		.toLocaleString()
		.split(",")[0]
		.split("/");

	let minAlarmTime =
		minAlarmTimeBadFormat[2] +
		"-" +
		minAlarmTimeBadFormat[1] +
		"-" +
		minAlarmTimeBadFormat[0];

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
	document.getElementById("alarm-start").setAttribute("MIN", minAlarmTimer);
}

//TODO : coger la hora de la alarma y con eso hacer un timeout con un opopup.
//TODO: hacer luegodel submit del modal que se ejecute el timeout

export { setAlarmTimer, setAlarmLimits };
