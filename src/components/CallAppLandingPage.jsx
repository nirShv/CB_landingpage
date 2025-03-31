import { useState } from "react";
import "../index.css";

export default function CallAppLandingPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    contactName: "",
    industry: "",
  });

  const [errors, setErrors] = useState({});

  const industries = [
    "Telecommunications",
    "Healthcare",
    "Finance",
    "Retail",
    "Real Estate",
    "Customer Support",
    "Other",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.businessName || formData.businessName.length < 2)
      newErrors.businessName = "Business name is required.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "A valid email is required.";
    if (formData.contactName && formData.contactName.length < 2)
      newErrors.contactName = "Name must be at least 2 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await fetch("https://formspree.io/f/mrbpadjl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            BusinessName: formData.businessName,
            Email: formData.email,
            ContactName: formData.contactName,
            Industry: formData.industry,
          }),
        });
        setFormSubmitted(true);
      } catch (error) {
        console.error("Submission failed", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className="form-title">CallApp for Business</h1>
        <p className="form-description">
          Branded. Verified. Trusted. <br />
          Upgrade every call into a trusted, recognizable, and branded experience.
          Join the business revolution with CallApp for Business and enhance your answer rates today.
        </p>

        {!formSubmitted ? (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Business Name*</label>
              <input
                type="text"
                className="form-input"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
              {errors.businessName && <p className="form-error">{errors.businessName}</p>}
            </div>

            <div className="form-group">
              <label>Email Address*</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Contact Person</label>
              <input
                type="text"
                className="form-input"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              />
              {errors.contactName && <p className="form-error">{errors.contactName}</p>}
            </div>

            <div className="form-group">
              <label>Industry</label>
              <select
                className="form-input"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              >
                <option value="">Select an industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="form-button">
              Get Early Access
            </button>
          </form>
        ) : (
          <div className="thank-you-message">
            Thank you for your inquiry! Our representatives will contact you within 3 business days.
          </div>
        )}
      </div>
    </div>
  );
}
