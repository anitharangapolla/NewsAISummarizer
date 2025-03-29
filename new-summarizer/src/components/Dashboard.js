// // import React, { useState, useEffect } from "react";
// // import { useLocation } from "react-router-dom";

// // const DashboardPage = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const location = useLocation();

// //   const queryParams = new URLSearchParams(location.search);
// //   const category = queryParams.get("category");

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       setLoading(true);
// //       try {
// //         // Replace this with your actual API endpoint
// //         const response = await fetch(`http://localhost:5000/api/news/${category}`);
// //         const data = await response.json();

// //         // Generate dummy summaries if the API does not provide them
// //         const dummyData = (data.articles || []).map((article) => ({
// //           ...article,
// //           summary: article.summary || generateDummySummary(),
// //         }));

// //         setNewsData(dummyData);
// //       } catch (error) {
// //         console.error("Error fetching news:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchNews();
// //   }, [category]);

// //   // Function to generate a dummy summary
// //   const generateDummySummary = () => {
// //     const sampleText = `
// //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
// //       Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
// //       dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
// //       proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci 
// //       a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer 
// //       in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut 
// //       ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat 
// //       mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
// //       Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque 
// //       nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, 
// //       mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
// //     `;
// //     return sampleText.split(" ").slice(0, 500).join(" "); // Limit to 100 words (~20–30 lines)
// //   };

// //   return (
// //     <div style={styles.page}>
// //       <h1 style={styles.headline}>{category} News</h1>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <div style={styles.newsGrid}>
// //           {newsData.map((news, index) => (
// //             <div key={index} style={styles.newsCard}>
// //               <img src={news.image || "https://via.placeholder.com/300"} alt="News" style={styles.newsImage} />
// //               <h3>{news.title}</h3>
// //               <p>{news.summary}</p>
// //               <a href={news.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
// //                 Read Full Article
// //               </a>
// //               <a
// //                 href={`https://www.youtube.com/results?search_query=${encodeURIComponent(news.title)}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 style={styles.link}
// //               >
// //                 Watch Related Video
// //               </a>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const styles = {
// //   page: {
// //     padding: "20px",
// //     fontFamily: "'Arial', sans-serif",
// //     backgroundColor: "#000",
// //     color: "#fff",
// //     minHeight: "100vh",
// //     textAlign: "center",
// //   },
// //   headline: {
// //     fontSize: "2rem",
// //     fontWeight: "bold",
// //     marginBottom: "20px",
// //   },
// //   newsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
// //     gap: "15px",
// //   },
// //   newsCard: {
// //     backgroundColor: "#222",
// //     padding: "15px",
// //     borderRadius: "5px",
// //     textAlign: "left",
// //   },
// //   newsImage: {
// //     width: "100%",
// //     height: "150px",
// //     objectFit: "cover",
// //     borderRadius: "5px",
// //     marginBottom: "10px",
// //   },
// //   link: {
// //     color: "#00bcd4",
// //     textDecoration: "none",
// //     fontWeight: "bold",
// //     display: "block",
// //     marginTop: "10px",
// //   },
// // };

// // export default DashboardPage;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const DashboardPage = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const category = queryParams.get("category");

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         // Fetch summarized news from the API
//         const response = await fetch(`http://localhost:5000/api/news/${category}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch summarized news");
//         }

//         const data = await response.json();

//         // Use the fetched data if available
//         const summarizedData = (data.articles || []).map((article) => ({
//           ...article,
//           summary: article.summary || generateDummySummary(),
//         }));

//         setNewsData(summarizedData);
//       } catch (error) {
//         console.error("Error fetching summarized news:", error);

//         // Fallback to dummy summaries if the API call fails
//         const dummyData = generateDummyArticles();
//         setNewsData(dummyData);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, [category]);

//   // Function to generate a dummy summary
//   const generateDummySummary = () => {
//     const sampleText = `
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//       Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
//       dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
//       proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci 
//       a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer 
//       in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut 
//       ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat 
//       mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
//       Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque 
//       nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, 
//       mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
//     `;
//     return sampleText.split(" ").slice(0, 100).join(" "); // Limit to 100 words (~20–30 lines)
//   };

//   // Function to generate dummy articles
//   const generateDummyArticles = () => {
//     return [
//       {
//         title: "Dummy News 1",
//         summary: generateDummySummary(),
//         image: "https://via.placeholder.com/300",
//         url: "https://example.com/dummy-news-1",
//       },
//       {
//         title: "Dummy News 2",
//         summary: generateDummySummary(),
//         image: "https://via.placeholder.com/300",
//         url: "https://example.com/dummy-news-2",
//       },
//       {
//         title: "Dummy News 3",
//         summary: generateDummySummary(),
//         image: "https://via.placeholder.com/300",
//         url: "https://example.com/dummy-news-3",
//       },
//     ];
//   };

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.headline}>{category} News</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div style={styles.newsGrid}>
//           {newsData.map((news, index) => (
//             <div key={index} style={styles.newsCard}>
//               <img src={news.image || "https://via.placeholder.com/300"} alt="News" style={styles.newsImage} />
//               <h3>{news.title}</h3>
//               <p>{news.summary}</p>
//               <a href={news.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
//                 Read Full Article
//               </a>
//               <a
//                 href={`https://www.youtube.com/results?search_query=${encodeURIComponent(news.title)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={styles.link}
//               >
//                 Watch Related Video
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   page: {
//     padding: "20px",
//     fontFamily: "'Arial', sans-serif",
//     backgroundColor: "#000",
//     color: "#fff",
//     minHeight: "100vh",
//     textAlign: "center",
//   },
//   headline: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   },
//   newsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: "15px",
//   },
//   newsCard: {
//     backgroundColor: "#222",
//     padding: "15px",
//     borderRadius: "5px",
//     textAlign: "left",
//   },
//   newsImage: {
//     width: "100%",
//     height: "150px",
//     objectFit: "cover",
//     borderRadius: "5px",
//     marginBottom: "10px",
//   },
//   link: {
//     color: "#00bcd4",
//     textDecoration: "none",
//     fontWeight: "bold",
//     display: "block",
//     marginTop: "10px",
//   },
// };

// export default DashboardPage; 

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Fetch summarized news from the API
        const response = await fetch(`http://localhost:5000/api/news/${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch summarized news");
        }

        const data = await response.json();

        // Use the fetched data if available
        const summarizedData = (data.articles || []).map((article) => ({
          ...article,
          summary: article.summary || generateDummySummary(),
        }));

        setNewsData(summarizedData);
      } catch (error) {
        console.error("Error fetching summarized news:", error);

        // Fallback to dummy summaries if the API call fails
        const dummyData = generateDummyArticles();
        setNewsData(dummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  // Function to generate a dummy summary
  const generateDummySummary = () => {
    const sampleText = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci 
      a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer 
      in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut 
      ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat 
      mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
      Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque 
      nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, 
      mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
    `;
    return sampleText.split(" ").slice(0, 100).join(" "); // Limit to 100 words (~20–30 lines)
  };

  // Function to generate dummy articles
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
      <h1 style={styles.headline}>{category} News</h1>
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