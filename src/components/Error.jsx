import React, { useEffect, useState } from 'react'
import { MdError } from "react-icons/md";
export default function Error({error}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (error) {
          setVisible(true);
          const timeout = setTimeout(() => setVisible(false), 3000);
          return () => clearTimeout(timeout);
        }
      }, [error]);

    
    return (
        <div className={`error-wrapper ${visible ? 'active' : ''}`}>
          <MdError /> {error}
        </div>
    )
}
