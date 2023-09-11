import React, { useState } from "react";
import Modal from "react-modal";

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  const customStyles = {
    overlay: {
      zIndex: 9999, // 모달 창을 가장 위로 올리기 위한 z-index 값
    },
    content: {
      zIndex: 10000, // 모달 내용을 가장 위로 올리기 위한 z-index 값
    },
  };

  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel="Image Modal">
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
    </Modal>
  );
};

export default ImageModal;
