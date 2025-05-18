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
app.use('/api', authRoutes)

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
app.post('/api/summarize-url', async (req, res) => {
    const { url, summary_length } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        const response = await fetch("https://newsai-tibe.onrender.com/summarize-url/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, summary_length: summary_length || 5 }),
        });

        if (!response.ok) throw new Error('Failed to fetch summary');

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching summary:", error);
        res.status(500).json({ message: "Error fetching summary", error: error.message });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
