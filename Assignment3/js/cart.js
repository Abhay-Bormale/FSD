function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id){
    const cart = getCart();
    cart.push(id);
    saveCart(cart);
    alert("Added to cart!");
}

function updateCartCount(){
    const cart = getCart();
    const countElements = document.querySelectorAll("#cart-count");
    countElements.forEach(el => el.innerText = cart.length);
}

function displayCart(){
    const cart = getCart();
    const container = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total-price");

    container.innerHTML = "";
    let total = 0;

    cart.forEach(id => {
        const product = products.find(p => p.id === id);
        total += product.price;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}">
                <div>
                    <h4>${product.name}</h4>
                    <p>$${product.price}</p>
                </div>
            </div>`;
    });

    totalDisplay.innerText = "Total: $" + total;
    updateCartCount();
}

function clearCart(){
    localStorage.removeItem("cart");
    displayCart();
}
