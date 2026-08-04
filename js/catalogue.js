// Best-selling Cookies (first 4 items)
const bestSellingCookies = [
  { id: 1, name: "Classic Choc Chip", category: "classic", price: 12.00, image: "assets/img/cookies/choco_chip.png" },
  { id: 2, name: "Double Chocolate", category: "classic", price: 14.00, image: "assets/img/cookies/double_choc.png" },
  { id: 3, name: "Snickerdoodle", category: "premium", price: 15.00, image: "assets/img/cookies/snickerdoodle.png" },
  { id: 4, name: "Gluten-Free Oats", category: "healthy", price: 13.50, image: "assets/img/cookies/oatmeal_raisin.png" }
];

// Best-selling Cakes (first 4 items)
const bestSellingCakes = [
  { id: 1, name: "Flourless Chocolate", category: "healthy", price: 65.00, image: "assets/img/cakes/flourless_choc.png" },
  { id: 2, name: "Chocolate Truffle", category: "premium", price: 75.00, image: "assets/img/cakes/choc_truffle.png" },
  { id: 3, name: "Chocolate Fudge", category: "classic", price: 60.00, image: "assets/img/cakes/choc_fudge.png" },
  { id: 4, name: "Vanilla Cheesecake", category: "premium", price: 69.00, image: "assets/img/cakes/vanilla_cheese.png" }
];

function createCard(item) {
  const cardHTML = `
    <article class="cookie-card">
      <img src="${item.image}" alt="Photo of ${item.name}">
      <h3>${item.name}</h3>
      <p class="cookie-category">Category: ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
      <p class="cookie-price">RM ${item.price.toFixed(2)}</p>
      <button aria-label="Add ${item.name} to cart" onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
    </article>
  `;
  return cardHTML;
}

function renderCookies() {
  const grid = document.getElementById('cookiesGrid');
  grid.innerHTML = bestSellingCookies.map(createCard).join('');
}

function renderCakes() {
  const grid = document.getElementById('cakesGrid');
  grid.innerHTML = bestSellingCakes.map(createCard).join('');
}

window.addEventListener('DOMContentLoaded', () => {
  renderCookies();
  renderCakes();
});
