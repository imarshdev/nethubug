import "./cookies.css";
import image2 from "./images/2.jpg";
import image4 from "./images/4.jpg";
import image6 from "./images/6.jpg";
import image10 from "./images/10.jpg";
import { useState, useEffect } from "react";
import { useCart } from "../../cart/cartContext";

const edibleProducts = [
  {
    name: "Pack of 2",
    price: 20000,
    image: image2,
    description: "Small dose, easy start.",
  },
  {
    name: "Pack of 4",
    price: 35000,
    image: image4,
    description: "Perfect for sharing or more.",
  },
  {
    name: "Tin of 6",
    price: 50000,
    image: image6,
    description: "Balanced buzz, sleek tin.",
  },
  {
    name: "Jar of 10",
    price: 80000,
    image: image10,
    description: "Party pack. Ride waves together.",
  },
];

export default function Cookies() {
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showOverlay, setShowOverlay] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    if (selected) {
      // Delay to allow mount before fade-in
      setTimeout(() => setShowOverlay(true), 10);
    } else {
      setShowOverlay(false);
    }
  }, [selected]);

  const closeModal = () => {
    setShowOverlay(false);
    setTimeout(() => {
      setSelected(null);
      setQuantity(1);
    }, 300); // match transition duration
  };

  const handleAddToCart = () => {
    const newItem = {
      ...selected,
      quantity,
      total: selected.price * quantity,
    };
    addToCart(newItem);
    closeModal();
  };

  return (
    <>
      <b id="roboto">Cookie Jar</b>
      <div className="cookies-container">
        {edibleProducts.map((product, index) => (
          <div
            className="cookie-item"
            key={index}
            onClick={() => setSelected(product)}
          >
            <div className="details">
              <b>{product.name}</b>
              <span>{product.description}</span>
              <div className="cookie-price">
                <b>{product.price.toLocaleString()} UGX</b>
              </div>
            </div>
            <img src={product.image} alt={product.name} />
          </div>
        ))}
      </div>

      {selected && (
        <div className={`overlay ${showOverlay ? "show" : ""}`}>
          <div className="modal">
            <img src={selected.image} alt={selected.name} />
            <b style={{ fontSize: "20px" }}>{selected.name}</b>
            <p>{selected.description}</p>
            <div className="quantity-control">
              <button
                className="ctrl-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="ctrl-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <p>
              Total: <b>{(selected.price * quantity).toLocaleString()} UGX</b>
            </p>
            <button className="continue" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="close" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
