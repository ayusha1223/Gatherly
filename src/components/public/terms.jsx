import React, { useState } from "react";
import "../../styles/terms.css";
import "../../App.css";

const Terms = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>
      <p>Welcome to Gatherly! By signing up, you agree to follow our policies. Here are the terms:</p>
      <ul>
        <li>You must provide accurate and complete information.</li>
        <li>You are responsible for maintaining the security of your account.</li>
        <li>We reserve the right to suspend accounts for any violations.</li>
        <li>We may update our terms at any time.</li>
        <li>Users should be above 18 years old.</li>
        <li>Event organizers must ensure compliance with local laws and safety regulations.</li>
        <li>Participants must adhere to event guidelines and respect other attendees.</li>
      </ul>
      <div className="input-group">
        <input
          type="checkbox"
          id="agree"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="agree">I have read and agree to the Terms & Conditions.</label>
      </div>
      <button className="accept-btn" disabled={!isChecked}>Accept</button>
    </div>
  );
};

export default Terms;
