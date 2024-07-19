import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessProfileForm = ({ userData }) => {
  const { VITE_URL } = import.meta.env;
  const [formData, setFormData] = useState({
    companyName: userData.companyName || '',
    contactPersonName: userData.contactPersonName || '',
    contactNumber: userData.contactNumber || '',
    website: userData.website || '',
    industry: userData.industry || '',
    companySize: userData.companySize || '',
    foundedYear: userData.foundedYear || '',
    partnershipGoals: userData.partnershipGoals || [],
    equityOffered: userData.equityOffered || '',
    expectedDeliverables: userData.expectedDeliverables || [],
    budget: userData.budget || '',
    previousPartnerships: userData.previousPartnerships || [],
    aboutUs: userData.aboutUs || '',
    socialMediaLinks: userData.socialMediaLinks || {
      facebook: '',
      linkedin: '',
      instagram: ''
    },
    keyProducts: userData.keyProducts || [],
    targetAudience: userData.targetAudience || '',
    isDoneWithProfile: userData.isDoneWithProfile || false
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.isDoneWithProfile) {
      navigate('/home');
    }
  }, [formData.isDoneWithProfile, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({ ...formData, [fieldName]: value.split(',') });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, socialMediaLinks: { ...formData.socialMediaLinks, [name]: value } });
  };

  useEffect(()=>{
    if(formData.isDoneWithProfile === true){
      navigate('/home');
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, isDoneWithProfile: true }));
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }
      const res = await axios.put(`${VITE_URL}/business/updateProfile/${userData?._id}`, formData, {
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
    <div className="business-profile-form w-full bg-[#161616] min-h-screen flex justify-center items-center">
      <div className="form-box flex justify-center items-center">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Complete Your Business Profile</p>
          <div className="input-container">
            <label>Company Name</label>
            <input
              name="companyName"
              placeholder="Enter company name"
              onChange={handleChange}
              value={formData.companyName}
            />
          </div>

          <div className="input-container">
            <label>Contact Person Name</label>
            <input
              name="contactPersonName"
              placeholder="Enter contact person name"
              onChange={handleChange}
              value={formData.contactPersonName}
            />
          </div>

          <div className="input-container">
            <label>Contact Number</label>
            <input
              name="contactNumber"
              placeholder="Enter contact number"
              onChange={handleChange}
              value={formData.contactNumber}
            />
          </div>

          <div className="input-container">
            <label>Website</label>
            <input
              name="website"
              placeholder="Enter website URL"
              onChange={handleChange}
              value={formData.website}
            />
          </div>

          <div className="input-container">
            <label>Industry</label>
            <input
              name="industry"
              placeholder="Enter industry"
              onChange={handleChange}
              value={formData.industry}
            />
          </div>

          <div className="input-container">
            <label>Company Size</label>
            <input
              name="companySize"
              type="number"
              placeholder="Enter company size"
              onChange={handleChange}
              value={formData.companySize}
            />
          </div>

          <div className="input-container">
            <label>Founded Year</label>
            <input
              name="foundedYear"
              type="number"
              placeholder="Enter founded year"
              onChange={handleChange}
              value={formData.foundedYear}
            />
          </div>

          <div className="input-container">
            <label>Partnership Goals (comma separated)</label>
            <input
              name="partnershipGoals"
              placeholder="Enter partnership goals"
              onChange={(e) => handleArrayChange(e, 'partnershipGoals')}
              value={formData.partnershipGoals.join(',')}
            />
          </div>

          <div className="input-container">
            <label>Equity Offered</label>
            <input
              name="equityOffered"
              placeholder="Enter equity offered"
              onChange={handleChange}
              value={formData.equityOffered}
            />
          </div>

          <div className="input-container">
            <label>Expected Deliverables (comma separated)</label>
            <input
              name="expectedDeliverables"
              placeholder="Enter expected deliverables"
              onChange={(e) => handleArrayChange(e, 'expectedDeliverables')}
              value={formData.expectedDeliverables.join(',')}
            />
          </div>

          <div className="input-container">
            <label>Budget</label>
            <input
              name="budget"
              placeholder="Enter budget"
              onChange={handleChange}
              value={formData.budget}
            />
          </div>

          <div className="input-container">
            <label>Previous Partnerships (comma separated)</label>
            <input
              name="previousPartnerships"
              placeholder="Enter previous partnerships"
              onChange={(e) => handleArrayChange(e, 'previousPartnerships')}
              value={formData.previousPartnerships.join(',')}
            />
          </div>

          <div className="input-container">
            <label>Facebook</label>
            <input
              name="facebook"
              placeholder="Enter Facebook URL"
              onChange={handleSocialMediaChange}
              value={formData.socialMediaLinks.facebook}
            />
          </div>

          <div className="input-container">
            <label>LinkedIn</label>
            <input
              name="linkedin"
              placeholder="Enter LinkedIn URL"
              onChange={handleSocialMediaChange}
              value={formData.socialMediaLinks.linkedin}
            />
          </div>

          <div className="input-container">
            <label>Instagram</label>
            <input
              name="instagram"
              placeholder="Enter Instagram URL"
              onChange={handleSocialMediaChange}
              value={formData.socialMediaLinks.instagram}
            />
          </div>

          <div className="input-container">
            <label>Key Products (comma separated)</label>
            <input
              name="keyProducts"
              placeholder="Enter key products"
              onChange={(e) => handleArrayChange(e, 'keyProducts')}
              value={formData.keyProducts.join(',')}
            />
          </div>

          <div className="input-container">
            <label>Target Audience</label>
            <input
              name="targetAudience"
              placeholder="Enter target audience"
              onChange={handleChange}
              value={formData.targetAudience}
            />
          </div>

          <div className="input-container">
            <label>About Us</label>
            <textarea
              name="aboutUs"
              placeholder="Enter about us"
              onChange={handleChange}
              value={formData.aboutUs}
              className="p-2 w-full mb-4 rounded-lg"
            ></textarea>
          </div>

          <button disabled={loading} className="submit" type="submit">
            {loading ? 'Updating...' : 'Complete Profile'}
          </button>
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
      />
    </div>
  );
};

export default BusinessProfileForm;
