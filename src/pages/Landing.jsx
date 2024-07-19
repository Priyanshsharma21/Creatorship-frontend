import React, { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LandingNav } from '../components';
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if(token){
      navigate("/complete-your-profile")
    }
  },[])
  
  return (
    <div className="h-container min-h-screen w-screen overflow-hidden pb-[3rem] bg-[#161616]">
    <LandingNav />
      <div className="h-main-text-slider">
        <motion.h2 className="h-main-text">
          {"Empowering"}
          <br />
          {"Creators "}
          <br />
          {"Elevating"}
          <br />
          {"Businesses"}
          <br />
        </motion.h2>
      </div>

      <div className="h-showreel-container">
        <div className="h-showreel-box">
          <motion.div className="h-showreel-slider" style={{ y: yTransform }}>
            <div className="h-showreel-scaler">
              <img className="object-cover home_img" src="https://cdn.sanity.io/images/s9olv7lh/production/902b083610c7f9e1c9d64c52b9752d1815bcb754-1664x2304.png" alt="creator_business" />
            </div>
          </motion.div>
        </div>
      </div>
      
    </div>
  )
}

export default Landing