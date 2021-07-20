import { wrapper } from "../main.js";
import { templateMonth } from "./templates.js";

function printMonth() {
  //TODO borar contendio y borrar event listener

  //insert the template HTML in the main.html div calendar
  let templateThisMonth = templateMonth;
  wrapper.insertAdjacentHTML("beforeend", templateThisMonth);

  //clone the template of month
  let monthNode = document.getElementById("month").content;
  let copyNode = document.importNode(monthNode, true);

  //delete de template from the html
  wrapper.innerHTML = "";

  wrapper.appendChild(copyNode);
}

export { printMonth };
