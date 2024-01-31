let label = document.querySelector(".title");
let shoppingCart = document.getElementById("shopping-cart");

let cartItem = JSON.parse(localStorage.getItem("cart")) || [];

let totalPrice = document.querySelector("#total-price");
let checkbox = document.querySelector("#checkout");
let generateCart = () => {
  if (cartItem.length !== 0) {
    return (shoppingCart.innerHTML = cartItem
      .map((x) => {
        let search = shopItemsData.find((y) => y.id === x.id) || [];
        // console.log(search);
        return `
      <div class="cart-item">
        <img width="250" src=${search.img} alt=""/>
        <div class = "details">
            <div class = "title-price-x" >
                <h4 class= "title-price">
                    <p >${search.name}</p>
                    <p  class = "item-price">Rs ${search.price}</p>

                </h4>
                <i onclick="removeItem(${search.id})" class="bi bi-x"></i>
            </div>
            <div class= "cart-buttons">
                <i onclick="decrement(${search.id})" class="bi bi-dash"></i>
                <div id=${search.id} class="quantity">${x.item}</div>
                <i onclick="increment(${search.id})" class="bi bi-plus"></i>
            </div>
            <h3>Rs ${x.item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart</h2>
    <h5 class= "cart-empty">Your cart is currently empty.</h5>
    <a href="shop.html">
      <button class="shopBtn">Return to Shop</button>
    </a>
     `;
    checkbox.innerHTML = ``;
  }
};

generateCart();

let increment = (id) => {
  let incrementItem = id;

  let search = cartItem.find((x) => x.id === incrementItem);

  if (search === undefined) {
    cartItem.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCart();
  update(incrementItem);
  localStorage.setItem("cart", JSON.stringify(cartItem));
};

let decrement = (id) => {
  let decrementItem = id;

  let search = cartItem.find((x) => x.id === decrementItem);

  if (search === undefined) {
    cartItem.push({
      id: decrementItem,
      item: 1,
    });
  } else {
    search.item -= 1;
  }

  update(decrementItem);
  cartItem = cartItem.filter((x) => x.item !== 0);
  generateCart();
  localStorage.setItem("cart", JSON.stringify(cartItem));
};

let update = (id) => {
  let search = cartItem.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  totalAmount();
};

let removeItem = (id) => {
  let selectedId = id;
  cartItem = cartItem.filter((x) => x.id !== selectedId);
  localStorage.setItem("cart", JSON.stringify(cartItem));
  generateCart();
  totalAmount();
};

let totalAmount = () => {
  if (cartItem.length !== 0) {
    let amount = cartItem
      .map((y) => {
        let search = shopItemsData.find((x) => x.id === y.id) || [];
        return y.item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    totalPrice.innerHTML = `
    <div class="subtotal">
        <p>Subtotal</p>
        <p>${amount}</p>
    </div>
    <div class="subtotal">
      <p>Shipping</p>
      <p>Flat rate: Rs 200</p>
    </div>
    <div class="subtotal">
      <p>Total</p>
      <p>${amount + 200}</p>
    </div>
    `;
  } else return;
};

totalAmount();
