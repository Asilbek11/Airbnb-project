import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import CreatePlace from './create-component/CreatePlace'
import CreateComponent from './create-component/CreateComponent'
import { AnimatePresence, motion } from "framer-motion";

export default function CreateHost() {
  const [element, setElement] = useState(1);
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
  const nextPage = () =>{
    setElement(prev => prev+1)
  }
  const prevPage = () =>{
    setElement(prev => prev-1)
  }
  return (
    <>
      <header style={active ? { margin: 0 } : { border: 'none' }}>
        <Navbar />
      </header>
      <section>
        <div className="container-create">
          {
            <AnimatePresence mode="wait">
            {element === 1 && (
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0}}
                transition={{ delay: 0.5, duration: 0.6}}
              >
                <CreateComponent />
              </motion.div>
            )}
          
            {element === 2 && (
              <motion.div
                key={2}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0}}
                transition={{ delay: 0.5 ,duration: 0.6 }}
              >
                <CreatePlace />
              </motion.div>
            )}
          </AnimatePresence>
          
          }
        </div>
      </section>
      <footer className='footer-fixed'>
        <div className="progress-bar">
          <div className="bar"></div>
        </div>
        <div className="navigator">
          <button className={element === 1 ? 'btn disabled' : 'prev-btn'} disabled={element === 1} onClick={prevPage}>
            Back
          </button>
          <button className="next-btn" onClick={nextPage}>
            Next
          </button>
        </div>
      </footer>
    </>


  )
}
