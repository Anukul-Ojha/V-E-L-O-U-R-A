const products = [
  { id: 1, name: "Classic Shirt", price: 1200, category: "men", img: "https://via.placeholder.com/300" },
  { id: 2, name: "Elegant Dress", price: 2200, category: "women", img: "https://via.placeholder.com/300" },
  { id: 3, name: "Oversized Hoodie", price: 2500, category: "unisex", img: "https://via.placeholder.com/300" },
  { id: 4, name: "Luxury Jacket", price: 4000, category: "men", img: "https://via.placeholder.com/300" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* NAVIGATION */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

/* PRODUCTS */
function displayProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" onclick="showDetail(${p.id})">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function filterProducts(cat) {
  if (cat === "all") displayProducts(products);
  else displayProducts(products.filter(p => p.category === cat));
}

/* DETAIL PAGE */
function showDetail(id) {
  const p = products.find(x => x.id === id);
  showPage("product-detail");

  document.getElementById("detail-container").innerHTML = `
    <img src="${p.img}">
    <h2>${p.name}</h2>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  `;
}

/* CART */
function addToCart(id) {
  const p = products.find(x => x.id === id);
  cart.push(p);
  saveCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;

  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    container.innerHTML += `
      <div class="cart-item">
        ${item.name} - ₹${item.price}
        <button onclick="removeItem(${i})">X</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
}

/* INIT */
displayProducts(products);
updateCart();