import React, { useState } from 'react';
import { useNasaData } from '../hooks/useNasaData';
import { saveCurrentDisplayedDate, loadCurrentDisplayedDate } from '../services/storageService';

import { parseDateInput } from '../services/dateService';
import RootView from '../views/RootView';

export default function RootContainer() {
  const { data, isLoading, error, fetchByDate } = useNasaData();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDisplayedDate, setCurrentDisplayedDate] = useState(
    () => loadCurrentDisplayedDate() || {}
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Odległość między obiektami
  const distanceBetweenObjects = (posA, posB) => {
    const distance = Math.sqrt(
      Math.pow(posB.x - posA.x, 2) +
        Math.pow(posB.y - posA.y, 2) +
        Math.pow(posB.z - posA.z, 2)
    );
    return `${Number(distance.toFixed(2))}km`;
  };

  const handleDate = ({ target }) => {
    setSelectedDate(parseDateInput(target.value));
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!selectedDate?.fullDate) return;

    setCurrentDisplayedDate(selectedDate);
    setCurrentSlideIndex(0);
    saveCurrentDisplayedDate(selectedDate);

    fetchByDate(selectedDate.fullDate);
        
      };
  

  return (
    <RootView
      data={data}
      isLoading={isLoading}
      error={error}
      selectedDate={selectedDate}
      currentDisplayedDate={currentDisplayedDate}
      currentSlideIndex={currentSlideIndex}
      handleForm={handleForm}
      handleDate={handleDate}
      setCurrentSlideIndex={setCurrentSlideIndex}
      distanceBetweenObjects={distanceBetweenObjects}
    />
  );
}
