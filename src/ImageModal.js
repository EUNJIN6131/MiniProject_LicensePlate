import React, { useState } from "react";
import Modal from "react-modal";

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Image Modal">
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
