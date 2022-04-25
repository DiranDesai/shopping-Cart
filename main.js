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



console.log(companiesDOM);

let products;

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
                    <button data-id=${id}>Add To Cart</button>
                </div>
            </div>
        </div>
        `;
    });

    productsContainer.innerHTML = productsDOM.join("");
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




document.addEventListener("DOMContentLoaded", () => {
    renderCompanies();
    manipulateProducts();
    renderProducts();
});



rangePrice.addEventListener("change", handlePriceChange);
productSearch.addEventListener("keyup", handleNameChange);
