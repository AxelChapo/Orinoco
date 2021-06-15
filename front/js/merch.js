//récupération de l'id de la caméra
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

//gestion de la quantité
let quantityElt = document.getElementById('quantity');
let qMinusElt = document.getElementById('qMinus');
let qPlusElt = document.getElementById('qPlus');

let quantityMinus = () => {
	if (quantityElt.value > quantityElt.min) {
		quantityElt.value --;
	}
	else {
		quantityElt.value = quantityElt.min;
	}
}
qMinusElt.addEventListener('click', event => {
	quantityMinus();
})

let quantityPlus = () => {
	if (parseInt(quantityElt.value) < parseInt(quantityElt.max)) {
		quantityElt.value ++;
	}
	else {
		quantityElt.value = quantityElt.max;
	}
}
qPlusElt.addEventListener('click', event => {
	quantityPlus();
})

//appel de l'API pour récupérer les données de la caméra
fetch('http://localhost:3000/api/cameras/'+id).then(result => result.json()).then(camera => {
	//affichage des éléments de la caméra
	let imgElt = document.getElementById('img');
	imgElt.setAttribute("src", camera.imageUrl);
	let dataElt = document.getElementById('data');
	dataElt.innerHTML = `<p class="product__description--title">${camera.name}</p>
						<div class="separation"></div>
						<p class="product__description--price">Prix: ${camera.price / 100}€</p>`
	let descElt = document.getElementById('txt');
	descElt.innerHTML = `<p>${camera.description}</p>`
	let lensElt = document.getElementById('lens-select')
	camera.lenses.forEach(lens => {
		lensElt.innerHTML += `<option value="${lens}">${lens}</option>`
	})
	let buttonElt = document.getElementById('cart');
	buttonElt.addEventListener('click', event => {
		let cameraInCart = false;
		cart.forEach((article, i) => {
			if (article.id == camera._id && article.lens == lensElt.value) {
				cart[i].quantity += parseInt(quantityElt.value);
				cameraInCart = true;
			}
		})
		if (!cameraInCart) {
			cart.push({
				name: camera.name,
				lens: lensElt.value,
				id: camera._id,
				img: camera.imageUrl,
				price: (camera.price / 100),
				quantity: parseInt(quantityElt.value),
			});
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		itemCountElt.textContent = cart.length;
	})
});