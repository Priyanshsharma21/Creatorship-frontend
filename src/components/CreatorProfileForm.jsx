import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatorProfileForm = ({ creatorData }) => {
  const { VITE_URL } = import.meta.env;
  const [formData, setFormData] = useState({
    socialMediaHandles: {
      youtube: creatorData.socialMediaHandles?.youtube || '',
      instagram: creatorData.socialMediaHandles?.instagram || '',
      twitter: creatorData.socialMediaHandles?.twitter || '',
      linkedin: creatorData.socialMediaHandles?.linkedin || ''
    },
    followers: {
      youtube: creatorData.followers?.youtube || '',
      instagram: creatorData.followers?.instagram || '',
      twitter: creatorData.followers?.twitter || '',
      linkedin: creatorData.followers?.linkedin || ''
    },
    engagementRate: {
      youtube: creatorData.engagementRate?.youtube || '',
      instagram: creatorData.engagementRate?.instagram || '',
      twitter: creatorData.engagementRate?.twitter || '',
      linkedin: creatorData.engagementRate?.linkedin || ''
    },
    niche: creatorData.niche || '',
    contentType: creatorData.contentType || '',
    portfolioLinks: creatorData.portfolioLinks || [],
    bio: creatorData.bio || '',
    availability: creatorData.availability || '',
    partnershipTypes: creatorData.partnershipTypes || [],
    previousPartnerships: creatorData.previousPartnerships || [],
    preferredEquity: creatorData.preferredEquity || '',
    additionalSkills: creatorData.additionalSkills || [],
    isDoneWithProfile: creatorData.isDoneWithProfile || false
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({ ...formData, [fieldName]: value.split(',') });
  };

  const handleNestedChange = (e, fieldName, nestedFieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: { ...formData[fieldName], [nestedFieldName]: value }
    });
  };

  useEffect(()=>{
    if(formData.isDoneWithProfile === true){
      navigate('/home');
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      const res = await axios.put(`${VITE_URL}/creator/updateProfile/${creatorData._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status === true) {
        toast("Profile updated successfully");
        navigate('/home');
      } else {
        toast("Error updating profile");
      }
    } catch (error) {
      console.error('Error:', error);
      toast("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="creator-profile-form w-full bg-[#161616] min-h-screen flex justify-center items-center">
      <div className="form-box flex justify-center items-center">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Complete Your Creator Profile</p>

          <div className="input-container">
            <label>Youtube Handle</label>
            <input
              name="youtube"
              placeholder="Enter YouTube handle"
              onChange={(e) => handleNestedChange(e, 'socialMediaHandles', 'youtube')}
              value={formData.socialMediaHandles.youtube}
            />
          </div>

          <div className="input-container">
            <label>Instagram Handle</label>
            <input
              name="instagram"
              placeholder="Enter Instagram handle"
              onChange={(e) => handleNestedChange(e, 'socialMediaHandles', 'instagram')}
              value={formData.socialMediaHandles.instagram}
            />
          </div>

          <div className="input-container">
            <label>Twitter Handle</label>
            <input
              name="twitter"
              placeholder="Enter Twitter handle"
              onChange={(e) => handleNestedChange(e, 'socialMediaHandles', 'twitter')}
              value={formData.socialMediaHandles.twitter}
            />
          </div>

          <div className="input-container">
            <label>LinkedIn Handle</label>
            <input
              name="linkedin"
              placeholder="Enter LinkedIn handle"
              onChange={(e) => handleNestedChange(e, 'socialMediaHandles', 'linkedin')}
              value={formData.socialMediaHandles.linkedin}
            />
          </div>

          <div className="input-container">
            <label>Youtube Followers</label>
            <input
              name="youtube"
              placeholder="Enter YouTube followers"
              onChange={(e) => handleNestedChange(e, 'followers', 'youtube')}
              value={formData.followers.youtube}
              type="number"
            />
          </div>

          <div className="input-container">
            <label>Instagram Followers</label>
            <input
              name="instagram"
              placeholder="Enter Instagram followers"
              onChange={(e) => handleNestedChange(e, 'followers', 'instagram')}
              value={formData.followers.instagram}
              type="number"
            />
          </div>

          <div className="input-container">
            <label>Twitter Followers</label>
            <input
              name="twitter"
              placeholder="Enter Twitter followers"
              onChange={(e) => handleNestedChange(e, 'followers', 'twitter')}
              value={formData.followers.twitter}
              type="number"
            />
          </div>

          <div className="input-container">
            <label>LinkedIn Followers</label>
            <input
              name="linkedin"
              placeholder="Enter LinkedIn followers"
              onChange={(e) => handleNestedChange(e, 'followers', 'linkedin')}
              value={formData.followers.linkedin}
              type="number"
            />
          </div>

          <div className="input-container">
            <label>Youtube Engagement Rate</label>
            <input
              name="youtube"
              placeholder="Enter YouTube engagement rate"
              onChange={(e) => handleNestedChange(e, 'engagementRate', 'youtube')}
              value={formData.engagementRate.youtube}
              type="number"
            />
          </div>

          <div className="input-container">
            <label>Instagram Engagement Rate</label>
            <input
              name="instagram"
              placeholder="Enter Instagram engagement rate"
              onChange={(e) => handleNestedChange(e, 'engagementRate', 'instagram')}
              value={formData.engagementRate.instagram}
              type="number"
            />
          </div>

          <div className="input-container">
            <label>Twitter Engagement Rate</label>
            <input
              name="twitter"
              placeholder="Enter Twitter engagement rate"
              onChange={(e) => handleNestedChange(e, 'engagementRate', 'twitter')}
              value={formData.engagementRate.twitter}
              type="number"
            />
          </div>

          <div className="input-container">
            <label>LinkedIn Engagement Rate</label>
            <input
              name="linkedin"
              placeholder="Enter LinkedIn engagement rate"
              onChange={(e) => handleNestedChange(e, 'engagementRate', 'linkedin')}
              value={formData.engagementRate.linkedin}
              type="number"
            />
          </div>

          <div className="input-container">
            <label>Niche</label>
            <input
              name="niche"
              placeholder="Enter niche"
              onChange={handleChange}
              value={formData.niche}
            />
          </div>

          <div className="input-container">
            <label>Content Type</label>
            <input
              name="contentType"
              placeholder="Enter content type"
              onChange={handleChange}
              value={formData.contentType}
            />
          </div>

          <div className="input-container">
            <label>Portfolio Links (comma-separated)</label>
            <input
              name="portfolioLinks"
              placeholder="Enter portfolio links"
              onChange={(e) => handleArrayChange(e, 'portfolioLinks')}
              value={formData.portfolioLinks.join(',')}
            />
          </div>

          

          <div className="input-container">
            <label>Availability</label>
            <input
              name="availability"
              placeholder="Enter availability"
              onChange={handleChange}
              value={formData.availability}
            />
          </div>

          <div className="input-container">
            <label>Partnership Types (comma-separated)</label>
            <input
              name="partnershipTypes"
              placeholder="Enter partnership types"
              onChange={(e) => handleArrayChange(e, 'partnershipTypes')}
              value={formData.partnershipTypes.join(',')}
            />
          </div>

          <div className="input-container">
            <label>Previous Partnerships (comma-separated)</label>
            <input
              name="previousPartnerships"
              placeholder="Enter previous partnerships"
              onChange={(e) => handleArrayChange(e, 'previousPartnerships')}
              value={formData.previousPartnerships.join(',')}
            />
          </div>

          <div className="input-container">
            <label>Preferred Equity</label>
            <input
              name="preferredEquity"
              placeholder="Enter preferred equity"
              onChange={handleChange}
              value={formData.preferredEquity}
            />
          </div>

          <div className="input-container">
            <label>Additional Skills (comma-separated)</label>
            <input
              name="additionalSkills"
              placeholder="Enter additional skills"
              onChange={(e) => handleArrayChange(e, 'additionalSkills')}
              value={formData.additionalSkills.join(',')}
            />
          </div>

          <div className="input-container">
            <label>Bio</label>
            <textarea
              name="bio"
              placeholder="Enter bio"
              onChange={handleChange}
              value={formData.bio}
              className="p-2 w-full mb-4 rounded-lg"
            />
          </div>

          <button disabled={loading} className="submit" type="submit">
            {loading ? 'Updating...' : 'Complete Profile'}
          </button>
          
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatorProfileForm;
