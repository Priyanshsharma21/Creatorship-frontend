import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import withContainer from '../hof/Hof';

const CreatorDetails = () => {
  const { VITE_URL } = import.meta.env;
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        const res = await axios.get(`${VITE_URL}/creator/${id}`, options);
        setCreator(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch creator details');
        setLoading(false);
      }
    };

    fetchCreatorDetails();
  }, [id]);

  const handleChatWithUs = (contact) => {
    const encodedMessage = encodeMessage();
    const whatsappUrl = `https://wa.me/${contact}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailUs = () => {
    window.location.href = `mailto:${creator?.email}`;
  };

  const encodeMessage = () => {
    const message = `
    Hi ${creator.firstName} ${creator.lastName},

    My name is [Your Name], and I'm interested in partnering with you. I am impressed by your work and would love to collaborate to help expand your reach and increase engagement.

    Based on your profile, I can offer:
    - ${creator.skills.join('\n- ')}

    I have worked with various partners, including ${creator.previousCollaborations.join(', ')}. I believe we can achieve great success together.

    Please let me know a convenient time to discuss this further.

    Best regards,
    [Your Name]
    [Your Contact Information]
  `;

    return message;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#161616] pt-[5rem] mx-auto text-white">
    {creator && (
      <div className="max-w-4xl w-full lg:max-w-full rounded-md lg:flex my-4 mx-auto">
        <div className="border w-full border-gray-400 bg-[#1c1c1c] rounded p-4 flex flex-col justify-between leading-normal shadow-lg">
          <div className="mb-8">
            <div className="text-white font-bold text-2xl mb-2">{`${creator.firstName} ${creator.lastName}`}</div>
            <p className="text-gray-300 text-base">{creator.bio}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="text-sm">
              <p className="text-white font-semibold">Email:</p>
              <p className="text-gray-400">{creator.email}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Location:</p>
              <p className="text-gray-400">{`${creator.location.city}, ${creator.location.country}`}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Availability:</p>
              <p className="text-gray-400">{creator.availability}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Niche:</p>
              <p className="text-gray-400">{creator.niche}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Content Type:</p>
              <p className="text-gray-400">{creator.contentType}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Preferred Equity:</p>
              <p className="text-gray-400">{creator.preferredEquity}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Engagement Rate:</p>
              <p className="text-gray-400">
                YouTube: {creator.engagementRate.youtube}%<br />
                Instagram: {creator.engagementRate.instagram}%<br />
                Twitter: {creator.engagementRate.twitter}%<br />
                LinkedIn: {creator.engagementRate.linkedin}%
              </p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Followers:</p>
              <p className="text-gray-400">
                YouTube: {creator.followers.youtube}<br />
                Instagram: {creator.followers.instagram}<br />
                Twitter: {creator.followers.twitter}<br />
                LinkedIn: {creator.followers.linkedin}
              </p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Portfolio Links:</p>
              {creator.portfolioLinks.map((link, index) => (
                <p key={index} className="text-gray-400"><a href={link} className="text-blue-500 hover:text-blue-700">Portfolio {index + 1}</a></p>
              ))}
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Partnership Types:</p>
              <p className="text-gray-400">{creator.partnershipTypes.join(', ')}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Previous Partnerships:</p>
              <p className="text-gray-400">{creator.previousPartnerships.join(', ')}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Additional Skills:</p>
              <p className="text-gray-400">{creator.additionalSkills.join(', ')}</p>
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Social Media Handles:</p>
              <p className="text-gray-400"><a href={creator.socialMediaHandles.youtube} className="text-blue-500 hover:text-blue-700">YouTube</a></p>
              <p className="text-gray-400"><a href={creator.socialMediaHandles.instagram} className="text-blue-500 hover:text-blue-700">Instagram</a></p>
              <p className="text-gray-400"><a href={creator.socialMediaHandles.twitter} className="text-blue-500 hover:text-blue-700">Twitter</a></p>
              <p className="text-gray-400"><a href={creator.socialMediaHandles.linkedin} className="text-blue-500 hover:text-blue-700">LinkedIn</a></p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default withContainer(CreatorDetails);
