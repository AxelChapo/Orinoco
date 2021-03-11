
fetch('http://localhost:3000/api/cameras').then(result => result.json()).then(cameras => {
	let itemElt = document.getElementById('cameraPreview');
	console.log(cameras);
	cameras.forEach(camera => {
		itemElt.innerHTML += `<div class="item"><img class="item__preview" src="${camera.imageUrl}"/><h2>${camera.name}</h2><p>${camera.price / 100}.00 €</div>`
	})
});
