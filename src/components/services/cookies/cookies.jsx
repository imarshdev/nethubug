import "./cookies.css";
import image2 from "./images/2.jpg";
import image4 from "./images/4.jpg";
import image6 from "./images/6.jpg";
import image10 from "./images/10.jpg";

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
  return (
    <>
      <b id="roboto">Cookie Jar</b>
      <div className="cookies-container">
        {edibleProducts.map((product, index) => (
          <div className="cookie-item" key={index}>
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
    </>
  );
}