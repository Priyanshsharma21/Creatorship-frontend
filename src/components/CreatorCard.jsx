import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreatorCard = ({ creator }) => {
  const navigate = useNavigate()

    const handleClick = (id)=>{
        navigate(`/creator/${id}`)
    }


  return (
    <div onClick={()=>handleClick(creator?._id)} className="home-cards max-w-sm w-full lg:max-w-full rounded-md lg:flex my-4">
      <div className="border-r w-full border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal shadow-lg">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{creator?.firstName} {creator?.lastName}</div>
          <p className="text-gray-700 text-base">{creator?.bio}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-600">{creator?.location?.city}, {creator?.location.country}</p>
            <p className="text-gray-600">Followers: YouTube {creator?.followers?.youtube}, Instagram {creator?.followers?.instagram}</p>
            <p className="text-gray-600">Engagement Rate: YouTube {creator?.engagementRate?.youtube}%, Instagram {creator?.engagementRate?.instagram}%</p>
            <p className="text-gray-600">Preferred Equity: {creator?.preferredEquity}</p>
            <p className="text-gray-600">Partnership Types: {creator?.partnershipTypes.join(', ')}</p>
            <p className="text-gray-600">Previous Partnerships: {creator?.previousPartnerships.join(', ')}</p>
            <p className="text-gray-900 leading-none mt-1">{creator?.niche}</p>
          </div>
        </div>
        <div className="flex mt-4">
          <a href={creator?.socialMediaHandles?.youtube} className="text-blue-500 hover:text-blue-700 mr-2">YouTube</a>
          <a href={creator?.socialMediaHandles?.instagram} className="text-blue-500 hover:text-blue-700 mr-2">Instagram</a>
          <a href={creator?.socialMediaHandles?.linkedin} className="text-blue-500 hover:text-blue-700">LinkedIn</a>
        </div>
      </div>
    </div>
  )
}

export default CreatorCard