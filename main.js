let originalProducts = [{
        id: 1,
        name: "Baby Clothing",
        price: 35,
        company: "pretoge",
        img: "cart3.jpg",
    },
    {
        id: 2,
        name: "Samsung Monitor",
        price: 4000,
        company: "Smart Guide",
        img: "cart10.jpg",
    },
    {
        id: 3,
        name: "Hisensi Monitor",
        price: 2500,
        company: "Mobile City",
        img: "cart2.jpg",
    },
    {
        id: 4,
        name: "Monitor Curve",
        price: 3000,
        company: "pretoge",
        img: "cart4.jpg",
    },
    {
        id: 5,
        name: "Techno Spark 5",
        price: 2400,
        company: "Smart Guide",
        img: "cart5.jpg",
    },
    {
        id: 6,
        name: "Infinix Smart 7",
        price: 2800,
        company: "pretoge",
        img: "cart8.jpg",
    },
];

const productsContainer = document.querySelector(".products-container");
const productSearch = document.querySelector(".product-search");
const rangePrice = document.querySelector(".range-price");
const companiesDOM = document.querySelector(".companies-search");
const busketButton = document.querySelector(".busket-button");
const cartClose = document.querySelector(".cart-close");
const cartContainer = document.querySelector(".cart-container");
const cartsWrapper = document.querySelector(".carts");
const cartNum = document.querySelector(".cart-num");

let products;
let carts = getCartStorage();
const companies = [];


function renderCompanies(){
    originalProducts.forEach(product => {
        if (!companies.includes(product.company)) {
            companies.push(product.company);
        }
    });

    companies.forEach(company => {
        companiesDOM.innerHTML += `<p>${company}</p>`;
    });

    companiesDOM.addEventListener("click", (e) => {
        let company = e.target.innerText;

        manipulateProducts();
        products = products.filter(product => product.company === company);
        renderProducts();
    });
}


function renderProducts() {
    if (products.length <= 0) {
        productsContainer.innerHTML = `<h6 class="text-center">There are no products with that search...</h6>`;
        return
    }

    const productsDOM = products.map((product) => {
        const {id, name, price, img} = product;
        return `
        <div class="col-md-4">
            <div class="text-center">
                <img src="images/${img}" alt="">
                <div class="mt-4">
                    <h5>${name}</h5>
                    <p>$${price}</p>
                    <button data-id=${id} class="btn btn-primary cart-btn">Add To Cart</button>
                </div>
            </div>
        </div>
        `;
    });

    productsContainer.innerHTML = productsDOM.join("");

    const cartButtons = productsContainer.querySelectorAll(".cart-btn");

    cartButtons.forEach(cartButton => {
        cartButton.addEventListener("click", addToCartFunc);
    });
}

function addToCartFunc(e){
    const target = e.target;
    const productId = Number(target.dataset.id);
    const findProduct = originalProducts.find(product => product.id === productId);
    carts.push(findProduct);
    setCartStorage();
    updateCart();
}

function manipulateProducts(){
    products = [...originalProducts];
}

function handleNameChange(e){
    const target = e.target;
    const productName = target.value.toLowerCase();

    manipulateProducts();
    products = products.filter(product => product.name.toLowerCase().includes(productName));
    renderProducts();
}

function handlePriceChange(e){
    const target = e.target;
    const priceValue = Number(target.value);
    const priceDOM = document.querySelector(".price-dom");
    priceDOM.innerHTML = `Value $${priceValue}`;

    manipulateProducts();
    products = products.filter(product => product.price > priceValue);
    renderProducts();
}

function openCart(){
    cartContainer.classList.add("open");
}

function closeCart(){
    cartContainer.classList.remove("open");
}

function getCartStorage(){
    if (localStorage.getItem("carts") !== null) {
        return JSON.parse(localStorage.getItem("carts"));
    } else{
        return [];
    }
}

function setCartStorage(){
    localStorage.setItem("carts", JSON.stringify(carts));
}

function updateCart(){
    cartNum.innerText = carts.length;
    const cartDOM = carts.map(cart => {
        const {id, name, img, price} = cart;
        return `
        <div class="cart col-12">
        <div class="row">
            <div class="col-8 d-flex align-items-center">
                <img src="images/${img}" alt="">
                <div>
                    <h5>${name}</h5>
                    <p>$${price}</p>
                    <button class="btn btn-danger cart-remove" data-id=${id}>Remove</button>
                </div>
            </div>
            <div class="col-4">
                <div class="cart-controls">
                    <button class="cart-item-increase-btn">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <span class="cart-item-amount">1</span>
                    <button class="cart-item-decrease-btn">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    });

    cartsWrapper.innerHTML = cartDOM.join("");

    const cartRemoveButtons = cartsWrapper.querySelectorAll(".cart-remove");

    cartRemoveButtons.forEach(cartRemoveButton => {
        cartRemoveButton.addEventListener("click", removeCart);
    });

}

function removeCart(e){
    const target = e.target;
    const productId = Number(target.dataset.id);

    carts = carts.filter(cart => cart.id !== productId);
    setCartStorage();
    updateCart();
}




document.addEventListener("DOMContentLoaded", () => {
    renderCompanies();
    manipulateProducts();
    renderProducts();
    updateCart();
});



rangePrice.addEventListener("change", handlePriceChange);
productSearch.addEventListener("keyup", handleNameChange);
busketButton.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
