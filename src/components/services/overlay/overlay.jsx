import { useEffect, useState } from "react";
import "./OverlayForm.css";

export default function OverlayForm({
  service,
  form,
  setForm,
  onClose,
  isClosing,
}) {

  const [selectedPlan, setSelectedPlan] = useState(service.prices[0].plan);
  const [isGift, setIsGift] = useState(false);
  const [giftDetails, setGiftDetails] = useState({
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGiftChange = (e) => {
    setGiftDetails({ ...giftDetails, [e.target.name]: e.target.value });
  };

  const toggleGift = () => setIsGift((prev) => !prev);

  const handleSubmit = () => {
    let message = `Hello! I'd like to subscribe to ${service.name}.\nPlan: ${selectedPlan}\n\n`;

    if (isGift) {
      message += `Sending as a gift!\nSender Name: ${form.name}\n\nRecipient Name: ${giftDetails.recipientName}\nRecipient Phone: ${giftDetails.recipientPhone}`;
    } else {
      message += `Name: ${form.name}`;
    }

    const whatsappLink = `https://wa.me/256706916240?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className={`overlay-form ${isClosing ? "closing" : ""}`}>
      <div className="form-content">
        <div className="cover">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div
          className="plan-selector cover"
          role="radiogroup"
          aria-label="Select Plan"
        >
          <span>Select Plan</span>
          {service.prices.map((priceObj, i) => (
            <label
              key={i}
              className={`custom-radio ${
                selectedPlan === priceObj.plan ? "checked" : ""
              }`}
              onClick={() => setSelectedPlan(priceObj.plan)}
            >
              <input
                type="radio"
                name="plan"
                checked={selectedPlan === priceObj.plan}
                readOnly
              />
              {priceObj.plan} - {priceObj.price.toLocaleString("en-US")} UGX
            </label>
          ))}
        </div>

        {isGift && (
          <div className="cover">
            <label htmlFor="recipientName">Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              placeholder="Recipient name"
              value={giftDetails.recipientName}
              onChange={handleGiftChange}
            />
            <label htmlFor="recipientPhone">Recipient Phone</label>
            <input
              type="tel"
              name="recipientPhone"
              placeholder="Recipient WhatsApp number"
              value={giftDetails.recipientPhone}
              onChange={handleGiftChange}
            />
          </div>
        )}

        <div className="gift-toggle" onClick={toggleGift}>
          <b>Send as a Gift?</b>
          <div className={`switch ${isGift ? "on" : ""}`}>
            <div className="dot" />
          </div>
        </div>

        <div className="cover">
          <button onClick={handleSubmit}>Proceed to WhatsApp</button>
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
