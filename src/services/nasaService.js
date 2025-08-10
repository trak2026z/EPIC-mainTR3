// src/services/nasaService.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.nasa.gov/EPIC/api/natural";

export async function fetchNasaDataByDate(fullDate) {
  try {
    const response = await axios.get(`${BASE_URL}/date/${fullDate}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    throw error;
  }
}
