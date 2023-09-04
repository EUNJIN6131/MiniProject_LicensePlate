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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // 현재 이미지를 가져와서 showRecord 함수에 전달
  const currentImage = imagesData[currentImageIndex];

  useEffect(() => {
    if (currentImage) {
      // 이미지 Ref에 접근하여 src 속성 얻기
      const src = imageRef.current ? imageRef.current.src : '';
      showRecord(src);
      console.log("imageRef", imageRef)
    }
  }, [currentImageIndex, showRecord]);

  return (
    <div className="slideshow-container">
      {currentImage && (
        <Card>
          <CardMedia
            component="img"
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
