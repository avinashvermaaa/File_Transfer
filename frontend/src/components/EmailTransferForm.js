import React, { useState } from "react";

const EmailTransferForm = () => {
  const [form, setForm] = useState({
    emailTo: "",
    yourEmail: "",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="email-transfer show">
      <input
        type="email"
        name="emailTo"
        placeholder="Email to"
        value={form.emailTo}
        onChange={handleChange}
      />
      <input
        type="email"
        name="yourEmail"
        placeholder="Your email"
        value={form.yourEmail}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
      />
      <button>Transfer</button>
    </div>
  );
};

export default EmailTransferForm;
