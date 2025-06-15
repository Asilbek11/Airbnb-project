import { useRef, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
export default function CreateImage() {
    const [images, setImages] = useState(Array(5).fill(null));
    const [activeIndex, setActiveIndex] = useState(null);
    const fileInputRef = useRef(null);

    const handleSlotClick = (index) => {
        setActiveIndex(index);
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        const updatedImages = [...images];
        updatedImages[activeIndex] = url;
        setImages(updatedImages);

        if (updatedImages.length < 10 && !updatedImages.includes(null)) {
            setImages([...updatedImages, null]);
        }
    };

    return (
        <div className="img-content">
            <div className="heading">
                <div className="title">
                    <h2>Add some photos of your apartment</h2>
                    <span>You'll need 5 photos to get started. You can add more or make changes later.</span>
                </div>
            </div>

            <div className={`intro-wrapper ${images[0] ? "hidden" : ""}`}>
                <img src="/img/camera.avif" alt="camera" className="camera-photo" />
                <button className="add-intro" onClick={() => handleSlotClick(0)}>
                    Add photos
                </button>
            </div>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <div className={`preview-grid ${images[0] ? 'visible' : ''}`}>
                {images.map((url, index) => (
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
                                        // handleDelete(index); DELETE FUNCTION YARATILISHI ZARUR AKALA!!!
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
