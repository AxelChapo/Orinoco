let orderIdElt = document.getElementById('orderId');
orderIdElt.textContent = localStorage.getItem('orderId');
let customersDataElt = document.getElementById('customersData');
console.log(JSON.parse(localStorage.getItem('customersDatas')), orderId);
customersDataElt.textContent = JSON.parse(localStorage.getItem('customersDatas'));