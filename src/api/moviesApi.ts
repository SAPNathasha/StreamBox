
import axios from "axios";

const BASE = "https://sampleapis.com/movies/api"; 

export const fetchMoviesByCategory = async (category = "animation") => {
  const url = `${BASE}/${category}`;
  const res = await axios.get(url);
  return res.data;
};

export const fetchMultipleCategories = async (categories: string[]) => {
  const results = await Promise.all(
    categories.map((c) => axios.get(`${BASE}/${c}`).then(r => r.data))
  );
  return results.flat();
};
