import React, { useState, useEffect } from 'react';
import { fetchNasaDataByDate } from '../services/nasaService';
import { saveData, loadData, saveCurrentDisplayedDate, loadCurrentDisplayedDate } from '../services/storageService';
import { parseDateInput } from '../services/dateService';
import RootView from '../views/RootView';

export default function RootContainer() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentDisplayedDate, setCurrentDisplayedDate] = useState(() => loadCurrentDisplayedDate() || {});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    setIsLoading(false);
    const storedData = loadData();
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const handleDate = ({ target }) => {
    setSelectedDate(parseDateInput(target.value));
  };

  const handleForm = (e) => {
    e.preventDefault();
    setCurrentDisplayedDate(selectedDate);
    setCurrentSlideIndex(0);
    saveCurrentDisplayedDate(selectedDate);

    fetchNasaDataByDate(selectedDate.fullDate)
      .then((responseData) => {
        saveData(responseData);
        setData(responseData);
      })
      .catch(console.error);
  };

  return (
    <RootView
      data={data}
      isLoading={isLoading}
      selectedDate={selectedDate}
      currentDisplayedDate={currentDisplayedDate}
      currentSlideIndex={currentSlideIndex}
      handleForm={handleForm}
      handleDate={handleDate}
      setCurrentSlideIndex={setCurrentSlideIndex}
    />
  );
}
