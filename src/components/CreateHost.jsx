import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import CreatePlace from './create-component/CreatePlace'
import CreateComponent from './create-component/CreateComponent'
import { AnimatePresence, motion } from "framer-motion";
import CreateUserCount from './create-component/CreateUserCount';
import CreateDescription from './create-component/CreateDescription';
import { useNavigate, useParams } from 'react-router-dom';
import { HostContext } from '../contexts/HostContext';
import { UserContext } from '../contexts/UserContext';
import CreateTitle from './create-component/CreateTitle';
import CreatePrice from './create-component/CreatePrice';
import CreateMap from './create-component/CreateMap';
import CreateImage from './create-component/CreateImage';
import { BeatLoader } from 'react-spinners';

export default function CreateHost() {
  const { step } = useParams();
  const [user, setUser] = useContext(UserContext);
  const [hotel, setHotel] = useState({
    name: null,
    price: 0,
    description: null,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    city: "null",
    persons: 1,
    rating: 0,
    address:{
      coutryCity:'',
      address: '',
      district: '',
      street: ''
    },
    owner_id: user?.id,
    category_id: null,
    images: []
  });
  const TOTAL_STEPS = 10;
  const progress = ((parseInt(step) - 1) / (TOTAL_STEPS - 1)) * 100;
  const navigate = useNavigate();
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [isPrevLoading, setIsPrevLoading] = useState(false);
  const timeout = '1800'
  let [active, setActive] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY < 40) {
        setActive();
      } else {
        setActive(true);
      }
    });
  }, [])
  const nextPage = () => {
    if (step < 10) {
      setIsNextLoading(true);
      navigate(`/create-host/${parseFloat(step) + 1}`);
      setTimeout(() => {
        setIsNextLoading(false);
      }, timeout);
    } else {
      navigate('/');
      fetch("http://booking/api/hotels/create-hotels", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...hotel })
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
        .then(result => navigate('/'))
        .catch(err => {
          err.then(err => alert(err.error))
        });
    }
  }
  const prevPage = () => {
    setIsPrevLoading(true)
    navigate(`/create-host/${parseFloat(step) - 1}`);
    setTimeout(() => {
      setIsPrevLoading(false);
    }, timeout);
  }

  const fields = [
    {
      step: "Step 1",
      title: (
        <>
          Tell us about your place
        </>
      ),
      description: (
        <>
          In this step, we'll ask you which type of property you have and if <br />
          guests will book the entire place or just a room. Then let us know the <br />
          location and how many guests can stay.
        </>
      ),
      videoUrl: "../vid.mp4"
    },
    {
      step: "Step 2",
      title: (
        <>
          Make your place <br />
          stand out
        </>
      ),
      description: (
        <>
          In this step, you’ll add some of the amenities your place <br />
          offers, plus 5 or more photos. Then, you’ll create a title and description.
        </>
      ),
      videoUrl: "../vid1.mp4"
    },
    {
      step: "Step 3",
      title: (
        <>
          Finish up and publish
        </>
      ),
      description: (
        <>
          Finally, you'll choose booking settings, set up pricing, and publish your <br /> listing.
        </>
      ),
      videoUrl: "../vid2.mp4"
    },
  ];
  const stepContent = (step) => {
    switch (parseInt(step)) {
      case 1: return <CreateComponent fields={fields[0]} />;
      case 2: return <CreatePlace />;
      case 3: return <CreateUserCount />;
      case 4: return <CreateComponent fields={fields[1]} />;
      case 5: return <CreateImage />;
      case 6: return <CreateMap />;
      case 7: return <CreateTitle />;
      case 8: return <CreateDescription />;
      case 9: return <CreatePrice />;
      case 10: return <CreateComponent fields={fields[2]} />;
      default: return null;
    }
  };
  
  const getMotionProps = (step) => {
    // Add custom animation per step if needed
    const yEnabledSteps = [2, 3, 4, 5, 7, 8, 9];
    const y = yEnabledSteps.includes(parseInt(step)) ? 20 : 0;
    return {
      key: step,
      initial: { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
      transition: { delay: 0.3, duration: 0.5 }
    };
  };
  
  
 
  return (
    <>
      <header style={active ? { margin: 0 } : { border: 'none' }}>
        <Navbar />
      </header>
      <HostContext.Provider value={[hotel, setHotel]}>
        <section>
        <div className="container-create">
      <AnimatePresence mode="wait">
        {stepContent(step) && (
          <motion.div {...getMotionProps(step)}>
            {stepContent(step)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>

        </section>
      </HostContext.Provider>
      <footer className='footer-fixed'>
        <div className="progress-bar">
          <div
            className="bar"
            style={{ width: `${progress}%` }}
          >
          </div>
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className="navigator">
          <button
            className={`prev-btn ${isPrevLoading ? 'loading' : ''}`}
            disabled={isPrevLoading || step == 1}
            onClick={prevPage}
          >
            {isPrevLoading ? (
              <BeatLoader size={7} color="#fff" />
            ) : (
              'Back'
            )}
          </button>

          <button
            className={`next-btn ${isNextLoading ? 'loading' : ''}`}
            disabled={isNextLoading}
            onClick={nextPage}
          >
            {isNextLoading ? (
              <BeatLoader size={7} color="#fff" />
            ) : (
              step < TOTAL_STEPS ? 'Next' : 'Finish'
            )}
          </button>

        </div>
      </footer>

    </>


  )
}
