var templateMonth = `<template id="month">
		<div class="month-wrapper">
			<nav class="month-header">
				<div data-action="before-button"class="nav-button">Mes anterior</div>
				<div class="nav-title"><h4>Día - Mes - Año</h4></div>
				<div data-action="next-button" class="nav-button">Mes siguiente</div>
			</nav>
			<div class="month-weekdays">
				<h4>Monday</h4>
				<h4>Tuesday</h4>
				<h4>Wednesday</h4>
				<h4>Thursday</h4>
				<h4>Friday</h4>
				<h4>Saturday</h4>
				<h4>Sunday</h4>
			</div>
			<div class="month-grid">
			</div>
		</div>
	</template>`;

var day = ``;

var header = `<template id="header">
<div class="header__container" id="ButtonAddEvent">
<div><h1>Calendar Name</h1></div>
<div><button id="open-modal" class="button__header--newEvent button__green">Add Event</button></div>
</div>
<div class="separator__header"></div>
</template>`;

export { templateMonth, day, header };
