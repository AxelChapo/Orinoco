//appel des variables pour le panier:
let cartElt = document.getElementById('cart');
let cart = JSON.parse(localStorage.getItem('cart'))??[];
let deleteElt = document.getElementById('empty');
let productsId = [];
let itemId = 0;
let totalPrice = 0;
let totalElt = document.getElementById('totalPrice');

//appel des variable pour le formulaire:
let formElt = document.getElementById('form');
let nameElt = document.getElementById('nameCustomer');
let firstNameElt = document.getElementById('firstName');
let emailElt = document.getElementById('email');
let addressElt = document.getElementById('address');
let cityElt = document.getElementById('city');
let zipCodeElt = document.getElementById('zipCode');
let submitElt = document.getElementById('submit');
let validDatas= false;

//gestion de l'affichage du panier:
console.log(cart.length);
if (cart.length == 0) {
	cartElt.innerHTML = "<h4 class='dampedCart'>Votre panier est vide.</h4>";
	deleteElt.setAttribute("hidden", "");
	formElt.style.display = "none";
	totalElt.style.display = "none";
}
else {
	cart.forEach(camera => {
		console.log(itemId, camera);
		itemId ++;
		for (let i=0; i < camera.quantity; i++) {
			productsId.push(camera.id);	
		}
		cartElt.innerHTML += `<div id="${itemId}" class="cart__preview">
								<img src="${camera.img}" alt="miniature du produit" class="cart__preview--img">
								<div class="cart__preview--data">
									<h4>${camera.name}</h4>
									<p>${camera.price * camera.quantity} €</p>
								</div>
								<div class="cart__preview--data">
									<p>Lentille: ${camera.lens}</p>
									<p>Quantité: ${camera.quantity}</p>
								</div>
							</div>
							<div class="separation"></div>`
		totalPrice += (camera.price * camera.quantity);
		console.log(totalPrice, camera.price*camera.quantity);
		//affichage prix total
		totalElt.innerHTML = "<p class='cart__totalPrice'>Prix total: "+totalPrice+"€</p>"
	})
}

//bouton vider le panier:
deleteElt.addEventListener('click', event => {
	localStorage.removeItem('cart');
	cartElt.innerHTML = "<h4 class='dampedCart'>Votre panier est vide.</h4>"
	formElt.style.display = "none";
	totalElt.style.display = "none";
	deleteElt.setAttribute("hidden", "");
})

/**gestion du formulaire:
vérification des données:**/
nameElt.addEventListener('input', event => {
	if (nameElt.value.match(/^[a-zA-Z\u00C0-\u017F\-\']+$/)) {
		nameElt.style.borderColor = "#2eb52a";
		validDatas = true;
	}
	else {
		nameElt.style.borderColor = "#db1f1f";
		validDatas = false;
	}
})

firstNameElt.addEventListener('input', event => {
	if (firstNameElt.value.match(/^[a-zA-Z\u00C0-\u017F\-\']+$/)) {
		firstNameElt.style.borderColor = "#2eb52a";
		validDatas = true;
	}
	else {
		firstNameElt.style.borderColor = "#db1f1f";
		validDatas = false;
	}
})

emailElt.addEventListener('input', event => {
	if (emailElt.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
		emailElt.style.borderColor = "#2eb52a";
		validDatas = true;
	}
	else {
		emailElt.style.borderColor = "#db1f1f";
		validDatas = false;
	}
})

cityElt.addEventListener('input', event => {
	if (cityElt.value.match(/^[a-zA-Z\u00C0-\u017F\-\']+$/)) {
		cityElt.style.borderColor = "#2eb52a";
		validDatas = true;
	}
	else {
		cityElt.style.borderColor = "#db1f1f";
		validDatas = false;
	}
})

zipCodeElt.addEventListener('input', event => {
	if (zipCodeElt.value.match(/^[0-9]*$/)) {
		zipCodeElt.style.borderColor = "#2eb52a";
		validDatas = true;
	}
	else {
		zipCodeElt.style.borderColor = "#db1f1f";
		validDatas = false; 
	}
})

//gestion du button envoyer:
submitElt.addEventListener("click", event => {
	event.preventDefault();
	console.log(nameElt, firstNameElt, emailElt, addressElt);
	let customersData = {
		lastName: nameElt.value,
		firstName: firstNameElt.value,
		email: emailElt.value,
		address: addressElt.value,
		city: cityElt.value,
		zipCode: zipCodeElt.value,
	};
	console.log(customersData);
	fetch('http://localhost:3000/api/cameras/order', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({contact: customersData, products: productsId}),
	}).then(response => {
		location
	});

	let orderId = order_id;
	//4- récupérer une réponse (liste des produits, n° de commande)
})