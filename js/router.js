import {
  printMonth,
  setLimitDates,
  setStandardCalendar,
} from "./views/month.js";
//import { printDay } from "./views/day.js";

function navigate() {
  if (location.hash == "") {
    printMonth();
    setLimitDates();
    setStandardCalendar();
  } else if (location.hash == "day") {
    //printDay();
  }
}

export { navigate };
