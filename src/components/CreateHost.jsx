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

export default function CreateHost() {
  const { step } = useParams();
  const [user, setUser] = useContext(UserContext);
  const [hotel, setHotel] = useState({
    name: null,
    price: "null",
    description: null,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    city: "null",
    persons: 1,
    rating: 0,
    address: "null",
    owner_id: user?.id,
    category_id: null,
    images: ["1", "2"]
  });
  const navigate = useNavigate();
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
    if (step < 6) {
      navigate(`/create-host/${parseFloat(step) + 1}`);
    } else {
      console.log(hotel);
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
    navigate(`/create-host/${parseFloat(step) - 1}`);
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
      videoUrl: true
    },
  ];

  return (
    <>
      <header style={active ? { margin: 0 } : { border: 'none' }}>
        <Navbar />
      </header>
      <HostContext.Provider value={[hotel, setHotel]}>
        <section>
          <div className="container-create">
            {
              <AnimatePresence mode="wait">
                {parseInt(step) === 1 && (
                  <motion.div
                    key={1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <CreateComponent fields={fields[0]} />
                  </motion.div>
                )}
                {parseInt(step) === 2 && (
                  <motion.div
                    key={2}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <CreatePlace />
                  </motion.div>
                )}
                {parseInt(step) === 3 && (
                  <motion.div
                    key={3}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <CreateUserCount />
                  </motion.div>
                )}
                {parseInt(step) === 4 && (
                  <motion.div
                    key={4}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <CreateComponent fields={fields[1]} />
                  </motion.div>
                )}
                {parseInt(step) === 5 && (
                  <motion.div
                    key={5}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <CreateDescription fields={fields[1]} />
                  </motion.div>
                )}
                {parseInt(step) === 6 && (
                  <motion.div
                    key={6}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <CreateComponent fields={fields[2]} />
                  </motion.div>
                )}
              </AnimatePresence>

            }
          </div>
        </section>
      </HostContext.Provider>
      <footer className='footer-fixed'>
        <div className="progress-bar">
          <div className="bar"></div>
        </div>
        <div className="navigator">
          <button className={parseInt(step) === 1 ? 'btn disabled' : 'prev-btn'} disabled={parseInt(step) === 1} onClick={prevPage}>
            Back
          </button>
          <button className="next-btn" onClick={nextPage}>
            {step < 6 ? 'Next' : 'Finish'}
          </button>
        </div>
      </footer>
    </>


  )
}
