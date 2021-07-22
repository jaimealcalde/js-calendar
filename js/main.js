import { navigate } from "./router.js";
import {
	eventsArray,
	newEventsArray,
	setNewEvents,
	setPreSaved,
} from "./events.js";

var wrapper = document.getElementById("calendar");

setPreSaved(eventsArray);
setNewEvents(newEventsArray);

navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };
