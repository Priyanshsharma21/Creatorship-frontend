import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusinessCard from './BusinessCard';
import CreatorCard from './CreatorCard';
import { Spin } from 'antd';

const ShowAll = () => {
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        setUserType(user.userType)
        if (user && token) {
          const options = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };

          const response = await axios.get(`${import.meta.env.VITE_URL}/${user.userType}/all`, options);
          if (response.data.status) {
            setData(response.data.data);
          } else {
            console.error('Error fetching data', response.data.message);
          }
        } else {
          console.error('User or token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="mt-10">
      {data.length > 0 ? (
        data.map((item) => (
          <>
            {userType === "creator" ? <BusinessCard business={item}/> : <CreatorCard creator={item} />}
          </>
        ))
      ) : (
        <p className='w-full min-h-screen text-[#e2e2e2] flex justify-center'>
          <Spin />
        </p>
      )}
    </div>
  );
};

export default ShowAll;
