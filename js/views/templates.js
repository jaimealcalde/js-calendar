var templateMonth = `
	<template id="month">
		<div class="month-wrapper">
			<nav class="month-header">
				<div id="before-button"class="nav-button">Mes anterior</div>
				<div class="nav-title"><h4>Día - Mes - Año</h4></div>
				<div id="next-button" class="nav-button">Mes siguiente</div>
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
	</template>
`;

var day = ``;

export { templateMonth, day };
