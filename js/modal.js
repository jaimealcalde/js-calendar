// Get the modal
var modal = document.getElementById("new-event");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

//button click display none

document.getElementById("cancel-btn").addEventListener("click", closeModal);
document.getElementById("cross").addEventListener("click", closeModal);
document.getElementById("enter-btn").addEventListener("click", closeModal);

function closeModal() {
	document.getElementById("new-event").style.display = "none";
}

//when the modal opens
function openModal() {
	document.getElementById("new-event").style.display = "block";

	let pruebaJsonString = localStorage.getItem("pre-saved-events");
	let pruebaJSobject = JSON.parse(pruebaJsonString);
	let pruebaJson = document.createTextNode(pruebaJSobject[0].title);
	document.getElementById("new-event").appendChild(pruebaJson); //Cada vez q apreto el bton se impirme una vez mas era a slo modo de prueba
}

export { openModal };
