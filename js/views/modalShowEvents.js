let Añadir = document.getElementById('uno');

let Quitar = document.getElementById('dos');

Añadir.addEventListener("click", añadirModal);
Quitar.addEventListener("click", quitarModal);

function añadirModal(){
    let modal = document.getElementById('showEventContainer');
    modal.classList.remove('hidden');
    modal.classList.add('show');
}

function quitarModal(){
    let modal = document.getElementById('showEventContainer');
    modal.classList.add('hidden');
    modal.classList.remove('show');
}