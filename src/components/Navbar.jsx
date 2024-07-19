import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handleEdit = (path) => {
    navigate(`/auth/${path}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="landingNav fixed w-full p-5">
    <div className="l-box flex justify-between">
        <Link to={"/home"} className="l-logo">
            <img src="https://cdn.sanity.io/images/s9olv7lh/production/cacc7b2480fc947c229d41dc1591620fa1b97843-2925x649.png" alt="logo" className='w-full h-full'/>
        </Link>
        <div className="l-auth-btns flex">
            {/* <div className="l-login l-btns" onClick={()=>handleEdit("login")}>
                Edit
            </div> */}
            <div className="l-signup l-btns ml-5" onClick={()=>handleLogout("signup")}>
                Logout
            </div>
        </div>
    </div>

</div>
  )
}

export default Navbar