import React, { useEffect, useState } from 'react';
import { Navbar, Preloader } from './components';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home, Landing, Auth, CreatorDetail, CompleteProfile, BusinessDetails } from './pages';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoading(true);

    const loadContent = async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    };

    loadContent();
  }, []);


  useEffect(() => {
      if (token) {
        navigate('/complete-your-profile');
      } else {
        navigate('/');
      }
  }, [token]);

  return (
    <div>
          <AnimatePresence mode='wait'>
              {isLoading && <Preloader />}
          </AnimatePresence>
          <>
            
            <Routes>
              <Route index path="/" element={<Landing />} />
              <Route index path="/home" element={<Home />} />
              <Route index path="/auth/:id" element={<Auth />} />
              <Route index path="/complete-your-profile" element={<CompleteProfile />} />
              <Route index path="/business/:id" element={<BusinessDetails />} />
              <Route index path="/creator/:id" element={<CreatorDetail />} />
            </Routes>
          </>
    </div>
  );
};

export default App;
