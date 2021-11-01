/* Declarar llas variables para el contenedor padre */
var innerAnimatedImage = {
	element: document.querySelector(".elementsContainer"),/* Elemento a animar */
	cantidadHorizontal: 5,/* Cantidad de cuadros horizontales */
	cantidadVertical: 5,/* Cantidad de cuadros verticales */
	cantidadItems: 0,/* Total de cuadros que conforman la cuadricula */
	widthContainer: 0,/* Width del contenedor para la imagen */
	heightContainer: 0,/* Height del contenedor para la imagen */
	itemW: 0,/* Width para cada cuadro de la cuadricula */
	itemH: 0,/* Height para cada cuadro de la cuadricula */
}


/* Llenar datos segun el contnedor padre */
innerAnimatedImage.cantidadItems = innerAnimatedImage.cantidadHorizontal * innerAnimatedImage.cantidadVertical;
innerAnimatedImage.widthContainer = parseFloat(window.getComputedStyle(innerAnimatedImage.element).width)
innerAnimatedImage.heightContainer = parseFloat(window.getComputedStyle(innerAnimatedImage.element).height)
innerAnimatedImage.itemW = innerAnimatedImage.widthContainer / innerAnimatedImage.cantidadHorizontal
innerAnimatedImage.itemH = innerAnimatedImage.heightContainer / innerAnimatedImage.cantidadVertical


/* Crear los elementos div para manipularlos, van a tener como background la imagen animada  */
for (let x = 0; x < innerAnimatedImage.cantidadItems; x++) {
	div = document.createElement("div");
	div.classList.add("divNuevo")
	/* Se insertan los elementos al documento */
	innerAnimatedImage.element.insertAdjacentElement("beforeend", div);
}


/* Crear matriz para contener los elementos a animar */
var matriz = new Array(innerAnimatedImage.cantidadHorizontal);
for (let x = 0; x < matriz.length; x++) {
	matriz[x] = new Array(innerAnimatedImage.cantidadVertical);
}

/* Llenar la matriz con los elementos creados anteriormente */
var algo = Array.from(document.querySelectorAll(".divNuevo")), contador = 0;
for (let vert = 0; vert < innerAnimatedImage.cantidadVertical; vert++) {
	for (let hori = 0; hori < innerAnimatedImage.cantidadHorizontal; hori++) {
		matriz[vert][hori] = algo[contador];
		contador++;
	}
}





/* Dar propiedades de ancho y alto a los elementos, además de la posicion del background */

for (let vert = 0; vert < innerAnimatedImage.cantidadVertical; vert++) {
	for (let hori = 0; hori < innerAnimatedImage.cantidadHorizontal; hori++) {

		matriz[vert][hori].style.width = (innerAnimatedImage.itemW) + "px";
		matriz[vert][hori].style.height = (innerAnimatedImage.itemH) + "px";

		matriz[vert][hori].style.backgroundSize = innerAnimatedImage.widthContainer + "px";

		matriz[vert][hori].style.backgroundPositionX = "-" + (innerAnimatedImage.itemW * hori) + "px";
		matriz[vert][hori].style.backgroundPositionY = "-" + (innerAnimatedImage.itemH * vert) + "px";

	}
}


/* Animar los elementos creados, usando AnimeJS */
function animarVentana() {
	anime({
		targets: '.divNuevo',
		scale: [
			{ value: .1, easing: 'easeOutSine', duration: 500 },
			{ value: 1, easing: 'easeInOutQuad', duration: 1200 }
		],
		delay: anime.stagger(200, { grid: [innerAnimatedImage.cantidadHorizontal, innerAnimatedImage.cantidadVertical], from: 'center' })
	})
}


/* Botón para animar los elementos mediante la funcion animarVentana() */
buttonAnimar = document.getElementById("animar");
buttonAnimar.addEventListener("click", animarVentana, false)
window.addEventListener("load", animarVentana, false)
