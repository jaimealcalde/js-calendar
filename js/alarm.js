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
  console.log(new Date(Date.now()).toLocaleString());
  let minAlarmTimeHoursBadFormat = new Date(Date.now())
    .toLocaleString()
    .split(" ")[1];
  //.split(" ");

  //Separo hora de minutos
  minAlarmTimeHoursBadFormat = minAlarmTimeHoursBadFormat[1].split(":");

  let minAlarmTimeHours =
    minAlarmTimeHoursBadFormat[0] + ":" + minAlarmTimeHoursBadFormat[1];
  let minAlarmTimer = minAlarmTime + "T" + minAlarmTimeHours;

  //validacion para el max value
  document.getElementById("alarm-start").setAttribute("min", minAlarmTimer);
}

function alarmPopUp(evento) {
  //modal, set time out
  let alarms = JSON.parse(localStorage.getItem("alarm-events"));

  //estoy recorriendo las alarmas ya presetedas
  //pero que lo haga solo una vez no todas las veces, on change?
  for (const element of alarms) {
    if (element.id == evento.id) {
      //new Date(element.alarm_date).getTime() me da el objeto de la fecha de alarma que le paso por string
      //alarmtime to go es en miliseguddos
      let alarmTimeToGo;
      if (element.alarm_date) {
        element.expiredAlarm = false;
        alarmTimeToGo =
          new Date(element.alarm_date).getTime() -
          new Date(Date.now()).getTime();
      }
      //? Cada timeout arroja por defecto un timeout ID
      if (!element.timeoutID && alarmTimeToGo > 0) {
        console.log(
          alarmTimeToGo,
          "tiempo para que suene la alarma del evento con id: ",
          element.id
        );
        //puse 9000 que es 9 segs por probar
        element["timeoutID"] = setTimeout(function () {
          modalAlarma(element.id);
        }, alarmTimeToGo);
      }
    }
    localStorage.setItem("alarm-events", JSON.stringify(alarms));
  }
}

function deleteAlarm(eventoId) {
  //? Cada timeout arroja por defecto un timeout ID
  console.log(
    "borrando alarma del evento del array de alarmas porque expiro",
    eventoId
  );
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

  //EVENT LISTENER de que si algo esta expired que se ponga oscuro gris.
}

//*TODO MODAL O POPUP no se sabe aun
function modalAlarma(id) {
  console.log("Alarma sonando del obejto", id);

  //audio.play();
  deleteAlarm(id);
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
