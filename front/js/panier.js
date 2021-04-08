//gestion du panier
let itemId = 0;
let cart = JSON.parse(localStorage.getItem('cart'));
let cartElt = document.getElementById('cart');
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
							<button class="cart__preview--delete"><i class="fas fa-trash-alt"></i></button>
						</div>
						<div class="separation"></div>`
})

let deleteElt = document.querySelector(".cart__preview--delete");
console.log(itemId, deleteElt, cart);
deleteElt.addEventListener('click', event => {
	localStorage.clear();
})