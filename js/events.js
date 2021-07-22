let eventsArray = [
  {
    id: 0,
    title: "Soy un evento cargado por Paola Estefania",
    initial_date: new Date("July 25, 2021"),
    final_date: 0,
    initial_time: 0,
    final_time: 0,
    alarm: true,
    reminder: true,
    description: "",
    type: "holiday",
  },
  {
    id: 1,
    title: "HOLAA",
    initial_date: new Date("July 25, 2021"),
    final_date: 0,
    initial_time: 0,
    final_time: 0,
    alarm: true,
    reminder: true,
    description: "",
    type: "holiday",
  },
];

let newEventsArray = [];

console.log("estoy en events", newEventsArray);

function setPreSaved(eventsArray, newEventsArray) {
  console.log("estoy en set pre", newEventsArray);
  let eventString = JSON.stringify(eventsArray);

  //salva los pre cargados
  if (!localStorage.getItem("pre-saved-events")) {
    localStorage.setItem("pre-saved-events", eventString);
  }

  newEventsArray = JSON.parse(localStorage.getItem("new-event"));
}

export { eventsArray, setPreSaved, newEventsArray };
