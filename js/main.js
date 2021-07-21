import { navigate } from "./router.js";
import { events, setPreSaved } from "./events.js";

var wrapper = document.getElementById("calendar");

setPreSaved(events);

navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };
