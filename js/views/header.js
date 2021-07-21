import { wrapper } from "../main.js";
import { header } from "./templates.js";

function printHeader() {

	//insert the template HTML in the main.html div calendar
	let templateHeader = header;
	wrapper.insertAdjacentHTML("beforeend", templateHeader);

	//clone the template of month
	let headerNode = document.getElementById("header").content;
	let copyNode = document.importNode(headerNode, true);

	//delete de template from the html
	wrapper.innerHTML = "";

	wrapper.appendChild(copyNode);
}

export { printHeader };