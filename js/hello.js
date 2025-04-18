  window.onload = function () {
	const container = document.getElementById("saludo");
	const spans = container.querySelectorAll("span");
	let index = 0;

	function mostrarSiguienteSaludo() {
		spans.forEach(span => span.classList.remove("visible"));
		spans[index].classList.add("visible");
		index = (index + 1) % spans.length;
	}

	mostrarSiguienteSaludo(); 
	setInterval(mostrarSiguienteSaludo, 340);
  };
