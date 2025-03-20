import React, { useState } from "react";

const LinkTransferForm = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="link-transfer show">
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
      <button>Get a link</button>
    </div>
  );
};

export default LinkTransferForm;
