// 1. The Data Array (Minimum 8 items for the assignment)
const cookiesDataset = [
  { id: 1, name: "Classic Choc Chip", category: "classic", price: 12.00, image: "assets/img/cookies/choco_chip.png" },
  { id: 2, name: "Double Chocolate", category: "classic", price: 14.00, image: "assets/img/cookies/double_choc.png" },
  { id: 3, name: "Snickerdoole", category: "premium", price: 15.00, image: "assets/img/cookies/snickerdoodle.png" },
  { id: 4, name: "Gluten-Free Oats", category: "healthy", price: 13.50, image: "assets/img/cookies/oatmeal_raisin.png" },
  { id: 5, name: "Vegan Peanut Butter", category: "healthy", price: 14.00, image: "assets/img/cookies/peanut_butter.png" },
  { id: 6, name: "Macadamia White Choc", category: "premium", price: 16.00, image: "assets/img/cookies/wchoc_mac.png" }
];

// 2. DOM Elements
const catalogueGrid = document.getElementById('catalogueGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceSort = document.getElementById('priceSort');

// 3. Render Function
function renderCookies(cookiesToRender) {
  // Clear the grid first
  catalogueGrid.innerHTML = "";

  if (cookiesToRender.length === 0) {
    catalogueGrid.innerHTML = "<p>No cookies found matching your criteria.</p>";
    return;
  }

  // Generate HTML for each cookie using template literals
  cookiesToRender.forEach(cookie => {
    const cardHTML = `
      <article class="cookie-card">
        <img src="${cookie.image}" alt="Photo of ${cookie.name}">
        <h3>${cookie.name}</h3>
        <p class="cookie-category">Category: ${cookie.category}</p>
        <p class="cookie-price">RM ${cookie.price.toFixed(2)}</p>
        <!-- UPDATED: Added the onclick trigger -->
        <button aria-label="Add ${cookie.name} to cart" onclick="addToCart('${cookie.name}', ${cookie.price}, '${cookie.image}')">Add to Cart</button>
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
  let filteredCookies = cookiesDataset.filter(cookie => {
    const matchesSearch = cookie.name.toLowerCase().includes(searchTerm);
    const matchesCategory = (selectedCategory === "all") || (cookie.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Step B: Sort
  if (selectedSort === "low-high") {
    filteredCookies.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "high-low") {
    filteredCookies.sort((a, b) => b.price - a.price);
  }

  // Step C: Render
  renderCookies(filteredCookies);
}

// 5. Event Listeners (Triggers updates without page reload)
searchInput.addEventListener('input', updateCatalogue);
categoryFilter.addEventListener('change', updateCatalogue);
priceSort.addEventListener('change', updateCatalogue);

// 6. Initial Render on Page Load
renderCookies(cookiesDataset);
