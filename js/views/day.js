import { wrapper } from "../main.js";
import { templateDay } from "./templates.js";

function printDay() {
  var monthWrapper = document.querySelector(".month-wrapper");

  monthWrapper.innerHTML = "";

  let templateThisDay = templateDay;
  monthWrapper.insertAdjacentHTML("beforeend", templateThisDay);

  let dayNode = document.getElementById("day").content;
  console.log(dayNode);
  let copyNode = document.importNode(dayNode, true);

  monthWrapper.lastChild.remove();

  monthWrapper.appendChild(copyNode);
}

export { printDay };
