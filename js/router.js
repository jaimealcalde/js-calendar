import {
  printMonth,
  setLimitDates,
  setStandardCalendar,
  hiddenMonthButtons,
} from "./views/month.js";
//import { printDay } from "./views/day.js";

function navigate() {
  if (location.hash == "") {
    printMonth();
    setLimitDates();
    setStandardCalendar();
    hiddenMonthButtons();
  } else if (location.hash == "day") {
    //printDay();
  }
}

export { navigate };
