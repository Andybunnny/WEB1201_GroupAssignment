document.addEventListener("DOMContentLoaded", () => {
    // Dark Theme Toggle
    // Switches between light and dark themes and swaps the SVG icons
    const themeToggleBtns = document.querySelectorAll(".theme-toggle");
    const root = document.documentElement;

    const SUN_ICON = `assets/img/global/light_mode.svg`;
    const MOON_ICON = `assets/img/global/night_mode.svg`;

    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        themeToggleBtns.forEach((btn) => {
            btn.innerHTML = `<img src="${theme === "dark" ? MOON_ICON : SUN_ICON}" alt="${theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}" class="theme-icon" width="24" height="24">`;
            btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        });

        const darkSrc = "assets/img/granbakery_header_dark.png";
        const lightSrc = "assets/img/granbakery_header_final.png";
        document.querySelectorAll(".main-logo").forEach((img) => {
            img.src = theme === "dark" ? darkSrc : lightSrc;
        });
    };

    // Initialize to light theme on page load
    const savedTheme = localStorage.getItem("bakery-theme") || "light";
    applyTheme(savedTheme);

    themeToggleBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
            const next = current === "dark" ? "light" : "dark";
            localStorage.setItem("bakery-theme", next);
            applyTheme(next);
        });
    });

    // Sticky Header Logic
    // Makes the navigation bar stick to the top of the screen with a smooth animation after scrolling down.
    const headerWrapper = document.getElementById('mainHeader');

    if (headerWrapper) {
        const placeholder = document.createElement('div');
        headerWrapper.parentNode.insertBefore(placeholder, headerWrapper);

        window.addEventListener('scroll', () => {
            const headerHeight = headerWrapper.offsetHeight;

            if (window.scrollY > headerHeight + 30) {
                placeholder.style.height = `${headerHeight}px`;
                headerWrapper.classList.add('is-sticky');
            } else if (window.scrollY <= 10) {
                placeholder.style.height = '0px';
                headerWrapper.classList.remove('is-sticky');
            }
        });
    }
});

// Global Cart Logic 
// Data persistence & array manipulation via LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const countEl = document.getElementById("cartCount");
    if (countEl) {
        const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        countEl.textContent = totalQty;
    }
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ name: name, price: price, image: image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showCart(); 
}

function showCart() {
    updateCartCount();

    const itemsBox = document.getElementById("cartItems");
    const totalBox = document.getElementById("cartTotal");

    if (!itemsBox || !totalBox) return; 

    let total = 0;
    let htmlContent = "";

    if (cart.length === 0) {
        htmlContent = "<p style='text-align:center; padding:2rem;'>Your cart is empty.</p>";
    } else {
        cart.forEach((item, i) => {
            let qty = item.quantity || 1;
            let itemPrice = parseFloat(item.price) || 0;
            let subtotal = item.price * qty;
            total += subtotal;

            htmlContent += `
            <div class='cart-item'>
                <div class='col-product' style='display:flex; align-items:center;'>
                    <img src='${item.image || ""}' alt='${item.name}'>
                    <span style='font-weight: 500;'>${item.name}</span>
                </div>
                
                <div class='col-price'>
                    RM ${itemPrice.toFixed(2)}
                </div>
                
                <div class='col-qty qty-controls' style='min-height: 40px;'>
                    <button class='qty-btn' onclick='decreaseQty(${i})'>-</button>
                    <span style='margin: 0 10px; min-width: 16px; text-align: center; display: inline-block;'>${qty}</span>
                    <button class='qty-btn' onclick='increaseQty(${i})'>+</button>
                </div>
                
                <div class='col-total'>
                    RM ${subtotal.toFixed(2)}
                </div>
            </div>`;
        });
    }

    itemsBox.innerHTML = htmlContent;
    totalBox.innerHTML = `Total: RM ${total.toFixed(2)}`;
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

document.addEventListener("DOMContentLoaded", () => {
    showCart();
});