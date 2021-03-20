fetch('http://localhost:3000/api/cameras/'+id).then(result => result.json()).then(camera=> {
	let buttonElt = document.getElementById('cart');
	buttonElt.addEventListener('click', function addToCart(event) {
		let cart = JSON.parse(localStorage.getItem('cart'));
		if(cart === null) {
			localStorage.setItem('cart', JSON.stringify([{
				name: `${camera.name}`,
				lens: `${camera.lens}`,
				id: `${camera._id}`,
			}]));
		} else {
			cart.push({
				name: `${camera.name}`,
				lens: `${camera.lens}`,
				id: `${camera._id}`,
			});
		}
	})
})

