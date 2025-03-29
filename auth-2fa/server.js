const express = require("express");
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");  

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS before defining routes
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const MONGO_URI = "mongodb://localhost:27017/users";
mongoose
.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB:", err));


// Use the routes
app.use('/api', authRoutes);
app.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Save user
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" });
  
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

// Fetch external news
app.get('/api/news/:category', async (req, res) => {
    const category = req.params.category;

    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }

    const apiUrl = `https://newsai-tibe.onrender.com/news/${category}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch news');

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
});

// Fetch summarized news
app.get('/api/news/summarize-url/:category', async (req, res) => {
    const category = req.params.category; // Fix: Use req.params instead of req.query

    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }

    const apiUrl = `https://newsai-tibe.onrender.com/summarize/${category}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch summarized news');

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching summarized news:", error);

        // Fallback dummy data
        const dummySummarizedNews = [
            { title: "Technology Advances in 2025", summary: "AI & quantum computing advancements.", image: "https://via.placeholder.com/150", url: "https://example.com/technology-advances-2025" },
            { title: "Global Sports Highlights", summary: "Major sports events and record-breaking performances.", image: "https://via.placeholder.com/150", url: "https://example.com/global-sports-highlights" },
            { title: "Political Developments", summary: "Governments focus on climate change and economy.", image: "https://via.placeholder.com/150", url: "https://example.com/political-developments" }
        ];

        res.json({ articles: dummySummarizedNews });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
