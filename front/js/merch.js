let params = (new URL(document.location)).searchParams;
let id = params.get('id');
fetch('http://localhost:3000/api/cameras/'+id).then(result => result.json()).then(camera=> {
	let imgElt = document.getElementById('img');
	imgElt.innerHTML = `<img src="${camera.imageUrl}">`
	let dataElt = document.getElementById('data');
	dataElt.innerHTML = `<div class="product__description--title">
							<p>${camera.name}</p>
						</div>
						<p>${camera.price / 100}</p>`
	let descElt = document.getElementById('txt');
	descElt.innerHTML = `<p>${camera.description}</p>`
	let lensElt = document.getElementById('lens-select')
	camera.lenses.forEach(lens => {
		console.log(lens);
		lensElt.innerHTML += `<option value="">${lens}</option>`
	})
})