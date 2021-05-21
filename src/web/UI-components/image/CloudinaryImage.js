import React, { useEffect, useState } from 'react';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import PropTypes from 'prop-types';

export const CloudinaryImage = ({ alt, folders, imageHeight, imageName, imageWidth }) => {
  CloudinaryImage.propTypes = {
    alt: PropTypes.string.isRequired,
    folders: PropTypes.string.isRequired,
    imageHeight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    imageName: PropTypes.string.isRequired,
    imageWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    setHeight(imageHeight);
    setWidth(imageWidth);
  }, [imageHeight, imageWidth]);


  if (imageHeight && imageWidth) {
    return (
      <Image publicId={`${process.env.CLOUDINARY_FOLDER}/${folders}/${imageName}`} secure alt={alt}
        loading="lazy">
        <Transformation rawTransformation={`w_${width ? width : 'auto'},h_${height ? height : 'auto'},c_fill`}/>
        <Placeholder type="blur"/>
      </Image>
    );
  }

  return null;
};
