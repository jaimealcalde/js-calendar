var templateMonth = `<template id="month">

		<div id="monthView" class="month-wrapper">
			<nav class="month-header">
				<div data-action="before-button"class="nav-button">Mes anterior</div>
				<div class="nav-title"><h4>Día - Mes - Año</h4><div><button id="goToday" class="go-today-button">Today</button></div></div>
				<div data-action="next-button" class="nav-button">Mes siguiente</div>
			</nav>
			<div class="month-weekdays">
				<h4 class="monday">Monday</h4>
				<h4>Tuesday</h4>
				<h4>Wednesday</h4>
				<h4>Thursday</h4>
				<h4>Friday</h4>
				<h4>Saturday</h4>
				<h4 class="sunday">Sunday</h4>
			</div>
			<div class="month-grid">
			</div>
		</div>
	</template>`;

var templateDay = `<template id="day">
				<div id="dayView" class="day-wrapper">
					<div class="day-wrapper__grid"></div>
				</div>
			</template>`;

var header = `<template id="header">
<div class="header__container" id="ButtonAddEvent">
<div><button id="reset-calendar" class="buttons-header reset-button">Reset</button></div>
<div><h1>dev.Calendar</h1></div>
<div><button id="open-modal" class="buttons-header new-event-button">New Event</button></div>
</div>

</template>`;

export { templateMonth, header, templateDay };
