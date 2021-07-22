import { navigate } from "./router.js";
import { eventsArray, newEventsArray, setPreSaved } from "./events.js";

var wrapper = document.getElementById("calendar");

setPreSaved(eventsArray);

navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };
