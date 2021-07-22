import { navigate } from "./router.js";
import { eventsArray, newEventsArray, setPreSaved } from "./events.js";

var wrapper = document.getElementById("calendar");

setPreSaved(eventsArray, newEventsArray);

navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };
