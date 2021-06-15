let deleteElt = document.getElementById('empty');
let formElt = document.getElementById('form');
let nameElt = document.getElementById('nameCustomer');
let firstNameElt = document.getElementById('firstName');
let emailElt = document.getElementById('email');
let addressElt = document.getElementById('address');
let cityElt = document.getElementById('city');
let zipCodeElt = document.getElementById('zipCode');
let submitElt = document.getElementById('submit');
let cartElt = document.getElementById('cart');
let totalElt = document.getElementById('totalPrice');
let productsId = [];

//gestion de l'affichage du panier:
let cartDisplay = () => {
	let itemId = 0;
	let totalPrice = 0;
	if (cart.length == 0) {
		deleteCart();
	}
	else {
		cart.forEach(camera => {
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
			//affichage prix total
			totalElt.innerHTML = "<p class='cart__totalPrice'>Prix total: "+totalPrice+"€</p>"
		})
	}
}
cartDisplay();

//bouton vider le panier:
let deleteCart = () => {
	localStorage.clear();
	cartElt.innerHTML = "<h4 class='dampedCart'>Votre panier est vide.</h4>";
	deleteElt.setAttribute("hidden", "");
	formElt.style.display = "none";
	totalElt.style.display = "none";
}
deleteElt.addEventListener('click', event => {
	deleteCart();
})


/**gestion du formulaire:
vérification des données:**/
let fields = [
	{field: nameElt,
	regex: /^[a-zA-Z\u00C0-\u017F\-\']+$/,
	matching: false},
	{field: firstNameElt,
	regex: /^[a-zA-Z\u00C0-\u017F\-\']+$/,
	matching: false},
	{field: emailElt,
	regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
	matching: false}, 
	{field: cityElt,
	regex: /^[a-zA-Z\u00C0-\u017F\-\']+$/,
	matching: false}, 
	{field: zipCodeElt,
	regex: /^[0-9]*$/,
	matching: false}];

let formValidation = () => {
	fields.forEach(field => {
		field.field.addEventListener('input', event => {
			if (field.field.value.match(field.regex)) {
				field.field.style.borderColor = "#2eb52a";
				field.matching = true;
			}
			else {
				field.field.style.borderColor = "#db1f1f";
			}
		})
	})
}
formValidation();

//gestion du button envoyer:
let submitButton = () => {
		let match = true;
		fields.forEach(field => {
			if (!field.matching) {
				match = false;
			}
		})
		let customersDatas = {
			lastName: nameElt.value,
			firstName: firstNameElt.value,
			email: emailElt.value,
			address: addressElt.value,
			city: cityElt.value,
			zipCode: zipCodeElt.value,
		};
		if (match) {
			fetch('http://localhost:3000/api/cameras/order', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({contact: customersDatas, products: productsId}),
			}).then(response => response.json()).then(response => {
				localStorage.removeItem('cart');
				let orderId = response.orderId;
				localStorage.setItem('orderId', orderId);
				location.replace("./order.html");
			});
		}
}

submitElt.addEventListener('click', event => {
	event.preventDefault();
	submitButton();
})