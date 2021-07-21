import { wrapper } from "../main.js";
import { header } from "./templates.js";
import { openModal } from "../modal.js";

function printHeader() {
  wrapper.innerHTML = "";
  //insert the template HTML in the main.html div calendar
  let templateHeader = header;
  wrapper.insertAdjacentHTML("beforeend", templateHeader);

  //clone the template of month
  let headerNode = document.getElementById("header").content;
  console.log(headerNode);
  let copyNode = document.importNode(headerNode, true);

  //delete de template from the html
  wrapper.lastChild.remove();
  wrapper.appendChild(copyNode);

  //button open modal
  document.getElementById("open-modal").addEventListener("click", openModal);
}

export { printHeader };
