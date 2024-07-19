import React from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessCard = ({ business }) => {
    const navigate = useNavigate()

    const handleClick = (id)=>{
        navigate(`/business/${id}`)
    }


  return (
    <div onClick={()=>handleClick(business?._id)} className="home-cards cursor-pointer max-w-sm w-full lg:max-w-full rounded-md lg:flex my-4">
      <div className="border-r w-full border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal shadow-lg">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{business?.companyName}</div>
          <p className="text-gray-700 text-base">{business?.aboutUs}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{business?.contactPersonName}</p>
            <p className="text-gray-600">{business?.location?.city}, {business?.location.country}</p>
            <p className="text-gray-600">Industry: {business?.industry}</p>
            <p className="text-gray-600">Budget: {business?.budget}</p>
            <p className="text-gray-600">Equity Offered: {business?.equityOffered}</p>
            <p className="text-gray-600">Founded Year: {business?.foundedYear}</p>
            <p className="text-[#ffa72c] font-semibold">{business?.industry}</p>
          </div>
        </div>
        <div className="flex mt-4">
          <a href={business.website} className="text-blue-500 hover:text-blue-700">Website</a>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
