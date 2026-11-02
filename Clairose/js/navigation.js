const pageContent = document.getElementById("page-content");

const navigationLinks = document.querySelectorAll("[data-page]");

const pageTitles = {
    home: "Clairose | Lifestyle Boutique",
    shop: "Shop | Clairose",
    collections: "Collections | Clairose",
    "new-arrivals": "New Arrivals | Clairose",
    about: "About Us | Clairose",
    contact: "Contact | Clairose",
    cart: "Shopping Bag | Clairose",
    credits: "Image Credits | Clairose"
};

function navigateTo(page, updateHistory = true) {
    if (!pageTitles[page]) page = "home";

    if (updateHistory) {
        history.pushState({ page }, "", `#${page}`);
    }

    document.title = pageTitles[page];

    navigationLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    renderPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
}

navigationLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        navigateTo(link.dataset.page);
    });
});

window.addEventListener("popstate", event => {
    const page =
        event.state?.page ||
        window.location.hash.replace("#", "") ||
        "home";

    navigateTo(page, false);
});

const initialPage =
    window.location.hash.replace("#", "") || "home";

navigateTo(initialPage, false);
