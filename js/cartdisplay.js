

// grab the cart list from localStorage (or start empty if nothing saved)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// this function draws the cart items on the page
function showCart() {
  let itemsBox = document.getElementById("cartItems");
  let totalBox = document.getElementById("cartTotal");

  if (cart.length === 0) {
    itemsBox.innerHTML = "<p>Your cart is empty, start adding some delicious items!</p>";
    totalBox.innerHTML = "";
    document.getElementById("checkoutBtn").style.display = "none";
    return;
  }

  let total = 0;
  itemsBox.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    let qty = cart[i].quantity || 1;
    let subtotal = cart[i].price * qty;
    total = total + subtotal;

    itemsBox.innerHTML += "<div class='cart-item'>" +
      "<div class='col-product' style='display:flex; align-items:center;'>" +
        "<img src='" + (cart[i].image || "") + "'>" +
        "<span>" + cart[i].name + "</span>" +
      "</div>" +
      "<div class='col-price'>$" + cart[i].price.toFixed(2) + "</div>" +
      "<div class='col-qty qty-controls'>" +
        "<button onclick='decreaseQty(" + i + ")'>-</button>" +
        "<span>" + qty + "</span>" +
        "<button onclick='increaseQty(" + i + ")'>+</button>" +
      "</div>" +
      "<div class='col-total'>$" + subtotal.toFixed(2) +
        "<button class='remove-x' onclick='removeItem(" + i + ")'>✕</button>" +
      "</div>" +
    "</div>";
  }

  totalBox.innerHTML = "Total: $" + total.toFixed(2);
}

function increaseQty(i) {
  cart[i].quantity = (cart[i].quantity || 1) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function decreaseQty(i) {
  let qty = cart[i].quantity || 1;
  if (qty > 1) {
    cart[i].quantity = qty - 1;
  } else {
    cart.splice(i, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function checkout() {
  localStorage.removeItem("cart");
  cart = [];
  document.getElementById("cartItems").innerHTML = "";
  document.getElementById("cartTotal").innerHTML = "";
  document.getElementById("checkoutBtn").style.display = "none";
  document.getElementById("tableHeaders").style.display = "none";
  document.getElementById("orderMessage").innerHTML = "Order placed, Thank you for your purchase!";
}

showCart();