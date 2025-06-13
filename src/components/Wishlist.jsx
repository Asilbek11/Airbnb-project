import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import { WishlistContext } from '../contexts/WishlistContext';
import { UserContext } from '../contexts/UserContext';

export default function Wishlist() {
  const [data, setData] = useContext(WishlistContext);
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    fetch(`http://booking/api/hotels/get-wishlist?user_id=${user?.id}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then(result => setData(result?.hotels))
      .catch(err => {
        err.then(err => alert(err.error))
      });
  }, []);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className='wishlist-body'>
        <div className="container sm">
          <div className="title">
            <h1>Wishlists</h1>
          </div>
        </div>
        <div className="container sm card-container">
          <Cards data={data} />
        </div>

      </section>
    </>

  )
}
