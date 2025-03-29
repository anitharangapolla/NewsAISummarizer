import React from "react";
import { useNavigate } from "react-router-dom";

// Import static images
import technologyImage from "../assets/images/technology.jpg";
import sportsImage from "../assets/images/sports.jpg";
import politicsImage from "../assets/images/politics.jpg";
import businessImage from "../assets/images/business.jpg";
import healthImage from "../assets/images/health.jpg";
import entertainmentImage from "../assets/images/entertainment.jpg";

const CategoriesPage = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Technology", image: technologyImage },
    { name: "Sports", image: sportsImage },
    { name: "Politics", image: politicsImage },
    { name: "Business", image: businessImage },
    { name: "Health", image: healthImage },
    { name: "Entertainment", image: entertainmentImage },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/dashboard?category=${category}`);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.headline}>Explore Categories</h1>
      <div style={styles.categories}>
        {categories.map((category) => (
          <div
            key={category.name}
            style={styles.categoryCard}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div style={styles.imageWrapper}>
              <img src={category.image} alt={category.name} style={styles.categoryImage} />
              <div style={styles.imageOverlay}></div>
            </div>
            <h3 style={styles.categoryName}>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    background: "linear-gradient(135deg, #1e1e1e, #000)", // Gradient background
    color: "#fff",
    minHeight: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    padding: "20px",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "50px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#f0f0f0",
  },
  categories: {
    display: "grid",
   gridTemplateRows: "repeat(auto-fit, minmax(200px, 2fr))", // Adjusts dynamically for responsiveness
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Adjusts dynamically for responsiveness
    gap: "50px", // Reduced gap for smaller screens
    width: "100%", 
    padding: "20px",
    maxWidth: "1200px",
  },
  categoryCard: {
    backgroundColor: "#222",
    borderRadius: "15px",
    overflow: "hidden",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    position: "relative",
  },
  categoryCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
  },
  imageWrapper: {
    position: "relative",
    overflow: "hidden",
  },
  categoryImage: {
    width: "100%",
    height: "200px", // Adjusted height for better responsiveness
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
  },
  imageOverlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
    opacity: "0",
    transition: "opacity 0.3s ease-in-out",
  },
  categoryCardHoverImage: {
    transform: "scale(1.1)", // Zoom effect on hover
  },
  categoryCardHoverOverlay: {
    opacity: "1", // Show overlay on hover
  },
  categoryName: {
    fontSize: "1.5rem", // Adjusted font size for better responsiveness
    fontWeight: "bold",
    color: "#fff",
    padding: "10px 0",
    backgroundColor: "#333",
    margin: "0",
  },
};

export default CategoriesPage;