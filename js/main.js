import { navigate } from "./router.js";
import { setNewEvents, setPreSaved } from "./events.js";
import { setCounter } from "./functions.js";

var wrapper = document.getElementById("calendar");

function start() {
	setPreSaved();
	setNewEvents();
	setCounter();
	navigate();
}

start();

window.addEventListener("hashchange", navigate);

export { wrapper, start };
