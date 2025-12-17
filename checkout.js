// Use the same key as your cart.js
const CART_KEY = "myshop_cart";
const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
const summary = document.getElementById("order-summary");
const totalEl = document.getElementById("checkout-total");

let total = 0;

if (cart.length === 0) {
  summary.innerHTML = "<p>Your cart is empty.</p>";
  totalEl.textContent = "";
} else {
  cart.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.name} x${item.qty} — $${(item.price * item.qty).toFixed(2)}`;
    summary.appendChild(div);
    total += item.price * item.qty;
  });

  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById("checkout-form").addEventListener("submit", e => {
  e.preventDefault();

  // Clear cart after fake checkout
  localStorage.removeItem(CART_KEY);

  document.body.innerHTML = `
    <div class="container" style="text-align:center; padding:60px;">
      <h2>Order Placed 🎉</h2>
      <p>Your order has been placed (fake checkout).</p>
      <a href="index.html" style="color:#111; text-decoration:underline;">Return Home</a>
    </div>
  `;
});
