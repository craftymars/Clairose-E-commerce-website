
/* =========================================
   CLAROSE | SHOPPING CART
========================================= */

let cart = JSON.parse(localStorage.getItem("clairose-cart")) || [];

// =========================================
// SAVE CART
// =========================================

function saveCart() {
    localStorage.setItem("clairose-cart", JSON.stringify(cart));
    updateCartCount();
}

// =========================================
// ADD PRODUCT
// =========================================

function addToCart(productId) {

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveCart();

    alert("Added to your shopping bag!");
}

// =========================================
// REMOVE PRODUCT
// =========================================

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    saveCart();

    renderCart();
}

// =========================================
// UPDATE QUANTITY
// =========================================

function updateQuantity(productId, quantity) {

    const item = cart.find(item => item.id === productId);

    if (!item) return;

    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    item.quantity = quantity;

    saveCart();

    renderCart();
}

// =========================================
// CART COUNT
// =========================================

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    cartCount.textContent = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
}

// =========================================
// CART TOTAL
// =========================================

function getCartTotal() {

    return cart.reduce((total, item) => {

        const product = products.find(product => product.id === item.id);

        if (!product) return total;

        return total + product.price * item.quantity;

    }, 0);
}

// =========================================
// CART PAGE
// =========================================

function renderCart() {

    const appContent = document.getElementById("page-content");

    if (cart.length === 0) {

        appContent.innerHTML = `
            <section class="empty-cart">

                <p class="eyebrow">YOUR SHOPPING BAG</p>

                <h1>Your bag is waiting.</h1>

                <p>It looks like you haven't found your favorites yet.</p>

                <button class="primary-button"
                    onclick="navigateTo('shop')">
                    Explore the Collection
                </button>

            </section>
        `;

        return;
    }

    const cartItems = cart.map(item => {

        const product = products.find(product =>
            product.id === item.id
        );

        if (!product) return "";

        return `
            <article class="cart-item">

                <img src="${product.image}"
                     alt="${product.name}">

                <div class="cart-item-information">

                    <h3>${product.name}</h3>

                    <p>${formatPrice(product.price)}</p>

                    <div class="quantity-controls">

                        <button onclick="updateQuantity(
                            ${product.id},
                            ${item.quantity - 1}
                        )">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="updateQuantity(
                            ${product.id},
                            ${item.quantity + 1}
                        )">+</button>

                    </div>

                    <button class="text-button"
                        onclick="removeFromCart(${product.id})">
                        Remove
                    </button>

                </div>

                <p class="cart-item-total">
                    ${formatPrice(product.price * item.quantity)}
                </p>

            </article>
        `;
    }).join("");

    appContent.innerHTML = `
        <section class="cart-page">

            <div class="page-heading">
                <p class="eyebrow">YOUR SHOPPING BAG</p>
                <h1>Your Favorites</h1>
            </div>

            <div class="cart-layout">

                <div class="cart-items">
                    ${cartItems}
                </div>

                <aside class="cart-summary">

                    <h2>Order Summary</h2>

                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${formatPrice(getCartTotal())}</span>
                    </div>

                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>

                    <div class="summary-total">
                        <span>Total</span>
                        <span>${formatPrice(getCartTotal())}</span>
                    </div>

                    <button class="primary-button"
                        onclick="checkoutDemo()">
                        Continue to Checkout
                    </button>

                    <button class="text-button"
                        onclick="navigateTo('shop')">
                        Continue Shopping
                    </button>

                </aside>

            </div>

        </section>
    `;
}
// =========================================
// DEMO CHECKOUT
// =========================================

function checkoutDemo() {

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
        alert("Your bag is empty. Add something lovely first!");
        return;
    }

    const orderNumber = "CL-" + Math.floor(100000 + Math.random() * 900000);

    const orderSummary = cartItems.map(item => {
        return `${item.name} x ${item.quantity}`;
    }).join("\n");

    const total = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    alert(`
Thank you for shopping with Clairose!

Order number: ${orderNumber}

ORDER SUMMARY
${orderSummary}

Total: $${total.toFixed(2)}

Demo order only.
No payment has been processed.
    `);

    localStorage.removeItem("cart");

    updateCartCount();
    renderCart();
}

// =========================================
// INITIALIZATION
// =========================================

updateCartCount();

