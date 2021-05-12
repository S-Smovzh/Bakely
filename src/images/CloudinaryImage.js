import React, { useEffect } from 'react';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { fill } from '@cloudinary/base/actions/resize';
import { Cloudinary } from '@cloudinary/base';
import PropTypes from 'prop-types';

const CloudinaryInstance = new Cloudinary({
  cloud: {
    cloudName: (process.env.CLOUDINARY_CLOUD || 'gachi322')
  }
});

export const CloudinaryImage = ({ alt, folders, imageHeight, imageName, imageWidth, fillImage }) => {
  CloudinaryImage.propTypes = {
    alt: PropTypes.string.isRequired,
    folders: PropTypes.string.isRequired,
    imageHeight: PropTypes.number,
    imageName: PropTypes.string.isRequired,
    imageWidth: PropTypes.number,
    fillImage: PropTypes.bool
  };

  const myImage = CloudinaryInstance.image(`${(process.env.CLOUDINARY_FOLDER || 'Bakely')}/${folders}/${imageName}`);

  useEffect(() => {
    if (fillImage) {
      myImage.resize(fill());
    }

    if (imageHeight && imageWidth) {
      myImage.resize(fill().width(imageWidth).height(imageHeight));
    }
  }, [imageHeight, imageWidth]);

  return (
    <AdvancedImage cldImg={myImage} plugins={[lazyload(), placeholder('blur')]} alt={alt}/>
  );
};
