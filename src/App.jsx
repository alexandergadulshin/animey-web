import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnimeCard from "./components/AnimeCard";
import Profile from "./components/Profile";
import NavBarOut from "./components/NavBarOut";
import { LogoutButton } from "./components/AuthButton";

function AppContent() {
  return (
    <>
      <NavBarOut />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<AnimeCard />} />
        <Route path="/profile" element={<><Profile /><LogoutButton /></>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
