import { printMonth, setStandardCalendar } from "./views/month.js";
//import { printDay } from "./views/day.js";

function navigate() {
  if (location.hash == "") {
    printMonth();
    setStandardCalendar();
  } else if (location.hash == "day") {
    //printDay();
  }
}

export { navigate };
