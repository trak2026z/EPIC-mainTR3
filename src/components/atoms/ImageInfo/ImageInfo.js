import React from 'react';

const ImageInfo = ({ title, desc }) => (
    <p>
        <strong>{title}: </strong>
        {desc}
    </p>
);

export default ImageInfo;
