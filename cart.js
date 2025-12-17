// Cart System with stackable items + top notification

const CART_KEY = "myshop_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Notification function
function showNotification(message) {
  let notif = document.createElement('div');
  notif.className = 'cart-notification';
  notif.innerText = message;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => document.body.removeChild(notif), 500);
  }, 2000);
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
  renderCart();
  showNotification(`${name} added to cart`);
}

function decreaseQty(index) {
  const cart = getCart();
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCart(cart);
  renderCart();
}

function increaseQty(index) {
  const cart = getCart();
  cart[index].qty += 1;
  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCart();
  showNotification(`Cart cleared`);
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty">Your cart is empty.</div>';
    totalEl.textContent = "$0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
div.innerHTML = `
  <span class="cart-name">${item.name}</span>
  <span class="cart-price">$${item.price.toFixed(2)}</span>
  <div class="qty-controls">
    <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
    <div class="qty-wrapper">
      <span class="qty">${item.qty}</span>
    </div>
    <button class="qty-btn" onclick="increaseQty(${index})">+</button>
    <button class="trash-btn" onclick="removeItem(${index})">🗑</button>
  </div>
`;
    container.appendChild(div);
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Auto-render on cart page
document.addEventListener("DOMContentLoaded", renderCart);