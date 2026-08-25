import { useState } from 'react';
import './EnquiryForm.css';

export default function EnquiryForm({ variant = 'dark', presetType = null }) {
  const [formData, setFormData] = useState({
    enquiryType: presetType || '',
    country: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    captcha: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.enquiryType) newErrors.enquiryType = 'Required';
    if (!formData.country) newErrors.country = 'Required';
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    if (!formData.phone) newErrors.phone = 'Required';
    if (!formData.message) newErrors.message = 'Required';
    if (!formData.captcha) newErrors.captcha = 'Required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Thank you for your enquiry. We will be in touch soon!');
      setFormData({
        enquiryType: presetType || '',
        country: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        captcha: '',
      });
    }
  };

  return (
    <form className={`enquiry-form enquiry-${variant}`} onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="enquiry-type">Select Enquiry Type*</label>
        <select
          id="enquiry-type"
          name="enquiryType"
          value={formData.enquiryType}
          onChange={handleChange}
          className={errors.enquiryType ? 'error' : ''}
        >
          <option value="">Choose...</option>
          <option value="managed-switches">Managed Switches — new programme</option>
          <option value="hardware">Hardware Products</option>
          <option value="manufacturing">Manufacturing Services</option>
          <option value="other">Other</option>
        </select>
        {errors.enquiryType && <span className="error-text">{errors.enquiryType}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="country">Select Country*</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={errors.country ? 'error' : ''}
        >
          <option value="">Choose...</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="europe">Europe</option>
          <option value="other">Other</option>
        </select>
        {errors.country && <span className="error-text">{errors.country}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="first-name">First Name*</label>
          <input
            id="first-name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email ID*</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Contact No*</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message*</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={errors.message ? 'error' : ''}
        ></textarea>
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <div className="form-group captcha-group">
        <div className="captcha-row">
          <code className="captcha-code">A7K9Q2</code>
          <button type="button" className="captcha-refresh">↻</button>
        </div>
        <label htmlFor="captcha">Enter captcha code*</label>
        <input
          id="captcha"
          type="text"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          className={errors.captcha ? 'error' : ''}
          placeholder="Enter above code"
        />
        {errors.captcha && <span className="error-text">{errors.captcha}</span>}
      </div>

      <button type="submit" className="form-submit">Send</button>
    </form>
  );
}
