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

//button open modal
document.getElementById("open-modal").addEventListener("click", openModal);

function openModal() {
	document.getElementById("new-event").style.display = "block";
}
