import React from "react";

const ContactPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.headline}>Contact Us</h1>
      <p style={styles.description}>
        Have questions or feedback? We'd love to hear from you! Reach out to us at:
      </p>
      <p style={styles.email}>📧 support@newssummarizer.com</p>
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
};

export default ContactPage;