import { wrapper } from "../main.js";
import { header } from "./templates.js";
import { goToCreateEvent } from "../router.js";
import { resetCalendar } from "../functions.js";

function printHeader() {
	wrapper.innerHTML = "";
	//insert the template HTML in the main.html div calendar
	let templateHeader = header;
	wrapper.insertAdjacentHTML("beforeend", templateHeader);

	//clone the template of month
	let headerNode = document.getElementById("header").content;

	let copyNode = document.importNode(headerNode, true);

	//delete de template from the html
	wrapper.lastChild.remove();
	wrapper.appendChild(copyNode);

	//button open modal
	document
		.getElementById("open-modal")
		.addEventListener("click", goToCreateEvent);

	window.addEventListener("keydown", pressEnter);
	//button reset

	document
		.getElementById("reset-calendar")
		.addEventListener("click", resetCalendar);
}

function pressEnter(e) {
	if (e.key == "Enter") {
		goToCreateEvent();
	}
}

export { printHeader, goToCreateEvent, pressEnter };
