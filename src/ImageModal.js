import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Draggable from "react-draggable";
import "./ImageModal.css";

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  const [showImage, setShowImage] = useState(false);
  const [imageWidth, setImageWidth] = useState(300);

  useEffect(() => {
    // 이미지가 로드되면 이미지의 너비를 설정합니다.
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageWidth(img.width);
    };
  }, [imageUrl]);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  const customStyles = {
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    },
    content: {
      position: "relative",
      zIndex: 10000,
      border: "none", // Remove modal border
      background: "none", // Remove modal background
      overflow: "visible", // Allow content to overflow modal
      width: `${imageWidth}px`, // Set modal width based on image width
    },
  };
  
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      style={customStyles}
    >
      <Draggable handle=".drag-handle">
        <div>
          <div className="drag-handle">
            <span>이미지 이동</span> 
            <div className="close-button-container">
              <button className="close-button" onClick={onClose}>
                X
              </button>
              </div>
          </div>
          <div className="image-container">
            {showImage ? (
              <img src={imageUrl} alt="Full Image" />
            ) : (
              <div className="emoticon" onClick={toggleImage}>
                {toggleImage()}
              </div>
            )}
          </div>
          <button onClick={onClose}>닫기</button>
        </div>
      </Draggable>
    </Modal>
  );
};

export default ImageModal;
