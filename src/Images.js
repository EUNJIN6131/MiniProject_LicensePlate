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

export default function Slideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, 3000); 
    return () => {
      clearInterval(interval);
    };
  }, []);

  // const currentImage = imagesData[currentImageIndex];

  return (
    <div className="slideshow-container">
      {imagesData.map((image, index) => (
        <div
          key={image.id}
          className={`slide ${index === currentImageIndex ? 'active' : ''}`}
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
      ))}
    </div>
  );
}
