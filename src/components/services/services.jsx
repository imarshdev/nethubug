import "./services.css";
import spotify from "./spotify/spotify.jpg";
import apple from "./apple/apple.jpg";

const serviceItems = [
  {
    name: "Spotify Premium",
    description: "unlimited music for 1 person",
    logo: spotify,
    prices: [
      { plan: "Monthly", price: 6000 },
      { plan: "Bi-Annual", price: 35000 },
      { plan: "Annual", price: 70000 },
    ],
  },
  {
    name: "Apple Music",
    description: "stream music, no ads",
    logo: apple,
    prices: [
      { plan: "Monthly", price: 8000 },
      { plan: "Bi-Annual", price: 45000 },
      { plan: "Annual", price: 90000 },
    ],
  },
];

export default function Services() {
  return (
    <div className="services">
      {/* SERVICES AREA */}
      <b id="roboto">Premium Services</b>
      <div className="service-container">
        {serviceItems.map((service, index) => (
          <div key={index} className="service-item">
            <div
              className="item-logo"
              style={{
                boxSizing: "border-box",
                border: index === 0 ? "1.2rem solid black" : "none", // Add a border to the first image
              }}
            >
              <img
                src={service.logo}
                alt={service.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="item-name">
              <b style={{ fontSize: "12px", margin: 0 }} id="roboto">
                {service.name}
              </b>
              <br />
              <span style={{ fontSize: "12px" }}>{service.description}</span>
            </div>
            <div className="item-price">
              <div id="roboto" className="price-tag">
                <b>{service.prices[0].price.toLocaleString("en-US")} UGX</b>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* COOKIES AREA */}
      <b id="roboto">Cookie Jar</b>
      <div className="cookies-container">
        <div className="cookie-item"></div>
        <div className="cookie-item"></div>
        <div className="cookie-item"></div>
        <div className="cookie-item"></div>
      </div>
      {/* DISCONT AREA */}
      <b id="roboto">Discount Box</b>
      <div className="discount-box"></div>
      {/* BUSINESS ADD AREA */}
      <b id="roboto">Ads</b>
    </div>
  );
}
