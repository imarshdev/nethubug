import "./navbar.css";
import icon from "../../assets/icon.svg";
import { useCart } from "../cart/cartContext";
import { useState } from "react";

export default function Navbar() {
  return (
    <div className="navbar">
      <h3>STREAM & BITE</h3>
    </div>
  );
}

export function CartCard({ setCartOpen }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 🔒 Only show if there's something in the cart
  if (totalItems === 0) return null;

  return (
    <div className="cart-icon" onClick={() => setCartOpen(true)}>
      <span className="cart-count">{totalItems}</span>
      <span>Go to Cart</span>
      <img src={icon} alt="Cart" />
    </div>
  );
}

export function CartCheckout({ cartOpen, setCartOpen }) {
  function getDefaultTimePlus2Hours() {
    const now = new Date();
    now.setHours(now.getHours() + 2);

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }
  const [deliveryTime, setDeliveryTime] = useState(getDefaultTimePlus2Hours);
  const { cart, removeFromCart, clearCart } = useCart();
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    time: "",
    branch: "",
    payment: "cash",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.branch ||
      !deliveryTime
    ) {
      alert("Please fill out all delivery fields.");
      return;
    }

    const orderItemsText = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} x${item.quantity} - UGX ${(
            item.total || item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    const subtotalText = `Subtotal: UGX ${subtotal.toLocaleString()}`;
    const deliveryFee = 6000;
    const totalText = `Total: UGX ${(subtotal + deliveryFee).toLocaleString()}`;

    const message = `
🛒 New Order from STREAM & BITE

👤 Customer Name: ${customer.name}
📞 Phone: ${customer.phone}
📍 Branch: ${customer.branch}
⏰ Preferred Time: ${deliveryTime}
💰 Payment Method: ${customer.payment.toUpperCase()}

📦 Items:
${orderItemsText}

🚚 Delivery Fee: UGX ${deliveryFee.toLocaleString()}
🧾 ${subtotalText}
💳 ${totalText}
`;

    const encodedMessage = encodeURIComponent(message.trim());
    const phoneNumber = "256706916240"; // WhatsApp format (without +)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    clearCart();
    setCartOpen(false);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.total || item.price * item.quantity),
    0
  );

  return (
    <div className={`cart-checkout ${cartOpen ? "open" : ""}`}>
      <h2>Cart Checkout</h2>

      {/* Cart Items List */}
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <b>{item.name}</b>
              <span>{item.description}</span>
              <span>Qty: {item.quantity}</span>
              <span>UGX {item.price.toLocaleString()}</span>
              <strong>
                UGX{" "}
                {(item.total || item.price * item.quantity).toLocaleString()}
              </strong>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.name)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
        <br />
      </div>

      {/* Delivery Info */}
      <div className="checkout-section">
        <div className="header-container">
          <h3>Delivery Info</h3>
        </div>

        <div className="input-category-one-container">
          <span>Customer Name</span>
          <input
            className="input-category-one"
            name="name"
            placeholder="Customer Name"
            value={customer.name}
            onChange={handleInput}
          />
          <span>Customer Phone Number</span>
          <input
            className="input-category-one"
            name="phone"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleInput}
          />
          <span>Preferred Delivery Time</span>
          <input
            className="input-category-one"
            name="time"
            type="time"
            value={deliveryTime}
            onChange={handleInput}
          />
          <span>Preferred Delivery Branch</span>
          <select
            name="branch"
            value={customer.branch}
            onChange={handleInput}
            className="input-category-one"
          >
            <option value="">Select Branch</option>
            <option value="Kampala Central">Kampala Central</option>
            <option value="Bugolobi">Bugolobi</option>
            <option value="Ntinda">Ntinda</option>
            <option value="Kajjansi">Kajjansi</option>
          </select>
        </div>

        <div className="input-category-one-container">
          <h3>Payment Method</h3>
          <label>
            <input
              className="input-category-two"
              type="radio"
              name="payment"
              value="mtn"
              checked={customer.payment === "mtn"}
              onChange={handleInput}
            />
            MTN Mobile Money
          </label>
          <label>
            <input
              className="input-category-two"
              type="radio"
              name="payment"
              value="airtel"
              checked={customer.payment === "airtel"}
              onChange={handleInput}
            />
            Airtel Money
          </label>
          <label>
            <input
              className="input-category-two"
              type="radio"
              name="payment"
              value="cash"
              checked={customer.payment === "cash"}
              onChange={handleInput}
            />
            Cash on Delivery
          </label>
        </div>

        {/* Order Summary */}
        <div className="cart-summary input-category-one-container">
          <h3>Order Summary</h3>
          <span>
            <span>Items:</span>
            <span>{cart.length}</span>
          </span>
          <span style={{ fontSize: "14px" }}>
            <span>Delivery Fee:</span>{" "}
            <span>
              UGX 6,000{" "}
              <span style={{ color: "#ccc", fontSize: "10px" }}>
                Within Chosen Delivery Branch
              </span>
            </span>
          </span>
          <span style={{ fontSize: "12px" }}>
            <span>Subtotal:</span> <span>UGX {subtotal.toLocaleString()}</span>
          </span>
          <span style={{ fontSize: "16px" }}>
            <span>Total:</span>{" "}
            <span>UGX {(subtotal + 6000).toLocaleString()}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="checkout-buttons">
          <button className="clear-cart-button" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="place-order-button" onClick={handlePlaceOrder}>
            Place Order & Pay
          </button>
          <button
            className="close-cart-button"
            onClick={() => setCartOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
