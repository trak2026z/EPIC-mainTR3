import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const API_KEY = process.env.REACT_APP_API_KEY;

function Root() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentDisplayedDate, setCurrentDisplayedDate] = useState(JSON.parse(window.localStorage.getItem('currentDisplayedDate')) || {});
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    useEffect(() => {
        setIsLoading(false);
        if (window.localStorage !== undefined) {
            const data = window.localStorage.getItem('data');
            if (data) {
                setData(JSON.parse(data));
            }
        }
    }, []);

    const handleDate = ({ target }) => {
        const fullDate = target.value;
        const dateObject = new Date(target.value);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        setSelectedDate({
            fullDate,
            day,
            month,
            year,
        });
    };

    const handleForm = (e) => {
        e.preventDefault();
        setCurrentDisplayedDate(selectedDate);
        setCurrentSlideIndex(0);
        localStorage.setItem('currentDisplayedDate', JSON.stringify(selectedDate));
        axios
//            .get(`https://api.nasa.gov/EPIC/api/natural/date/${selectedDate.fullDate}?api_key=d9G1A1OxV1OBV3hLs4Zpo5aGBojsIUFgBfbAadwf`)
              .get(`https://api.nasa.gov/EPIC/api/natural/date/${selectedDate.fullDate}?api_key=${API_KEY}`)
            .then(function (response) {
                localStorage.setItem('data', JSON.stringify(response));
                setData(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const distanceBetweenObjects = (posA, posB) => {
        const distance = Math.sqrt(Math.pow(posB.x - posA.x, 2) + Math.pow(posB.y - posA.y, 2) + Math.pow(posB.z - posA.z, 2));
        return `${Number(distance.toFixed(2))}km`;
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
