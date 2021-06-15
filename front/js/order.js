let orderIdDisplay = () => {
	let orderIdElt = document.getElementById('orderId');
	orderIdElt.textContent = localStorage.getItem('orderId');
}
orderIdDisplay();