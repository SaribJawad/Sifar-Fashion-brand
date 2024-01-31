const categories = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");
const products = document.getElementById("products");
const search = document.querySelector("#search");

let displayProducts = (product) => {
  products.innerHTML = product
    .map(
      (x) => `
          <div class="product">
              <img class="img-hover" src=${x.hoverImg} alt="">
              <img class="img-main" src=${x.img} alt="">
              <h2 class="product-name">${x.name}</h2>
              <div class="priceCon">
              <span class="product-price">RS ${x.price}</span>
              <i onclick="addToCart(${x.id})" class="bi bi-cart-fill"></i>
              </div>
          </div>
`
    )
    .join("");
};
displayProducts(shopItemsData);

search.addEventListener("keyup", (e) => {
  userInp = e.target.value.toLowerCase();

  if (userInp) {
    displayProducts(
      shopItemsData.filter(
        (item) => item.name.toLowerCase().indexOf(userInp) !== -1
      )
    );
  } else {
    displayProducts(shopItemsData);
  }
});

function setCat() {
  let cat = shopItemsData.map((item) => item.cat);

  let cats = ["All", ...cat.filter((x, i) => cat.indexOf(x) === i)];

  categories.innerHTML = cats
    .map(
      (x) =>
        `
  <span class="cat">${x}</span>
    `
    )
    .join("");

  categories.addEventListener("click", (e) => {
    let selectedCat = e.target.textContent;

    if (selectedCat === "All") {
      displayProducts(shopItemsData);
    } else {
      displayProducts(shopItemsData.filter((x) => x.cat === selectedCat));
    }
  });
}

setCat();

let setPrices = () => {
  const priceLimit = shopItemsData.map((x) => x.price);
  const minPrice = Math.min(...priceLimit);
  const maxPrice = Math.max(...priceLimit);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "Rs " + maxPrice;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = `Rs ${e.target.value}`;

    displayProducts(shopItemsData.filter((x) => x.price <= e.target.value));
    search.value = "";
  });
};

setPrices();

let cartItem = JSON.parse(localStorage.getItem("cart")) || [];

let addToCart = (id) => {
  let selectedItem = id;
  let search = cartItem.find((x) => x.id === selectedItem);

  if (search === undefined) {
    cartItem.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cartItem));
};

