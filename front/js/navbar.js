let cart = JSON.parse(localStorage.getItem('cart'))??[];
let itemCountElt = document.getElementById('itemCount');
itemCountElt.textContent = cart.length;