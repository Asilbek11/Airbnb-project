import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateMap = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const query = 'Tashkent';

  useEffect(() => {
    const fetchLocation = async () => {
      const apiKey = process.env.REACT_APP_POSITIONSTACK_KEY;

      try {
        const response = await axios.get('http://api.positionstack.com/v1/forward', {
          params: {
            access_key: apiKey,
            query: query
          }
        });

        const data = response.data;

        if (data && data.data && data.data.length > 0) {
          setLocation(data.data[0]);
        } else {
          setError('Manzil topilmadi');
        }
      } catch (err) {
        console.error(err);
        setError('So‘rovda xatolik yuz berdi');
      }
    };

    fetchLocation();
  }, []);

  return (
    <div>
      <h2>Manzil Ma'lumotlari</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location ? (
        <div>
          <p><strong>Manzil:</strong> {location.label}</p>
          <p><strong>Kenglik:</strong> {location.latitude}</p>
          <p><strong>Uzunlik:</strong> {location.longitude}</p>
        </div>
      ) : (
        !error && <p>Yuklanmoqda...</p>
      )}
    </div>
  );
};

export default CreateMap;
