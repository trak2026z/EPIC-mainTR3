import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const API_KEY = process.env.REACT_APP_API_KEY;

const SwiperComponent = ({ data, currentDisplayedDate, setCurrentSlideIndex }) => {
    const [keyProp, setKeyProp] = useState(Date.now());

    useEffect(() => {
        setKeyProp(Date.now());
    }, [data]);

    return (
        <Swiper
            key={keyProp}
            modules={[EffectFade, Autoplay, Navigation]}
            effect="fade"
            navigation
            onSlideChange={(swiper) => setCurrentSlideIndex(swiper.realIndex)}
        >
            {data.map((item) => (
                <SwiperSlide key={item.identifier}>
                    <img
                        alt={item.identifier}
                        src={`https://epic.gsfc.nasa.gov/archive/natural/${currentDisplayedDate.year}/${currentDisplayedDate.month}/${currentDisplayedDate.day}/png/${item.image}.png?api_key=${API_KEY}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperComponent;
