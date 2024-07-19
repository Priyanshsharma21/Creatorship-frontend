import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingNav = () => {
    const navigate = useNavigate()

    const handleClick = (path)=>{
        navigate(`/auth/${path}`)
    }


  return (
    <div className="landingNav w-full p-5">
        <div className="l-box flex justify-between">
            <div className="l-logo">
                <img src="https://cdn.sanity.io/images/s9olv7lh/production/cacc7b2480fc947c229d41dc1591620fa1b97843-2925x649.png" alt="logo" className='w-full h-full'/>
            </div>
            <div className="l-auth-btns flex">
                <div className="l-login l-btns" onClick={()=>handleClick("login")}>
                    Log in
                </div>
                <div className="l-signup l-btns ml-5" onClick={()=>handleClick("signup")}>
                    Sign up
                </div>
            </div>
        </div>
    
    </div>
  )
}

export default LandingNav