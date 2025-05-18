import React from "react";

const AboutPage = () => {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.headline}>About News Summarizer</h1>
        <p style={styles.description}>
          News Summarizer is your go-to platform for staying informed with the latest news. We provide concise and accurate summaries of news articles, saving you time while keeping you updated on the topics that matter most.
        </p>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.featureList}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Quick Summaries</h3>
            <p style={styles.featureDescription}>
              Get the essence of news articles in just a few lines, so you can stay informed without spending hours reading.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Wide Coverage</h3>
            <p style={styles.featureDescription}>
              From technology to politics, sports to entertainment, we cover a wide range of topics to suit your interests.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>User-Friendly</h3>
            <p style={styles.featureDescription}>
              Our platform is designed to be simple and intuitive, making it easy for anyone to use.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div style={styles.mission}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.missionText}>
          At News Summarizer, our mission is to make information accessible and digestible for everyone. We believe in empowering individuals with knowledge while respecting their time.
        </p>
      </div>
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
  hero: {
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    padding: "50px 20px",
    borderRadius: "10px",
    marginBottom: "30px",
    color: "#fff",
  },
  headline: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  features: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  },
  featureList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  featureCard: {
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "left",
  },
  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  featureDescription: {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  mission: {
    marginTop: "30px",
  },
  missionText: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    margin: "0 auto",
    maxWidth: "800px",
  },
};

export default AboutPage;