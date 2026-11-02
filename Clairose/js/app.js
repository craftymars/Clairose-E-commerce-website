
/* =========================================
   CLAROSE | STOREFRONT APPLICATION
========================================= */

const appContent = document.getElementById("page-content");

// =========================================
// FORMAT PRICE
// =========================================

function formatPrice(price) {
    return "$" + price.toFixed(2);
}

// =========================================
// PRODUCT CARD
// =========================================

function createProductCard(product) {
    return `
        <article class="product-card">

            <div class="product-image">
                <img src="${product.image}"
                     alt="${product.name}"
                     loading="lazy">

                ${product.badge ? `
                    <span class="product-badge">
                        ${product.badge}
                    </span>
                ` : ""}
            </div>

            <div class="product-information">
                <h3>${product.name}</h3>

                <p class="product-price">
                    ${formatPrice(product.price)}
                </p>

                <button class="product-button"
                    onclick="addToCart(${product.id})">
                    Add to Bag
                </button>

                <button class="text-button"
                    onclick="openProduct(${product.id})">
                    View Details
                </button>
            </div>

        </article>
    `;
}

// =========================================
// PRODUCT GRID
// =========================================

function createProductGrid(productList) {
    return `
        <div class="product-grid">
            ${productList.map(createProductCard).join("")}
        </div>
    `;
}

// =========================================
// HOMEPAGE
// =========================================

function renderHome() {

    const featuredProducts = products.slice(0, 4);

    appContent.innerHTML = `
        <section class="hero-section">

            <div class="hero-content">
                <p class="eyebrow">LIFESTYLE • ACCESSORIES • EVERYDAY LIVING</p>

                <h1>Make room for lovely.</h1>

                <p>
                    Thoughtful little luxuries for
                    your everyday moments.
                </p>

                <button class="primary-button"
                    onclick="navigateTo('shop')">
                    Discover the Collection
                </button>
            </div>

            <div class="hero-image">
                <img src="assets/images/hero.jpg"
                     alt="Clairose lifestyle collection">
            </div>

        </section>

        <section class="homepage-section">

            <div class="section-heading">
                <p class="eyebrow">THOUGHTFULLY CURATED</p>
                <h2>Shop by Collection</h2>
            </div>

            <div class="collection-grid">

                <button class="collection-card"
                    onclick="navigateTo('collections')">
                    <span>Paper & Stationery</span>
                </button>

                <button class="collection-card"
                    onclick="navigateTo('collections')">
                    <span>Home & Living</span>
                </button>

                <button class="collection-card"
                    onclick="navigateTo('collections')">
                    <span>Personal Accessories</span>
                </button>

            </div>

        </section>

        <section class="homepage-section">

            <div class="section-heading">
                <p class="eyebrow">A LITTLE SOMETHING NEW</p>
                <h2>Featured Favorites</h2>
            </div>

            ${createProductGrid(featuredProducts)}

            <div class="section-action">
                <button class="secondary-button"
                    onclick="navigateTo('shop')">
                    Explore All Products
                </button>
            </div>

        </section>

        <section class="brand-banner">
            <p class="eyebrow">THE CLOUSE EDIT</p>
            <h2>Little things. Lovely living.</h2>
            <p>Everyday essentials, thoughtfully chosen.</p>
        </section>
    `;
}

// =========================================
// SHOP PAGE
// =========================================

