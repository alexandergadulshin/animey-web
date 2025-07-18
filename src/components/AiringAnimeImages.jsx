import { useEffect, useState } from "react";
import { fetchAiringAnime } from "../api/jikanApi";
import Carousel from "./carousel/carousel";

export default function AiringAnimeImages() {
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    fetchAiringAnime(10).then(setAnimes);
  }, []);
  if (!animes.length) return <div>Loading...</div>;
  const unique = Array.from(new Map(animes.map(a => [a.mal_id, a])).values());
  return <Carousel animes={unique} />;
} 