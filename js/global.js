/* =========================================
   SHARED NAV BEHAVIOUR
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // ---------- Products Dropdown Menu ----------
    // Handles opening and closing the dropdown menu when clicking the button or clicking outside of it.
    const dropdown = document.querySelector(".dropdown");
    const dropdownBtn = dropdown?.querySelector(".nav-link-btn");

    const closeDropdown = () => dropdown?.setAttribute("data-open", "false");
    const openDropdown = () => dropdown?.setAttribute("data-open", "true");

    dropdownBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdown.getAttribute("data-open") === "true";
        isOpen ? closeDropdown() : openDropdown();
        dropdownBtn.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", (e) => {
        if (dropdown && !dropdown.contains(e.target)) closeDropdown();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDropdown();
    });

    // ---------- Mobile Navigation Toggle ----------
    // Toggles the mobile hamburger menu open and closed for smaller screen sizes.
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    navToggle?.addEventListener("click", () => {
        const isOpen = navLinks.getAttribute("data-mobile-open") === "true";
        navLinks.setAttribute("data-mobile-open", String(!isOpen));
        navToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    /* ==========================================
       JS FEATURE 4 - Dark Theme Toggle
       Switches between light and dark themes and swaps the SVG icons.
       ========================================== */
    const themeToggleBtns = document.querySelectorAll(".theme-toggle");
    const root = document.documentElement;

    const SUN_ICON = `<svg viewBox="0 0 24 24" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>`;
    const MOON_ICON = `<svg viewBox="0 0 24 24" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>`;

    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        themeToggleBtns.forEach((btn) => {
            btn.innerHTML = theme === "dark" ? SUN_ICON : MOON_ICON;
            btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        });
    };

    // Initialize to light theme on page load
    applyTheme("light");

    themeToggleBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
            const next = current === "dark" ? "light" : "dark";
            applyTheme(next);
        });
    });

    // ---------- Sticky Header Logic ----------
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

// ---------- Global Cart Logic ----------
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
            let subtotal = item.price * qty;
            total += subtotal;

            htmlContent += `
            <div class='cart-item'>
                <div class='col-product' style='display:flex; align-items:center;'>
                    <img src='${item.image || ""}' alt='${item.name}'>
                    <span style='font-weight: 500;'>${item.name}</span>
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