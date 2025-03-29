import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
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
          throw new Error("Failed to fetch summarized news");
        }

        const data = await response.json();

        const summarizedData = (data.articles || []).map((article) => ({
          ...article,
          summary: article.summary || generateDummySummary(),
        }));

        setNewsData(summarizedData);
      } catch (error) {
        console.error("Error fetching summarized news:", error);

        const dummyData = generateDummyArticles();
        setNewsData(dummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, search]);

  // const handleSearch = () => {
  //   if (searchTerm.trim() === "") {
  //     alert("Please enter a search term.");
  //     return;
  //   }
  //   navigate(`/dashboard?search=${searchTerm}`);
  // };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  const generateDummySummary = () => {
    const sampleText = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `;
    return sampleText.split(" ").slice(0, 100).join(" ");
  };

  const generateDummyArticles = () => {
    return [
      {
        title: "Dummy News 1",
        summary: generateDummySummary(),
        image: "https://via.placeholder.com/300",
        url: "https://example.com/dummy-news-1",
      },
      {
        title: "Dummy News 2",
        summary: generateDummySummary(),
        image: "https://via.placeholder.com/300",
        url: "https://example.com/dummy-news-2",
      },
      {
        title: "Dummy News 3",
        summary: generateDummySummary(),
        image: "https://via.placeholder.com/300",
        url: "https://example.com/dummy-news-3",
      },
    ];
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.headline}>{headline}</h1>
      <div style={styles.searchContainer}>
        {/* <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger search on Enter key press
          style={styles.searchBar}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          Search
        </button> */}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.newsGrid}>
          {newsData.map((news, index) => (
            <div key={index} style={styles.newsCard}>
              <img src={news.image || "https://via.placeholder.com/300"} alt="News" style={styles.newsImage} />
              <h3>{news.title}</h3>
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
  // searchContainer: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: "20px",
  // },
  // searchBar: {
  //   width: "100%",
  //   maxWidth: "500px",
  //   padding: "15px",
  //   borderRadius: "8px",
  //   border: "1px solid #444",
  //   backgroundColor: "#2c2c2c",
  //   color: "#fff",
  //   fontSize: "1.2rem",
  //   outline: "none",
  // },
  // searchButton: {
  //   padding: "15px 20px",
  //   marginLeft: "10px",
  //   backgroundColor: "#007bff",
  //   color: "#fff",
  //   border: "none",
  //   borderRadius: "8px",
  //   cursor: "pointer",
  //   fontWeight: "bold",
  //   transition: "background-color 0.3s",
  // },
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