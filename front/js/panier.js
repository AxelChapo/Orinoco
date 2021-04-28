//gestion du panier
let itemId = 0;
let cart = JSON.parse(localStorage.getItem('cart'))??[];
let cartElt = document.getElementById('cart');
console.log(cart.length);
if (cart.length == 0) {
	cartElt.innerHTML = "<h4 class='dampedCart'>Votre panier est vide.</h4>"
}
else {
	cart.forEach(camera => {
		console.log(itemId, camera);
		itemId ++;
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
	})
}

let deleteElt = document.getElementById('empty');
deleteElt.addEventListener('click', event => {
	localStorage.removeItem('cart');
	cartElt.innerHTML = "<h4 class='dampedCart'>Votre panier est vide.</h4>"
})

let submitElt = document.getElementById('submit');
submitElt.addEventListener("click", event => {
	event.preventDefault();

	//1- vérifié la validité des champs
	//2- préparer la requête
	//3- faire la requête post (envoyer l'objet id camera et contact)
	//4- récupérer une réponse (liste des produits, n° de commande)
})

let 