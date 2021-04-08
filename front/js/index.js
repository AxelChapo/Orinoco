fetch('http://localhost:3000/api/cameras').then(result => result.json()).then(cameras => {
	let itemElt = document.getElementById('cameraPreview');
	console.log(cameras);
	cameras.forEach(camera => {
		itemElt.innerHTML += `<a class="item" href="./front/merch.html?id=${camera._id}"><div class="item__preview"><img class="item__preview--img" src="${camera.imageUrl}"/><div class="item__preview--desc"><h2 class="name">${camera.name}</h2><p class="price">${camera.price / 100}.00 €</p></div></div></a>`
	})
});