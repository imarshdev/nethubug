import { useState, useEffect } from "react";
import { getPaymentDate } from "../../../utils/paydate";

export default function AppleAccount() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  const [payDate, setPayDate] = useState({ day: "", month: "" });

  useEffect(() => {
    const info = getPaymentDate();
    setPayDate(info);
  }, []);

  const whatsappMessage = `Hello! I'd like to subscribe to the Apple Music plan.%0A%0APlatform: Apple Music%0AName: ${name}%0APackage: ${selected}`;

  return (
    <div className={`step-container ${step === 2 ? "slide-left" : ""}`}>
      {step === 1 && (
        <div className="step-content">
          <h3 id="roboto">Apple Music Setup</h3>
          <span id="roboto">
            <b>Let’s get you subscribed to Apple Music with ease.</b>
          </span>
          <br />
          <>
            <span>• Use Your Own Account</span>
            <span>• Access to over 100 million songs</span>
            <span>• High-quality audio</span>
            <span>• Lossless and Spatial Audio with Dolby Atmos</span>
            <span>• Ad-free listening</span>
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
          <div className="package">
            {["Monthly", "Bi-annual", "Annual"].map((pkg) => (
              <div
                key={pkg}
                className={`package-option ${
                  selected === pkg ? "selected" : ""
                }`}
                onClick={() => setSelected(pkg)}
              >
                <span>
                  {pkg === "Monthly"
                    ? "Monthly"
                    : pkg === "Bi-annual"
                    ? "Bi-Annual (6 Months)"
                    : "Annual (1 Year)"}
                </span>
                <b>
                  {pkg === "Monthly"
                    ? "UGX. 8,000"
                    : pkg === "Bi-annual"
                    ? "UGX. 45,000"
                    : "UGX. 90,000"}
                </b>
              </div>
            ))}
          </div>
          <label id="roboto">Names</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          {selected && name && (
            <a
              href={`https://wa.me/256706916240?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="start-button">
                <b id="roboto">Proceed to Whatsapp</b>
              </button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
