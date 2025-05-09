import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import CategoriesPage from "./components/CategoriesPage"; 
import Dashboard from "./components/Dashboard"; 
import NewsDetailsPage from "./components/NewsDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/categories" element={<CategoriesPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/news-details" element={<NewsDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;