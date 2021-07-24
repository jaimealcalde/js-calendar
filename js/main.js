import { navigate } from "./router.js";
import { setNewEvents, setPreSaved } from "./events.js";
import { setCounter } from "./functions.js";

var wrapper = document.getElementById("calendar");

setPreSaved();
setNewEvents();
setCounter();
navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };
