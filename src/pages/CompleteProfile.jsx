import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreatorProfileForm from '../components/CreatorProfileForm.jsx';
import BusinessProfileForm from '../components/BusinessProfileForm.jsx';

const CompleteProfile = () => {
  const { VITE_URL } = import.meta.env
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !token) {
      navigate('/auth/login');
      return;
    }
    const fetchUserData = async () => {
      try {
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${VITE_URL}/${user?.userType}/${user?._id}`, options);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/auth/login');
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {userData?.data.userType === 'creator' ? (
        <CreatorProfileForm creatorData={userData.data} />
      ) : (
        <BusinessProfileForm userData={userData.data} />
      )}
    </div>
  );
};

export default CompleteProfile;
