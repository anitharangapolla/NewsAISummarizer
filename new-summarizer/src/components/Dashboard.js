import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const search = queryParams.get("search");

  const headline = search ? `${search} News` : category ? `${category} News` : "Latest News";

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const endpoint = search
          ? `http://localhost:5000/api/news/search?query=${search}`
          : `http://localhost:5000/api/news/${category}`;
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setNewsData(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsData([]); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, search]);

  // Fallback image
  const fallbackImage = "https://via.placeholder.com/300";

  return (
    <div style={styles.page}>
      <h1 style={styles.headline}>{headline}</h1>
      {loading ? (
        <div style={styles.spinner}>Loading...</div> // You could use a spinner here
      ) : newsData.length === 0 ? (
        <p>No news found for the selected category or search term.</p>
      ) : (
        <div style={styles.newsGrid}>
          {newsData.map((news, index) => (
            <div key={index} style={styles.newsCard}>
              <img
                src={news.image || fallbackImage}
                alt="News"
                style={styles.newsImage}
              />
              <h3
               onClick={() =>
              navigate(
            `/news-details?title=${encodeURIComponent(news.title)}&image=${encodeURIComponent(news.image || "")}&url=${encodeURIComponent(news.url || "")}`
         )
    }

                style={{ color: "#00bcd4", cursor: "pointer", textDecoration: "underline" }}
              >
                {news.title}
              </h3>
              <p>{news.summary}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Read Full Article
              </a>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(news.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                Watch Related Video
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    textAlign: "center",
  },
  headline: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  spinner: {
    fontSize: "1.5rem",
    color: "#00bcd4",
  },
  newsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
  },
  newsCard: {
    backgroundColor: "#222",
    padding: "15px",
    borderRadius: "5px",
    textAlign: "left",
  },
  newsImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  link: {
    color: "#00bcd4",
    textDecoration: "none",
    fontWeight: "bold",
    display: "block",
    marginTop: "10px",
  },
};

export default DashboardPage;
