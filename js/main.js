import { navigate } from "./router.js";
import { setNewEvents, setPreSaved } from "./events.js";
import { setCounter } from "./functions.js";
import { setMonth, monthDisplay } from "./views/month.js";

var wrapper = document.getElementById("calendar");

function start() {
	setPreSaved();
	setNewEvents();
	setCounter();
	setMonth();
	navigate();
	monthDisplay();
}

start();

window.addEventListener("hashchange", navigate);

export { wrapper, start };
