import React, { useState } from 'react';

type ImageLoaderProps = {
    src: string;
    alt?: string;
};

/*
Simple component for <img> images
Displays an image as usual. However, if the image does not exist, the broken image symbol won't show up.
 */

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageLoaded(false);
    };

    return (
        <div>
            {imageLoaded && <img src={src} alt={alt || 'Image'} />}
    <img
    src={src}
    alt={alt || 'Image'}
    onLoad={handleImageLoaded}
    onError={handleImageError}
    style={{ display: 'none'}}
    />
    </div>
);
};

export default ImageLoader;
