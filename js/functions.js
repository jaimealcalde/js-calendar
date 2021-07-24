function doubleDigits(someNumber) {
	if (someNumber < 10) {
		someNumber = "0" + someNumber.toString();
	} else {
		someNumber = someNumber.toString();
	}

	return someNumber;
}

//getFullDate format "yyyy-mm-dd"
function getFullDate(date, years, months, days) {
	let splitDate = date.toLocaleString().split(",")[0].split("/");

	let thisYear = splitDate[2];
	let thisMonth = splitDate[1];
	let thisDay = splitDate[0];

	thisYear = (parseInt(thisYear) + years).toString();
	thisMonth = (parseInt(thisMonth) + months).toString();
	thisDay = (parseInt(thisDay) + days).toString();

	let fullDate =
		thisYear + "-" + doubleDigits(thisMonth) + "-" + doubleDigits(thisDay);

	return fullDate;
}
//despliega los campos solo cuando los botones estan chequeados.
//también los hace campos required
function doIfChecked(domElementCheck, elementToSHow, state) {
	if (state == true) {
		if (document.querySelector(domElementCheck).checked) {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.remove("label-hidden");
				document.querySelector(iterator).required = true;
			}
		} else {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.add("label-hidden");
				document.querySelector(iterator).required = false;
			}
		}
	} else if (state == false) {
		if (!document.querySelector(domElementCheck).checked) {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.remove("label-hidden");
			}
		} else {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.add("label-hidden");
			}
		}
	}
}

function setEventsOnLocal(events, key) {
	let eventString = JSON.stringify(events);

	if (!localStorage.getItem(key)) {
		localStorage.setItem(key, eventString);
	} else {
		events = JSON.parse(localStorage.getItem(key));
	}

	return events;
}

//Seteo contador de ids a 0
function setCounter() {
	if (!localStorage.getItem("idcounter")) {
		localStorage.setItem("idcounter", "0");
	}
}

//chequea cambio sen local stroage
/*   window.addEventListener('storage', () => {
   When local storage changes, dump the list to
   the console.
  console.log(JSON.parse(window.localStorage.getItem('new-event')));
});
 */

export { doubleDigits, getFullDate, doIfChecked, setEventsOnLocal, setCounter };
