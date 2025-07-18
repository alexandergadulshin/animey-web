import axios from "axios";

export const fetchTopAnime = async (limit = 10) => (await axios.get(`https://api.jikan.moe/v4/top/anime?limit=${limit}`)).data.data || [];
export const fetchAiringAnime = async (limit = 10) => (await axios.get(`https://api.jikan.moe/v4/seasons/now?limit=${limit}`)).data.data || []; 