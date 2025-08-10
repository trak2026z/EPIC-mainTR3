import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/globalStyle';
import { StyledContainer } from 'components/templates/StyledContainer/StyledContainer.style';
import { StyledWrapper } from 'components/templates/StyledWrapper/StyledWrapper.style';
import LeftComponent from 'components/organisms/LeftComponent/LeftComponent';
import SwiperComponent from 'components/organisms/SwiperComponent/SwiperComponent';
import CurrentSlideInfo from 'components/molecues/CurrentSlideInfo/CurrentSlideInfo';

export default function RootView({
  data,
  isLoading,
  selectedDate,
  currentDisplayedDate,
  currentSlideIndex,
  handleForm,
  handleDate,
  setCurrentSlideIndex
}) {
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
              />
            </div>
            <div className="right">
              {data.data && data.data.length > 0 ? (
                <>
                  <SwiperComponent
                    data={data.data}
                    currentDisplayedDate={currentDisplayedDate}
                    setCurrentSlideIndex={setCurrentSlideIndex}
                  />
                  <CurrentSlideInfo
                    currentSlideIndex={currentSlideIndex + 1}
                    allSlides={data.data.length}
                  />
                </>
              ) : (
                <p>No images available for the selected date.</p>
              )}
            </div>
          </StyledWrapper>
        )}
      </StyledContainer>
    </ThemeProvider>
  );
}
