import "./services.css";
import spotify from "../../assets/spotify.svg";
import apple from "../../assets/apple.svg";
import close from "../../assets/close.svg";
import { getPaymentDate } from "../../utils/paydate";
import { useEffect, useState } from "react";

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
          <img src={apple} className="service-logo" />
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
            {selectedService === "apple" && (
              <>
                <h3 id="roboto">Apple Music Setup</h3>
                <p>Let’s get you subscribed to Apple Music with ease.</p>
                {/* Add Apple-specific flow here */}
              </>
            )}
            <div className="close-button" onClick={() => setShowModal(false)}>
              <img src={close} style={{ height: "20px" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SpotifyAccount = () => {
  const [step, setStep] = useState(1);
  const [payDate, setPayDate] = useState({ day: "", month: "" });

  useEffect(() => {
    const info = getPaymentDate();
    setPayDate(info);
  }, []);

  return (
    <div className={`step-container ${step === 2 ? "slide-left" : ""}`}>
      {step === 1 && (
        <div className="step-content">
          <h3 id="roboto">Spotify Premium Setup</h3>
          <span id="roboto">
            <b>Welcome! Let’s get you into a Spotify family plan.</b>
          </span>
          <br />
          <>
            <span>• Use Your Own Account</span>
            <span>• Unlimited Music Streaming</span>
            <span>• Downloads for Offline Use</span>
            <span>• Ad free listening</span>
            <span>
              • Start now, pay on the {payDate.day}th of {payDate.month}
            </span>
          </>
          <br />
          <button className="start-button" onClick={() => setStep(2)}>
            <b>Get Now</b>
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="step-content">
          <h3 id="roboto">
            Select your package and provide details to proceed.
          </h3>
          <br />
          <label id="roboto">Select Package</label>
          <select name="" className="input">
            <option value="Monthly">
              Monthly Package <b>UGX.6,000</b>
            </option>
            <option value="Bi-annual">
              Bi-Annual (6 Months) Package - UGX.35,000
            </option>
            <option value="Bi-annual">
              Annual (1 Year) Package - UGX.65,000
            </option>
          </select>
          <br />
          <label id="roboto">Names</label>
          <input type="text" placeholder="Enter Full Name" className="input" />
          <br />
          <button className="start-button">
            <b id="roboto">Proceed to Whatsapp</b>
          </button>
        </div>
      )}
    </div>
  );
};
