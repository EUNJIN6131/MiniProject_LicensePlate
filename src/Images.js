import React, { useState, useEffect } from 'react';
import { Card,  CardMedia } from '@mui/material';
import './Slideshow.css'; 

const imagesData = [
  {
    id: 1,
    src: '/car1.jpg',
  },
  {
    id: 2,
    src: '/car2.jpg', 
  },
 
];

export default function Images({setImageUpload, showRecord}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, 5000); 
    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentImage = imagesData[currentImageIndex];

  useEffect(() => {
    if (currentImage) {
      setImageUpload([currentImage.src]);
      showRecord();
    }
  }, [currentImageIndex, setImageUpload, ]);

  return (
    <div className="slideshow-container">
      {/* {imagesData.map((image, index) => (
        <div
          key={image.id}
          className={`slide ${index === currentImageIndex ? 'active' : ''}`}
          onClick={() => handleImageSelection(image)}
          >
          <Card>
            <CardMedia
              component="img"
              src={image.src}
              height="310px" 
              width="300px"  
            />
          </Card>
        </div>
      ))} */}
      {currentImage && (
        <Card>
          <CardMedia
            component="img"
            src={currentImage.src}
            height="310px"
            width="300px"
          />
        </Card>
      )}
    </div>
  );
}

