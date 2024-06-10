import React from 'react';
import { StyledCurrentSlideInfo } from './CurrentSlideInfo.style';

const CurrentSlideInfo = ({ currentSlideIndex, allSlides }) => {
    console.log(currentSlideIndex);
    return (
        <StyledCurrentSlideInfo>
            {currentSlideIndex}/{allSlides}
        </StyledCurrentSlideInfo>
    );
};

export default CurrentSlideInfo;
