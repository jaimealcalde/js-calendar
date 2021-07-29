import { navigate } from "./router.js";
import { setNewEvents, setPreSaved } from "./events.js";
import { setCounter } from "./functions.js";
import { setTodayMonth, monthDisplay } from "./views/month.js";

var wrapper = document.getElementById("calendar");

function start() {
	setPreSaved();
	setNewEvents();
	setCounter();
	setTodayMonth();
}

start();
navigate();

/* setPreSaved();
setNewEvents();
setCounter();
setTodayMonth();

navigate();

function start() {} */

window.addEventListener("hashchange", navigate);

export { wrapper, start };
