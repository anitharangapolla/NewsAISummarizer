import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.headline}>News Summarizer</h1>
        <p style={styles.description}>
          Simplify your news consumption with concise summaries. Stay informed, save time, and explore the topics that matter most.
        </p>
        <div style={styles.ctaButtons}>
          <button 
            onClick={handleLogin} 
            style={styles.ctaButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Login
          </button>
          <button 
            onClick={handleSignup} 
            style={styles.ctaButtonOutline}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#007bff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#ffffff';
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#121212", // Dark black background
    color: "#f5f5f5", // Light gray text
    minHeight: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  hero: {
    padding: "50px 20px",
    borderRadius: "10px",
    marginBottom: "30px",
    color: "#f5f5f5",
    textAlign: "center",
    maxWidth: "800px",
  },
  headline: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#ffffff", // White text
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    lineHeight: "1.6",
    color: "#dcdcdc", // Slightly lighter gray for description
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap", // Ensures buttons stack on smaller screens
  },
  ctaButton: {
    padding: "12px 25px",
    borderRadius: "5px",
    backgroundColor: "#007bff", // Blue button background
    color: "#ffffff", // White text
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
    cursor: "pointer",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Subtle shadow
  },
  ctaButtonOutline: {
    padding: "12px 25px",
    borderRadius: "5px",
    backgroundColor: "transparent",
    color: "#ffffff", // White text
    border: "2px solid #ffffff", // White border
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
    cursor: "pointer",
  },
  // Responsive Design
  '@media (max-width: 768px)': {
    headline: {
      fontSize: "2rem", // Decrease font size on smaller screens
    },
    description: {
      fontSize: "1rem", // Adjust description font size for smaller screens
    },
    ctaButtons: {
      flexDirection: "column", // Stack buttons vertically
      gap: "10px", // Reduce gap between buttons
    },
    ctaButton: {
      padding: "10px 20px", // Smaller padding for buttons
    },
    ctaButtonOutline: {
      padding: "10px 20px", // Smaller padding for outline button
    },
  },

  '@media (max-width: 480px)': {
    headline: {
      fontSize: "1.5rem", // Even smaller headline on very small devices
    },
    description: {
      fontSize: "0.9rem", // Even smaller description text
    },
    ctaButton: {
      padding: "10px 15px", // Smaller button size for very small devices
    },
    ctaButtonOutline: {
      padding: "10px 15px", // Matching padding for outline button
    },
  },
};

export default HomePage;
