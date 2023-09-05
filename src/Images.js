import React, { useState, useEffect, useRef } from 'react';
import { Card, CardMedia } from '@mui/material';
import './Slideshow.css';

// 이미지 데이터를 배열로 정의
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

export default function Images({ showRecord }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef(null); // Ref 생성

  // 현재 이미지를 가져와서 showRecord 함수에 전달
  const currentImage = imagesData[currentImageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const loadImage = async (imageSrc,) => {
    try {
      const response = await fetch(imageSrc);
      if (response.ok) {
        const blob = await response.blob();
        showRecord(blob); 
      } else {
        console.error('Failed to load image');
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };
  
  useEffect(() => {
    if (currentImage) {
      // 이미지 Ref에 접근하여 src 속성 얻기
      const src = imageRef.current ? imageRef.current.src : '';
      // showRecord(src);
      loadImage(src);
    }
  }, [currentImageIndex]);

  return (
    <div className="slideshow-container">
      {currentImage && (
        <Card>
          <CardMedia
            component="img"
            alt="Displayed Image"
            src={currentImage.src}
            height="310px"
            width="300px"
            ref={imageRef} // 이미지 요소에 Ref 설정
          />
        </Card>
      )}
    </div>
  );
}
