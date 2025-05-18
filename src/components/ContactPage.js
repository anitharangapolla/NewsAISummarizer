import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    // Handle form submission logic here (like sending an email or saving to database)
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.headline}>Contact Us</h1>
      <p style={styles.description}>
        Have questions or feedback? We'd love to hear from you! Reach out to us at:
      </p>
      <p style={styles.email}>
        📧 <a href="mailto:support@newssummarizer.com" style={styles.link}>support@newssummarizer.com</a>
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange}
          style={styles.textarea}
          required
        ></textarea>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#111",
    color: "#fff",
    minHeight: "100vh",
    textAlign: "center",
  },
  headline: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  email: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  link: {
    color: "#00bcd4",
    textDecoration: "none",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    width: "300px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    margin: "10px 0",
    width: "300px",
    height: "150px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#00bcd4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
};

export default ContactPage;
