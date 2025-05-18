import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateMobileView = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateMobileView();
    window.addEventListener("resize", updateMobileView);

    return () => window.removeEventListener("resize", updateMobileView);
  }, []);

  const handleLoginClick = () => {
    setActiveButton("login");
    navigate("/login");
  };

  const handleSignupClick = () => {
    setActiveButton("signup");
    navigate("/signup");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav
      style={{
        ...styles.navbar,
        backgroundColor: isDarkMode ? "#111" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      <div style={styles.logo}>📰 News Summarizer</div>

      {/* Desktop Menu */}
      <ul
        style={{
          ...styles.navLinks,
          display: isOpen && isMobile ? "flex" : "block",
          flexDirection: isOpen && isMobile ? "column" : "row", // Stack items on mobile
          opacity: isOpen && isMobile ? 1 : 0,
          transition: "opacity 0.3s ease", // Smooth transition for menu visibility
        }}
      >
        <li style={styles.navItem}>
          <Link
            to="/"
            style={{
              ...styles.navLink,
              borderBottom: location.pathname === "/" ? "2px solid #fff" : "none",
              color: isDarkMode ? "#fff" : "#000",
            }}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link
            to="/categories"
            style={{
              ...styles.navLink,
              borderBottom: location.pathname === "/categories" ? "2px solid #fff" : "none",
              color: isDarkMode ? "#fff" : "#000",
            }}
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link
            to="/about"
            style={{
              ...styles.navLink,
              borderBottom: location.pathname === "/about" ? "2px solid #fff" : "none",
              color: isDarkMode ? "#fff" : "#000",
            }}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link
            to="/contact"
            style={{
              ...styles.navLink,
              borderBottom: location.pathname === "/contact" ? "2px solid #fff" : "none",
              color: isDarkMode ? "#fff" : "#000",
            }}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Login/Signup Button */}
      {!isMobile && (
        <div style={styles.authButtons}>
          <button
            style={
              activeButton === "login"
                ? { ...styles.loginBtn, backgroundColor: isDarkMode ? "#fff" : "#000", color: isDarkMode ? "#000" : "#fff" }
                : styles.loginBtn
            }
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            style={
              activeButton === "signup"
                ? { ...styles.signupBtn, backgroundColor: isDarkMode ? "#fff" : "#000", color: isDarkMode ? "#000" : "#fff" }
                : styles.signupBtn
            }
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Dark/Light Mode Toggle */}
      <button onClick={toggleTheme} style={styles.themeToggle}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Hamburger Menu (Mobile View) */}
      {isMobile && (
        <div style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      )}
    </nav>
  );
};

// Enhanced Styling with Animations
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    fontFamily: "'Arial', sans-serif",
    position: "sticky",
    top: "0",
    width: "100%",
    zIndex: "1000",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    transition: "all 0.3s ease",
  },
  navItem: {
    display: "inline",
  },
  navLink: {
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "5px 10px",
    transition: "0.3s",
  },
  authButtons: {
    display: "flex",
    gap: "10px",
  },
  loginBtn: {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    ":hover": {
      backgroundColor: "#007bff",
      color: "#fff",
    },
  },
  signupBtn: {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    ":hover": {
      backgroundColor: "#007bff",
      color: "#fff",
    },
  },
  themeToggle: {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    marginLeft: "10px",
  },
  hamburger: {
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "none",
  },
};

export default Navbar;
