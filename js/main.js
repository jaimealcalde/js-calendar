import { navigate } from "./router.js";

var wrapper = document.getElementById("calendar");

navigate();

window.addEventListener("hashchange", navigate);

export { wrapper };
