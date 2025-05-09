import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NewsDetailsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");
  const image = queryParams.get("image");

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  const fallbackSummary = `
    This news article provides insights on the recent developments regarding the topic. 
    Stay informed with a detailed summary covering all critical aspects and background context. 
    For more updates, follow reliable news sources or watch expert discussions.
  `;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/news/summary?title=${encodeURIComponent(title)}`
        );
        const data = await response.json();
        setSummary(data.summary || fallbackSummary);
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary(fallbackSummary);
      } finally {
        setLoading(false);
      }
    };

    if (title) fetchSummary();
  }, [title]);

  if (!title) {
    return (
      <div style={styles.page}>
        <p style={styles.text}>No news article selected.</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.contentWrapper}>
        {image && (
          <div style={styles.imageWrapper}>
            <img src={image} alt="News" style={styles.image} />
          </div>
        )}
        <div style={styles.textWrapper}>
          <h1 style={styles.title}>{title}</h1>
          <div style={styles.summaryContainer}>
            {loading ? (
              <p style={styles.text}>Loading summary...</p>
            ) : (
              <p style={styles.text}>{summary}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  imageWrapper: {
    flex: "1",
    maxHeight: "450px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },
  textWrapper: {
    flex: "1",
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "bold",
    marginBottom: "20px",
    borderBottom: "1px solid #444",
    paddingBottom: "10px",
  },
  summaryContainer: {
    fontSize: "1.15rem",
    lineHeight: "1.7",
  },
  text: {
    whiteSpace: "pre-wrap",
    color: "#ccc",
  },
};

// Make layout responsive
styles.contentWrapper = {
  ...styles.contentWrapper,
  flexDirection: "column",
  '@media (min-width: 768px)': {
    flexDirection: "row",
  },
};

export default NewsDetailsPage;
