import { useRef, useContext, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { HostContext } from '../../contexts/HostContext';

export default function CreateImage() {
  // const [selectedImages,setSelectedImages]  = useState([]);
  const fileInputRef = useRef(null);
  const [hotel, setHotel] = useContext(HostContext);

  const handleSlotClick = (index) => {
    fileInputRef.current.dataset.index = index;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const index = Number(fileInputRef.current.dataset.index);

    let updatedImages = [...(hotel.images || [])];
    updatedImages[index] = url;

    if (updatedImages.length < 10 && !updatedImages.includes(null)) {
      updatedImages.push(null);
    }

    setHotel({ ...hotel, images: updatedImages,imageObjs: [...hotel.imageObjs,...Array.from(e.target.files)]});
  };

  const handleDelete = (index) => {
    const updated = [...hotel.images];
    updated.splice(index, 1);
    setHotel({ ...hotel, images: updated });
  };

  const images = hotel.images || [];
  const filledImages = [...images];

  while (filledImages.length < 5) {
    filledImages.push(null);
  }

  if (images.length >= 5 && images.length < 10 && !images.includes(null)) {
    filledImages.push(null);
  }

  return (
    <div className="img-content">
      <div className="heading">
        <div className="title">
          <h2>Add some photos of your apartment</h2>
          <span>You'll need 5 photos to get started. You can add more or make changes later.</span>
        </div>
      </div>

      {!images[0] && (
        <div className="intro-wrapper">
          <img src="/img/camera.avif" alt="camera" className="camera-photo" />
          <button className="add-intro" onClick={() => handleSlotClick(0)}>Add photos</button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div className={`preview-grid ${images[0] ? 'visible' : ''}`}>
        {filledImages.map((url, index) => (
          <div
            key={index}
            className={`img-box ${index === 0 ? 'main-img' : ''}`}
            onClick={() => handleSlotClick(index)}
          >
            {url ? (
              <>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(index);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
                <img src={url} alt={`preview-${index}`} className="preview-img" />
              </>
            ) : (
              <div className="placeholder">
                {index >= 4 ? (
                  <>
                    <BsPlusLg size={24} />
                    <span>Add more</span>
                  </>
                ) : (
                  <IoImageOutline style={{ stroke: 'var(--silver)', fill: 'var(--silver)' }} size={26} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
