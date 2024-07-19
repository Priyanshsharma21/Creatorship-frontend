import React, { useEffect, useState }  from 'react'
import { motion } from 'framer-motion';
import { opacity, slideUp } from '../utils/index.js';
import { useLocation } from 'react-router-dom'

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]

const Preloader = () => {
  const { pathname } = useLocation()
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({width: 0, height:0});

  useEffect( () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
  }, [])

  useEffect( () => {
      if(index == words.length - 1) return;
      setTimeout( () => {
          setIndex(index + 1)
      }, 4000)
  }, [index])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`

  const curve = {
      initial: {
          d: initialPath,
          transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
      },
      exit: {
          d: targetPath,
          transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
      }
  }
  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className="preloader-introduction">
    {dimension.width > 0 && 
    <>


        <motion.p variants={opacity} initial="initial" animate="enter">
            <div className="flex flex-col preloader-content-box">
                    <div className="preloader-text-path text-right relative top-[1rem] left-[3rem] font-semibold">
                        {pathname === '/' ? "/landing" : pathname}
                    </div>
                    <div className="preloader-text-loading font-normal uppercase text-[4vw]">
                        Loading
                    </div>
            </div>
        </motion.p>

        <svg>
            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
        </svg>
    </>
    }
</motion.div>
  )
}

export default Preloader
