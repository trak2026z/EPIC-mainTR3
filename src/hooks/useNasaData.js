import { useState, useEffect } from 'react';
import { fetchNasaDataByDate } from '../services/nasaService';
import { saveData, loadData } from '../services/storageService';

/**
 * Custom hook do pobierania danych NASA API i trzymania ich w stanie + localStorage.
 * Zwraca dane, status ładowania, ewentualny błąd i funkcję do pobierania po dacie.
 */
export function useNasaData(initialDate) {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ładowanie danych z localStorage na starcie
  useEffect(() => {
    const storedData = loadData();
    if (storedData) {
      setData(storedData);
    }
    setIsLoading(false);
  }, []);

  // Funkcja do pobierania danych z NASA API po dacie
  const fetchByDate = async (date) => {
    if (!date) return;
    setIsLoading(true);
    try {
      const fetched = await fetchNasaDataByDate(date);
      const wrappedData = { data: fetched };
      saveData(wrappedData);
      setData(wrappedData);
      setError(null);
    } catch (err) {
      console.error('Błąd pobierania danych NASA:', err);
      setError(err?.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchByDate };
}
