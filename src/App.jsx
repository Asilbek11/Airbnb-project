import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import Register from './components/Register';
import Verify from './components/Verify';
import { UserContext } from './contexts/UserContext';
import { WishlistContext } from './contexts/WishlistContext';
import CreateHost from './components/CreateHost';
import { useState } from 'react';
import HostList from './components/HostList';
import Profile from './components/Profile';
import Rooms from './components/Rooms';
import CreatePrice from './components/create-component/CreatePrice';

function App() {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  if (user) {
    fetch(`http://booking/api/hotels/get-wishlist?user_id=${user?.id}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then(result => setWishlist(result?.hotels))
      .catch(err => {
        err.then(err => alert(err.error))
      });
  }

  return (
    <div className="container-main">
      <UserContext.Provider value={[user, setUser]}>
        <WishlistContext.Provider value={[wishlist, setWishlist]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login/:key" element={<Login />} />
            <Route path="/create-host/:step" element={<CreateHost />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/hosts" element={<HostList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/price" element={<CreatePrice />} />
          </Routes>
        </WishlistContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
