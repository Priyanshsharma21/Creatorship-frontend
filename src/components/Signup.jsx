import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimeContext } from '../context/animeContext.jsx';
import SelectType from './SelectType.jsx';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const { VITE_URL } = import.meta.env
  const { userType } = useAnimeContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: {
      country: '',
      city: '',
    },
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested location object
    if (name === 'country' || name === 'city') {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if(token){
      navigate("/complete-your-profile")
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const payload = {
        ...formData,
        userType : userType
      }
    
      const res = await axios.post(`${VITE_URL}/auth/signup`, payload)
      if(res.data.status === true){
        // localStorage.setItem('token', res.data.data)
        // localStorage.setItem('user', JSON.stringify(res.data.data))
        setLoading(false)
        navigate('/auth/login')
      }else{
        setLoading(false)
        toast("Enter all the details")
      }
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
    }finally{
      setLoading(false)
    }
  };

  const handleRedirect = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="w-full bg-[#161616] min-h-screen flex justify-center items-center">
      {userType === "" ? (
        <SelectType />
      ) : (
        <div className="signup">
          <form className="form" onSubmit={handleSubmit}>
            <p className="form-title">Sign in for creatorships</p>
            <div className="input-container">
              <input
                name="firstName"
                onChange={handleChange}
                placeholder="Enter first name"
                type="text"
                value={formData.firstName}
              />
            </div>
            <div className="input-container">
              <input
                name="lastName"
                onChange={handleChange}
                placeholder="Enter last name"
                type="text"
                value={formData.lastName}
              />
            </div>
            <div className="input-container">
              <input
                name="email"
                onChange={handleChange}
                placeholder={`${userType === "creator" ? "Enter email" : "Enter your work email"}`}
                type="email"
                value={formData.email}
              />
            </div>
            <div className="input-container">
              <input
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                type="password"
                value={formData.password}
              />
            </div>
            <div className="input-container">
              <input
                name="country"
                onChange={handleChange}
                placeholder="Enter country"
                type="text"
                value={formData.location.country}
              />
            </div>
            <div className="input-container">
              <input
                name="city"
                onChange={handleChange}
                placeholder="Enter city"
                type="text"
                value={formData.location.city}
              />
            </div>
            <button disabled={loading} className="submit" type="submit">
                  {loading ? 'process...' : 'Sign up'}
                </button>
            <p className="signup-link">
              Already have an account?{" "}
              <span className="text-[#ffe600] cursor-pointer hover:text-[#ffffff]" onClick={handleRedirect}>
                Log in
              </span>
            </p>
          </form>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SignUp;
