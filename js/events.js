var events = [
  {
    id: 0,
    title: "Soy un evento cargado por Paola Estefania",
    initial_date: new Date("July 25, 2021 03:15:34"),
    final_date: 0,
    time: 0,
    alarm: true,
    reminder: true,
    description: "",
    type: "holiday",
  },
  {
    id: 1,
    title: "Soy un evento cargado por Antonio",
    initial_date: new Date("July 25, 2021 03:15:34"),
    final_date: 0,
    time: 0,
    alarm: true,
    reminder: true,
    description: "",
    type: "holiday",
  },
];

function setPreSaved(events) {
  var eventString = JSON.stringify(events);
  localStorage.setItem("pre-saved-events", eventString);
}

export { events, setPreSaved };
