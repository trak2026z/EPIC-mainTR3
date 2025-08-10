import React, { useState, useEffect } from 'react';
import { fetchNasaDataByDate } from '../services/nasaService';
import { saveData, loadData, saveCurrentDisplayedDate, loadCurrentDisplayedDate } from '../services/storageService';
import { parseDateInput } from '../services/dateService'; 
import { distanceBetweenObjects } from '../services/mathService';

import 'swiper/css';
import 'views/App.css';
import 'swiper/css/navigation';
import { GlobalStyle } from 'assets/styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { StyledContainer } from 'components/templates/StyledContainer/StyledContainer.style';
import { StyledWrapper } from 'components/templates/StyledWrapper/StyledWrapper.style';
import SwiperComponent from 'components/organisms/SwiperComponent/SwiperComponent';
import LeftComponent from 'components/organisms/LeftComponent/LeftComponent';
import CurrentSlideInfo from 'components/molecues/CurrentSlideInfo/CurrentSlideInfo';


function Root() {
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
            .then((data) => {
                saveData(data);
                setData({ data });
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <StyledContainer>
                {!isLoading && (
                    <StyledWrapper>
                        <div className="left">
                            <LeftComponent
                                handleForm={handleForm}
                                handleDate={handleDate}
                                isLoading={isLoading}
                                data={data.data}
                                currentSlideIndex={currentSlideIndex}
                                distanceBetweenObjects={distanceBetweenObjects}
                            />
                        </div>
                        <div className="right">
                            {data.data && data.data.length > 0 && (
                                <>
                                    <SwiperComponent
                                        data={data.data}
                                        currentDisplayedDate={currentDisplayedDate}
                                        setCurrentSlideIndex={setCurrentSlideIndex}
                                    />
                                    <CurrentSlideInfo currentSlideIndex={currentSlideIndex + 1} allSlides={data.data.length} />
                                </>
                            )}
                            {data.data && data.data.length === 0 && <p>No images available for the selected date.</p>}
                        </div>
                    </StyledWrapper>
                )}
            </StyledContainer>
        </ThemeProvider>
    );
}

export default Root;
