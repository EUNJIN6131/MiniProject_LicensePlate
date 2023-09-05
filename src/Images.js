import React, { useState, useEffect, useRef } from 'react';
import { Card, CardMedia } from '@mui/material';
import './Slideshow.css';

// 이미지 데이터를 배열로 정의
const imagesData = [
  {
    id: 1,
    src: 'https://licenseplate-iru.s3.ap-northeast-2.amazonaws.com/total/vehicle/05bbc11d-3d78-46f4-88f2-3d70fec0bc0b.jpg',
  },
  {
    id: 2, 
    src: './images/car2.jpg',
  },
  {
    id: 3,
    src: './images/car3.jpg',
  },
  {
    id: 4,
    src: './images/car4.jpg',
  },
  {
    id: 5,
    src: './images/car5.jpg',
  },
  {
    id: 6,
    src: './images/car6.jpg',
  },
  {
    id: 7,
    src: './images/car7.jpg',
  },
  {
    id: 8,
    src: './images/car8.jpg',
  },
  {
    id: 9,
    src: './images/car9.jpg',
  },
  {
    id: 10,
    src: './images/car10.jpg',
  },
  {
    id: 11,
    src: './images/car11.jpg',
  },
  {
    id: 12,
    src: './images/car12.jpg',
  },
  {
    id: 13,
    src: './images/car13.jpg',
  },
  {
    id: 14,
    src: './images/car14.jpg',
  },
  {
    id: 15,
    src: './images/car15.jpg',
  },
  {
    id: 16,
    src: './images/car16.jpg',
  },
  {
    id: 17,
    src: './images/car17.jpg',
  },
  {
    id: 18,
    src: './images/car18.jpg',
  },
  {
    id: 19,
    src: './images/car19.jpg',
  },
  {
    id: 20,
    src: './images/car20.jpg',
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
      console.log("currentImageIndex", currentImageIndex)
      if (currentImage) {
        // 이미지 Ref에 접근하여 src 속성 얻기
        const src = imageRef.current ? imageRef.current.src : '';
        loadImage(src);
      }
      clearInterval(interval);
    };
  }, [currentImageIndex]);


  const loadImage = async (imageSrc) => {
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

  // useEffect(() => {
  //   console.log("currentImageIndex", currentImageIndex)
  //   if (currentImage) {
  //     // 이미지 Ref에 접근하여 src 속성 얻기
  //     const src = imageRef.current ? imageRef.current.src : '';
  //     loadImage(src);
  //   }
  // }, [currentImageIndex]);

  return (
    <div className="slideshow-container">
      {currentImage && (
        <Card  style={{ height: 'fit-content', width: '100%' }}>
          <CardMedia
            component="img"
            alt="Displayed Image"
            src={currentImage.src}
            ref={imageRef} // 이미지 요소에 Ref 설정
            style={{ height: '50vh', width: '100%', objectFit: 'cover' }}
          />
        </Card>
      )}
    </div>
  );
}
