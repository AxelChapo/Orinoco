let itemCountElt = document.getElementById('itemCount');
let cart = JSON.parse(localStorage.getItem('cart'))??[];
itemCountElt.textContent = cart.length;