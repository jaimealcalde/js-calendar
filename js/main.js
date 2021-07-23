import { navigate } from "./router.js";
import {
	eventsArray,
	newEventsArray,
	setNewEvents,
	setPreSaved,
	setCounter,
} from "./events.js";

var wrapper = document.getElementById("calendar");

setPreSaved(eventsArray);
setNewEvents(newEventsArray);
setCounter();

navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };
