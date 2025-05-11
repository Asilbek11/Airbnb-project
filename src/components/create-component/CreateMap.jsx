import React, { useEffect, useState } from 'react';

const CreateMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const apiKey = process.env.REACT_APP_POSITIONSTACK_KEY;
      const city = 'Tashkent';

      try {
        const response = await fetch(
          `https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${city}`
        );
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          setLocation(data.data[0]);
        }
      } catch (error) {
        console.error('Xatolik:', error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div>
      <h2>Joylashuv ma'lumotlari:</h2>
      {location ? (
        <div>
          <p><strong>Manzil:</strong> {location.label}</p>
          <p><strong>Kenglik:</strong> {location.latitude}</p>
          <p><strong>Uzunlik:</strong> {location.longitude}</p>
        </div>
      ) : (
        <p>Yuklanmoqda...</p>
      )}
    </div>
  );
};

export default CreateMap;
