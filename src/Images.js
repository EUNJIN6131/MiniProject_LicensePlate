import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './Slideshow.css'; // Import a CSS file for styling

const imagesData = [
  {
    id: 1,
    src: '/car1.jpg', // Update with the correct relative path
  },
  {
    id: 2,
    src: '/car2.jpg', // Update with the correct relative path
  },
  // Add more image data as needed
];

export default function Slideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Change to the next image
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, 3000); // Change image every 3 seconds (adjust the duration as needed)

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(interval);
    };
  }, []);

  const currentImage = imagesData[currentImageIndex];

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
              height="310px" // Set the desired height for all images
              width="300px"  // Set the desired width for all images
            />
          </Card>
        </div>
      ))}
    </div>
  );
}