function renderShop() {

    appContent.innerHTML = `
        <section class="page-heading">
            <p class="eyebrow">THE COLLECTION</p>
            <h1>Shop All</h1>
            <p>Discover something lovely for every day.</p>
        </section>

        <section class="shop-controls">

            <input type="search"
                id="product-search"
                placeholder="Search products..."
                aria-label="Search products">

            <select id="category-filter">
                <option value="all">All Categories</option>
                <option value="stationery">Stationery</option>
                <option value="accessories">Accessories</option>
                <option value="home">Home & Living</option>
                <option value="workspace">Workspace</option>
                <option value="gifts">Gifts</option>
            </select>

            <select id="product-sort">
                <option value="default">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
            </select>

        </section>

        <div id="shop-products">
            ${createProductGrid(products)}
        </div>
    `;

    const search = document.getElementById("product-search");
    const category = document.getElementById("category-filter");
    const sort = document.getElementById("product-sort");

    function filterProducts() {

        let filtered = [...products];

        const searchTerm = search.value.toLowerCase();

        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        if (category.value !== "all") {
            filtered = filtered.filter(product =>
                product.category === category.value
            );
        }

        if (sort.value === "low") {
            filtered.sort((a, b) => a.price - b.price);
        }

        if (sort.value === "high") {
            filtered.sort((a, b) => b.price - a.price);
        }

        if (sort.value === "name") {
            filtered.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        document.getElementById("shop-products").innerHTML =
            filtered.length
                ? createProductGrid(filtered)
                : "<p class='empty-message'>No products found.</p>";
    }

    search.addEventListener("input", filterProducts);
    category.addEventListener("change", filterProducts);
    sort.addEventListener("change", filterProducts);
}

// =========================================
// COLLECTIONS
// =========================================

function renderCollections() {

    const categories = [
        { id: "stationery", name: "Paper & Stationery" },
        { id: "accessories", name: "Personal Accessories" },
        { id: "home", name: "Home & Living" },
        { id: "workspace", name: "Desk & Workspace" },
        { id: "gifts", name: "Gift Collections" }
    ];

    appContent.innerHTML = `
        <section class="page-heading">
            <p class="eyebrow">EXPLORE CLAIROSE</p>
            <h1>Our Collections</h1>
            <p>Little things for every corner of your life.</p>
        </section>

        <div class="collection-grid">
            ${categories.map(category => `
                <button class="collection-card"
                    onclick="openCollection('${category.id}')">
                    <span>${category.name}</span>
                </button>
            `).join("")}
        </div>
    `;
}

// =========================================
// COLLECTION DETAIL
// =========================================

function openCollection(category) {

    const collectionProducts = products.filter(product =>
        product.category === category
    );

    appContent.innerHTML = `
        <section class="page-heading">
            <button class="text-button"
                onclick="navigateTo('collections')">
                ← All Collections
            </button>

            <h1>${category.charAt(0).toUpperCase() +
                category.slice(1)}</h1>
        </section>

        ${createProductGrid(collectionProducts)}
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// =========================================
// NEW ARRIVALS
// =========================================

function renderNewArrivals() {

    const newProducts = products.filter(product =>
        product.badge === "New"
    );

    appContent.innerHTML = `
        <section class="page-heading">
            <p class="eyebrow">JUST ARRIVED</p>
            <h1>New Arrivals</h1>
            <p>Fresh finds for your everyday.</p>
        </section>

        ${createProductGrid(newProducts)}
    `;
}

// =========================================
// PRODUCT DETAILS
// =========================================

function openProduct(productId) {

    const product = products.find(product =>
        product.id === productId
    );

    if (!product) return;

    appContent.innerHTML = `
        <section class="product-detail">

            <div class="product-detail-image">
                <img src="${product.image}"
                     alt="${product.name}">
            </div>

            <div class="product-detail-info">

                <p class="eyebrow">CLAIROSE COLLECTION</p>

                <h1>${product.name}</h1>

                <p class="product-price">
                    ${formatPrice(product.price)}
                </p>

                <p>${product.description}</p>

                <button class="primary-button"
                    onclick="addToCart(${product.id})">
                    Add to Bag
                </button>

                <p class="product-note">
                    Thoughtfully chosen for everyday living.
                </p>

            </div>

        </section>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// =========================================
// ABOUT
// =========================================

function renderAbout() {

    appContent.innerHTML = `
        <section class="page-heading">
            <p class="eyebrow">OUR STORY</p>
            <h1>A little more lovely.</h1>
        </section>

        <section class="about-content">

            <h2>Everyday, thoughtfully.</h2>

            <p>
                Clairose is a lifestyle boutique built around
                the beauty of everyday moments.
            </p>

            <p>
                From thoughtful stationery to personal
                accessories and home essentials, our collections
                celebrate the little things that make a space
                or routine feel uniquely yours.
            </p>

            <p>
                We believe everyday products can be beautiful,
                meaningful, and accessible.
            </p>

        </section>
    `;
}

// =========================================
// CONTACT
// =========================================

function renderContact() {

    appContent.innerHTML = `
        <section class="page-heading">
            <p class="eyebrow">GET IN TOUCH</p>
            <h1>Contact Clairose</h1>
            <p>We would love to hear from you.</p>
        </section>

        <form class="contact-form" id="contact-form">

            <label for="contact-name">Your Name</label>
            <input id="contact-name" type="text" required>

            <label for="contact-email">Email Address</label>
            <input id="contact-email" type="email" required>

            <label for="contact-message">Message</label>
            <textarea id="contact-message" rows="5" required></textarea>

            <button class="primary-button" type="submit">
                Send Message
            </button>

            <p id="contact-response"></p>

        </form>
    `;

    document.getElementById("contact-form")
        .addEventListener("submit", event => {

            event.preventDefault();

            document.getElementById("contact-response")
                .textContent =
                "Thank you! This is a demonstration contact form.";

            event.target.reset();
        });
}

// =========================================
// PAGE RENDERER
// =========================================

function renderCredits() {
    appContent.innerHTML = `
        <section class="page-heading">
            <p class="eyebrow">IMAGE ATTRIBUTION</p>
            <h1>Image Credits</h1>
            <p>Giving credit to the creators behind our visual inspiration.</p>
        </section>

        <section class="credits-content">

            <div class="credits-intro">
                <h2>Photography & Image Sources</h2>
                <p>
                    The following photographers and creators provided
                    the imagery featured throughout Clairose.
                    All photography credits belong to their respective creators.
                </p>
            </div>

            <div class="credit-item">
                <h2>Homepage Photography</h2>
                <p>Photo of a hair mask bottle on a rock.</p>
                <p>Photograph by cottonbro studio from Pexels.</p>
                <a href="https://www.pexels.com/photo/photo-of-a-hair-mask-bottle-on-a-rock-7428102/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>The Everyday Journal</h2>
                <p>Photo by Kaboompics from Pexels.</p>
                <a href="https://www.pexels.com/photo/blank-diary-near-pink-stuffed-toys-4887173/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
                <p><a href="https://kaboompics.com/" target="_blank"
                      rel="noopener noreferrer">Visit Kaboompics</a></p>
            </div>

            <div class="credit-item">
                <h2>Weekly Planner</h2>
                <p>Photo by Florencia Ceruti from Pexels.</p>
                <a href="https://www.pexels.com/photo/colorful-weekly-planner-with-pens-and-confetti-30101192/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Little Moments Sticker Set</h2>
                <p>Photo by Berfintage from Pexels.</p>
                <a href="https://www.pexels.com/photo/creative-stationery-flat-lay-with-art-supplies-33740765/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>The Essential Pen Set</h2>
                <p>Photo by Antoni Shkraba from Pexels.</p>
                <a href="https://www.pexels.com/photo/pens-in-container-6187592/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Dainty Necklace</h2>
                <p>Photo by Sergei Starostin from Pexels.</p>
                <a href="https://www.pexels.com/photo/heart-shaped-mother-of-pearl-pendant-necklace-34372552/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Everyday Pouch</h2>
                <p>Photo by Mia Vargas from Pexels.</p>
                <a href="https://www.pexels.com/photo/cosmetics-and-makeup-equipment-9308392/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Petal Keychain</h2>
                <p>Photo by azra melek from Pexels.</p>
                <a href="https://www.pexels.com/photo/handmade-crochet-sunflower-keychain-on-wooden-bench-40184394/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Classic Hair Clip Set</h2>
                <p>Photo by Kiersten Williams from Pexels.</p>
                <a href="https://www.pexels.com/photo/closeup-of-a-beige-hair-clip-on-a-book-cover-16037839/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Petal Trinket Dish</h2>
                <p>Photo by Lisa Fotios from Pexels.</p>
                <a href="https://www.pexels.com/photo/elegant-assorted-jewelry-on-blue-ceramic-dish-34544786/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Sage Storage Box</h2>
                <p>Photo by Jonathan Borba from Pexels.</p>
                <a href="https://www.pexels.com/photo/elegant-display-of-textured-storage-boxes-38139697/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Blush Mini Vase</h2>
                <p>Photo by Tara Winstead from Pexels.</p>
                <a href="https://www.pexels.com/photo/a-beige-pot-on-a-beige-background-7663201/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Jewelry Stand</h2>
                <p>Photo by MART PRODUCTION from Pexels.</p>
                <a href="https://www.pexels.com/photo/accessories-displayed-for-sale-7679718/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Soft Touch Desk Mat</h2>
                <p>Photo by minhphuc .workspace from Pexels.</p>
                <a href="https://www.pexels.com/photo/a-desk-with-a-keyboard-and-mouse-on-it-28228014/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Desktop Organizer</h2>
                <p>Photo by RDNE Stock project from Pexels.</p>
                <a href="https://www.pexels.com/photo/decorative-mini-tree-in-a-pot-next-to-an-organizer-with-writing-utensils-8489631/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Notebook Stand</h2>
                <p>Photo by Tuğba Dönmez from Pexels.</p>
                <a href="https://www.pexels.com/photo/cozy-desk-setup-with-tablet-and-book-stand-35930119/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>The Desk Cup</h2>
                <p>Photo by Ebahir from Pexels.</p>
                <a href="https://www.pexels.com/photo/monochrome-office-desk-with-pencil-in-holder-28490354/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>The Paper Lover Box</h2>
                <p>Photo by Rumeysa Demir from Pexels.</p>
                <a href="https://www.pexels.com/photo/decorative-stationery-set-with-wax-seal-and-floral-design-36203723/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>The Little Luxury Box</h2>
                <p>Photo by Malcolm Garret from Pexels.</p>
                <a href="https://www.pexels.com/photo/elegant-black-candle-boxes-with-minimalist-design-36801962/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Workspace Refresh Set</h2>
                <p>Photo by Nhi Lâm from Pexels.</p>
                <a href="https://www.pexels.com/photo/coffee-in-glasses-and-laptop-on-table-17258236/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

            <div class="credit-item">
                <h2>Just Because Gift Set</h2>
                <p>Photo by HAYA JAUNI from Pexels.</p>
                <a href="https://www.pexels.com/photo/valentines-day-gift-10720839/"
                   target="_blank" rel="noopener noreferrer">
                    View Original Photograph
                </a>
            </div>

        </section>
    `;
}


function renderPage(page) {

    switch (page) {

        case "home":
            renderHome();
            break;

        case "shop":
            renderShop();
            break;

        case "collections":
            renderCollections();
            break;

        case "new-arrivals":
            renderNewArrivals();
            break;

        case "about":
            renderAbout();
            break;

        case "contact":
            renderContact();
            break;

        case "cart":
            renderCart();
            break;

        default:
            renderHome();
            
            case "credits":
    renderCredits();
    break;
    }
}

// =========================================
// HEADER BUTTONS
// =========================================

document.getElementById("cart-button")
    .addEventListener("click", () => navigateTo("cart"));

document.getElementById("search-button")
    .addEventListener("click", () => navigateTo("shop"));

// =========================================
// INITIALIZATION
// =========================================

updateCartCount();
