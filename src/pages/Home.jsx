import { useEffect, useState } from "react";
import { fetchAiringAnime } from "../api/jikanApi";
import Carousel from "../components/carousel/carousel";

export default function Home() {
  const [animes, setAnimes] = useState();
  useEffect(() => {
    fetchAiringAnime(20).then(animes => {
      const seen = new Set();
      setAnimes(animes.filter(a => {
        if (seen.has(a.mal_id) || !a.images?.jpg?.image_url) return false;
        seen.add(a.mal_id);
        return true;
      }));
    });
  }, []);
  if (!animes) return <div>Loading...</div>;
  return (
    <div>
      <h1 class="text-3xl font-bold mb-2 mt-2 text-white drop-shadow-lg text-left px-8" style={{ letterSpacing: '0.01em' }}>
        Popular: <span class="text-pink-400">New Releases</span>
      </h1>
      <Carousel animes={animes} />
    </div>
  );
}