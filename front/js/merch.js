//récupération de l'id de la caméra
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

//gestion de la quantité
let quantityElt = document.getElementById('quantity');
let qMinusElt = document.getElementById('qMinus');
let qPlusElt = document.getElementById('qPlus');
qMinusElt.addEventListener('click', event => {
	if (quantityElt.value > quantityElt.min) {
		quantityElt.value --;
	}
	else {
		quantityElt.value = quantityElt.min;
	}
})
qPlusElt.addEventListener('click', event => {
	console.log(quantityElt.value, quantityElt.max, parseInt(quantityElt.value) < parseInt(quantityElt.max));
	if (parseInt(quantityElt.value) < parseInt(quantityElt.max)) {
		console.log(quantityElt.value);
		quantityElt.value ++;
	}
	else {
		console.log("test");
		quantityElt.value = quantityElt.max;
	}
})

//appel de l'API pour récupérer les données de la caméra
fetch('http://localhost:3000/api/cameras/'+id).then(result => result.json()).then(camera => {
	//affichage des éléments de la caméra
	let imgElt = document.getElementById('img');
	console.log(camera);
	imgElt.setAttribute("src", camera.imageUrl);
	let dataElt = document.getElementById('data');
	dataElt.innerHTML = `<p class="product__description--title">${camera.name}</p>
						<div class="separation"></div>
						<p class="product__description--price">Prix: ${camera.price / 100}€</p>`
	let descElt = document.getElementById('txt');
	descElt.innerHTML = `<p>${camera.description}</p>`
	let lensElt = document.getElementById('lens-select')
	camera.lenses.forEach(lens => {
		console.log(lens);
		lensElt.innerHTML += `<option value="${lens}">${lens}</option>`
	})
	//gestion du boutton ajouter au panier
	let itemCountElt = document.getElementById('itemCount');
	let itemCount = 0;
	itemCountElt.innerHTML = itemCount;
	let buttonElt = document.getElementById('cart');
	buttonElt.addEventListener('click', event => {
		console.log(camera, lensElt);
		let cart = JSON.parse(localStorage.getItem('cart'));
		if(cart === null) {
			console.log(camera);
			localStorage.setItem('cart', JSON.stringify([{
				name: camera.name,
				lens: lensElt.value,
				id: camera._id,
				img: camera.imageUrl,
				price: (camera.price / 100),
				quantity: parseInt(quantityElt.value),
			}]));
			itemCount ++;
			itemCountElt.innerHTML = itemCount;
		} 
		else {
			let cameraInCart = false;
			cart.forEach((article, i) => {
				console.log(article.lens, lensElt.value);
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
			itemCount ++;
			itemCountElt.innerHTML = itemCount;
		}
	})
})

