// 1. The Data Array (Minimum 8 items for the assignment)
const cakesDataset = [
  { id: 1, name: "Flourless Chocolate", category: "healthy", price: 65.00, image: "assets/img/cakes/flourless_choc.png" },
  { id: 2, name: "Chocolate Truffle", category: "premium", price: 75.00, image: "assets/img/cakes/choc_truffle.png" },
  { id: 3, name: "Chocolate Fudge", category: "classic", price: 60.00, image: "assets/img/cakes/choc_fudge.png" },
  { id: 4, name: "Vanilla Cheesecake", category: "premium", price: 69.00, image: "assets/img/cakes/vanilla_cheese.png" },
  { id: 5, name: "Avocado Lime", category: "healthy", price: 66.00, image: "assets/img/cakes/avocado_lime.png" },
  { id: 6, name: "Matcha Tiramisu", category: "premium", price: 79.00, image: "assets/img/cakes/matcha_tiramisu.png" },
  { id: 7, name: "Coconut Carrot", category: "healthy", price: 67.00, image: "assets/img/cakes/coconut_carrot.png" },
  { id: 8, name: "Very Berry", category: "classic", price: 60.00, image: "assets/img/cakes/very_berry.png" }
];

// 2. DOM Elements
const catalogueGrid = document.getElementById('catalogueGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceSort = document.getElementById('priceSort');

// 3. Render Function
function renderCakes(cakesToRender) {
  // Clear the grid first
  catalogueGrid.innerHTML = "";

  if (cakesToRender.length === 0) {
    catalogueGrid.innerHTML = "<p>No cakes found matching your criteria.</p>";
    return;
  }

  // Generate HTML for each cake using template literals
  cakesToRender.forEach(cake => {
    const cardHTML = `
      <article class="cookie-card">
        <img src="${cake.image}" alt="Photo of ${cake.name}">
        <h3>${cake.name}</h3>
        <p class="cookie-category">Category: ${cake.category.charAt(0).toUpperCase() + cake.category.slice(1)}</p>
        <p class="cookie-price">RM ${cake.price.toFixed(2)}</p>
        <!-- UPDATED: Added the onclick trigger -->
        <button aria-label="Add ${cake.name} to cart" onclick="addToCart('${cake.name}', ${cake.price}, '${cake.image}')">Add to Cart</button>
      </article>
    `;
    catalogueGrid.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// 4. Main Pipeline (Filters and Sorts data)
function updateCatalogue() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedSort = priceSort.value;

  // Step A: Filter
  let filteredCakes = cakesDataset.filter(cake => {
    const matchesSearch = cake.name.toLowerCase().includes(searchTerm);
    const matchesCategory = (selectedCategory === "all") || (cake.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Step B: Sort
  if (selectedSort === "low-high") {
    filteredCakes.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "high-low") {
    filteredCakes.sort((a, b) => b.price - a.price);
  }

  // Step C: Render
  renderCakes(filteredCakes);
}

// 5. Event Listeners (Triggers updates without page reload)
searchInput.addEventListener('input', updateCatalogue);
categoryFilter.addEventListener('change', updateCatalogue);
priceSort.addEventListener('change', updateCatalogue);

// 6. Initial Render on Page Load
renderCakes(cakesDataset);
