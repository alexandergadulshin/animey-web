import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home";
import AnimeCard from "./components/AnimeCard";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";

const AppContent = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  console.log("isLoading:", isLoading, "isAuthenticated:", isAuthenticated, "user:", user);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <>
      <nav style={{ padding: 16, background: "#2a9d8f" }}>
        <Link to="/" style={{ color: "white", marginRight: 16 }}>Home</Link>
        <Link to="/anime" style={{ color: "white", marginRight: 16 }}>Anime Card</Link>
        <Link to="/profile" style={{ color: "white", marginRight: 16 }}>Profile</Link>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<AnimeCard />} />
        <Route path="/profile" element={<><Profile /><LogoutButton /></>} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
