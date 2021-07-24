function doubleDigits(someNumber) {
	if (someNumber < 10) {
		someNumber = "0" + someNumber.toString();
	} else {
		someNumber = someNumber.toString();
	}

	return someNumber;
}

function getFullDate(date, years, months, days) {
	let splitDate = date.toLocaleString().split(",")[0].split("/");

	let thisYear = splitDate[2];
	let thisMonth = splitDate[1];
	let thisDay = splitDate[0];

	console.log(thisDay);
	thisYear = (parseInt(thisYear) + years).toString();
	thisMonth = (parseInt(thisMonth) + months).toString();
	thisDay = (parseInt(thisDay) + days).toString();

	let fullDate =
		thisYear + "-" + doubleDigits(thisMonth) + "-" + doubleDigits(thisDay);

	return fullDate;
}

function doIfChecked(domElementCheck, elementToSHow, state) {
	if (state == true) {
		if (document.querySelector(domElementCheck).checked) {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.remove("label-hidden");
			}
		} else {
			for (const iterator of elementToSHow) {
				document.querySelector(iterator).classList.add("label-hidden");
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

export { doubleDigits, getFullDate, doIfChecked };
