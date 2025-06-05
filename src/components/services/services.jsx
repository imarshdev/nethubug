import "./services.css";
import spotify from "../../assets/spotify.svg";
import apple from "../../assets/apple.svg";
import close from "../../assets/close.svg";
import { getPaymentDate } from "../../utils/paydate";
import { useEffect, useState } from "react";
import SpotifyAccount from "./spotify/spotify";
import AppleAccount from "./apple/apple";

export default function Services() {
  const [payDate, setPayDate] = useState({ day: "", month: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const info = getPaymentDate();
    setPayDate(info);
  }, []);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <div className="services-container">
      <h2 id="roboto">Choose Your Service</h2>
      <p id="roboto" style={{ width: "80%" }}>
        Start now, pay on the {payDate.day}th of {payDate.month}
      </p>

      <div className="services">
        <div className="service-box">
          <img src={spotify} className="service-logo" />
          <button
            className="start-button"
            onClick={() => handleOpenModal("spotify")}
          >
            <b id="roboto">Get Started</b>
          </button>
        </div>

        <div className="service-box">
          <img src={apple} className="service-logo2" />
          <button
            className="start-button"
            onClick={() => handleOpenModal("apple")}
          >
            <b id="roboto">Get Started</b>
          </button>
        </div>
      </div>

      <h3 id="roboto">Other Services coming soon</h3>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {selectedService === "spotify" && <SpotifyAccount />}
            {selectedService === "apple" && <AppleAccount />}
            <div className="close-button" onClick={() => setShowModal(false)}>
              <img src={close} style={{ height: "20px" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
