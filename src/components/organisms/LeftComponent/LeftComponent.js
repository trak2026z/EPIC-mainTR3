import React from 'react';
import ImageInfo from 'components/atoms/ImageInfo/ImageInfo';
import InputDate from 'components/atoms/InputDate/InputDate';
import Button from 'components/atoms/Button/Button';
const LeftComponent = ({ handleForm, handleDate, data, isLoading, currentSlideIndex, distanceBetweenObjects }) => {
    return (
        <div>
            <form onSubmit={handleForm}>
                <h2>Choose date</h2>
                <InputDate handleDate={handleDate} />
                <Button primary>{isLoading ? 'Loading...' : 'Get images'}</Button>
            </form>
            {data && data.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Additional Information</h3>
                    <ImageInfo title="Caption" desc={data[currentSlideIndex].caption} />
                    <ImageInfo title="Indentifier" desc={data[currentSlideIndex].identifier} />
                    <ImageInfo title="Date" desc={data[currentSlideIndex].date} />
                    <ImageInfo
                        title="Distance to moon"
                        desc={distanceBetweenObjects(data[currentSlideIndex].dscovr_j2000_position, data[currentSlideIndex].lunar_j2000_position)}
                    />
                    <ImageInfo
                        title="Distance to sun"
                        desc={distanceBetweenObjects(data[currentSlideIndex].dscovr_j2000_position, data[currentSlideIndex].sun_j2000_position)}
                    />
                    <ImageInfo
                        title="PS"
                        desc="11 February 2021 is really
                                        interesting&nbsp;;)"
                    />
                </div>
            )}
        </div>
    );
};

export default LeftComponent;
