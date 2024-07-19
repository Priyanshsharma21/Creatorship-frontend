import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAnimeContext } from '../context/animeContext';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { VITE_URL } = import.meta.env
    const [formData, setFormData] = useState({
        email: '',
        password : '',
        userType : ''
    });
  const { userType } = useAnimeContext();
  const [loading, setLoading] = useState(false)


    const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if(token){
      navigate("/complete-your-profile")
    }
  },[])


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
          const payload = {
            ...formData,
            userType : formData.userType.toLowerCase() || userType
          }
        
          const res = await axios.post(`${VITE_URL}/auth/login`, payload)

          if(res.data.status === true){
            localStorage.setItem('token', res.data.data)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setLoading(false)
            navigate('/home')
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
    }

    const handleRedirect = ()=>{
        navigate("/auth/signup")
    }


  return (
    <div className="a-login w-full bg-[#161616] min-h-screen flex justify-center items-center">
        <div className="l-box flex justify-center items-center">
            <form className="form" onSubmit={handleSubmit}>
                <p className="form-title">Log in to creatorships</p>
                <div className="input-container">
                    <input name="email" onChange={handleChange} placeholder="Enter email" type="email"
                    value={formData.email}
                     />
                </div>
                <div className="input-container">
                    <input name="password" onChange={handleChange} placeholder="Enter password" type="password"
                    value={formData.password}
                     />
                </div>

                <div className="input-container">
                    <input name="userType" onChange={handleChange} placeholder="business or creator" type="text"
                    value={formData.userType || userType}
                     />
                </div>
                
                <button disabled={loading} className="submit" type="submit">
                  {loading ? 'process...' : 'Sign in'}
                </button>
                <p className="signup-link">
                    No account?{"  "}
                    <span className="text-[#ffe600] cursor-pointer hover:text-[#ffffff]"onClick={handleRedirect}>signup</span>
                </p>
            </form>

        </div>
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
  )
}

export default Login