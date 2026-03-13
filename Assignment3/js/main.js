document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
});

function displayProducts(productList) {
    const container = document.getElementById("shop-products") || 
                      document.getElementById("featured-products");

    if (!container) return;

    container.innerHTML = "";

    productList.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

if (filterSelect) {
    filterSelect.addEventListener("change", filterProducts);
}

function filterProducts() {
    let searchValue = searchInput.value.toLowerCase();
    let filterValue = filterSelect.value;

    let filtered = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchValue) &&
            (filterValue === "all" || product.category === filterValue)
        );
    });

    displayProducts(filtered);
}
