function updateCartCount() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      document.getElementById("cartCount").textContent = cart.length;
    }

    function addToCart(name, price, image) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name: name, price: price, image: image });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    }

    updateCartCount();