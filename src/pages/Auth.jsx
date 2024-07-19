import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Login from '../components/Login'
import SignUp from '../components/Signup'
import { FaArrowLeft } from "react-icons/fa6";
import { useAnimeContext } from '../context/animeContext';

const Auth = () => {
  const { id } = useParams()
  const { setUserType } = useAnimeContext()
  const navigate = useNavigate()

  const handleBack = ()=>{
    setUserType("")
    navigate(-1)
  }

  return (
    <div className='auth bg-[#161616] w-screen overflow-hidden'>
      <>
        <div className="back absolute w-full flex justify-start p-2 text-[#e2e2e2] font-semibold">
          <div className="b-box cursor-pointer" onClick={handleBack}>
            <FaArrowLeft />
          </div>
        </div>
        {id === "login" ? (
          <Login />
        ):(
          <SignUp />
        )}
      </>
    </div>
  )
}

export default Auth