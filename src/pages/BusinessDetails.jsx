import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import withContainer from '../hof/Hof';

const BusinessDetails = () => {
  const { VITE_URL } = import.meta.env;
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        const res = await axios.get(`${VITE_URL}/business/${id}`, options);
        setBusiness(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch business details');
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  const handleChatWithUs = (contact) => {
    const encodedMessage = encodeMessage();
    const whatsappUrl = `https://wa.me/${contact}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailUs = () => {
    window.location.href = `mailto:${business?.email}`;
  };

  const encodeMessage = ()=>{
    const message = `
    Hi ${business.firstName} ${business.lastName},

    My name is [Your Name], and I'm a content creator interested in partnering with TechCorp. I am impressed by your innovative tech solutions and would love to collaborate to help expand your reach and increase engagement.

    Based on your goals, I can deliver:
    - ${business.expectedDeliverables.join('\n- ')}

    I have worked with various partners, including ${business.previousPartnerships.join(', ')}. I believe we can achieve great success together, especially with your key products like ${business.keyProducts.join(' and ')}.

    Please let me know a convenient time to discuss this further.

    Best regards,
    [Your Name]
    [Your Contact Information]
  `;


  return message

  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="w-full min-h-screen bg-[#161616] pt-[5rem] mx-auto text-white">
      {business && (
        <div className="max-w-4xl w-full lg:max-w-full rounded-md lg:flex my-4 mx-auto">
          <div className="border w-full border-gray-400 bg-[#1c1c1c] rounded p-4 flex flex-col justify-between leading-normal shadow-lg">
            <div className="mb-8">
              <div className="text-white font-bold text-2xl mb-2">{business?.companyName}</div>
              <p className="text-gray-300 text-base">{business?.aboutUs}</p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="text-sm">
                <p className="text-white font-semibold">Contact Person:</p>
                <p className="text-gray-400">{business?.contactPersonName}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Contact Number:</p>
                <p className="text-gray-400">{business?.contactNumber}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Email:</p>
                <p className="text-gray-400">{business?.email}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Location:</p>
                <p className="text-gray-400">{business?.location?.city}, {business?.location.country}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Industry:</p>
                <p className="text-gray-400">{business?.industry}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Company Size:</p>
                <p className="text-gray-400">{business?.companySize}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Founded Year:</p>
                <p className="text-gray-400">{business?.foundedYear}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Partnership Goals:</p>
                <p className="text-gray-400">{business?.partnershipGoals.join(', ')}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Equity Offered:</p>
                <p className="text-gray-400">{business?.equityOffered}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Expected Deliverables:</p>
                <p className="text-gray-400">{business?.expectedDeliverables.join(', ')}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Budget:</p>
                <p className="text-gray-400">{business?.budget}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Previous Partnerships:</p>
                <p className="text-gray-400">{business?.previousPartnerships.join(', ')}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Key Products:</p>
                <p className="text-gray-400">{business?.keyProducts.join(', ')}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Target Audience:</p>
                <p className="text-gray-400">{business?.targetAudience}</p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Social Media Links:</p>
                <p className="text-gray-400"><a href={business?.socialMediaLinks?.facebook} className="text-blue-500 hover:text-blue-700">Facebook</a></p>
                <p className="text-gray-400"><a href={business?.socialMediaLinks?.linkedin} className="text-blue-500 hover:text-blue-700">LinkedIn</a></p>
                <p className="text-gray-400"><a href={business?.socialMediaLinks?.instagram} className="text-blue-500 hover:text-blue-700">Instagram</a></p>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Website:</p>
                <p className="text-gray-400"><a href={business?.website} className="text-blue-500 hover:text-blue-700">Visit Website</a></p>
              </div>

              <div className="contactme flex">
                <div onClick={()=>handleChatWithUs(business?.contactNumber)} className="links">
                    <p className="text-green-400 font-semibold">Whatsapp us</p>
                </div>
                <div onClick={handleEmailUs} className="links ml-4">
                    <p className="text-red-400 font-semibold">Mail us</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withContainer(BusinessDetails);
