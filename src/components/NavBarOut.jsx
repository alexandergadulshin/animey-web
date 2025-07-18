import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Hamburger from "./hamburger/Hamburger";
import "../global.css";

export default function NavBarOut() {
  return (
    <div class="w-full">
      <nav class="bg-dark-purple shadow-lg p-3 flex items-center justify-between rounded-xl">
        <div class="flex items-center">
          <Link to="/" class="text-violet-400 font-bold text-lg mr-6 transition-colors hover:text-white">Home</Link>
          <Link to="/anime" class="text-white/80 hover:text-primary font-medium mr-6 transition-colors">Anime Card</Link>
          <Link to="/profile" class="text-white/80 hover:text-primary font-medium transition-colors">Profile</Link>
        </div>
        <div class="flex items-center gap-3">
          <Hamburger />
        </div>
      </nav>
      <div class="w-full flex justify-center mt-3 mb-6">
        <div class="h-2 w-3/4 bg-primary/30 rounded-full" style={{maxWidth: 600}}></div>
      </div>
    </div>
  );
}