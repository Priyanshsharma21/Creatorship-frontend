import React from 'react'
import { useAnimeContext } from '../context/animeContext'
import { IoBusinessOutline } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";

const SelectType = () => {
    const { setUserType } = useAnimeContext()
    
    const handleClick = (type)=>{
        setUserType(type)
    }

  return (
    <div className="select-type">
        <div className="b-heading text-center text-[#e2e2e2] font-semibold">
            Join as a Creator or Business
        </div>
        <div className="s-boxes flex justify-around mt-5">
            <div className="s-box-1 s-box cursor-pointer" onClick={()=>handleClick("business")}>
                <div className="b-icon ml-4 mt-6">
                    <IoBusinessOutline className='text-[#e2e2e2] text-xl'/>
                </div>
                <div className="b-text ml-4 mt-6">
                    {"I'm a business, looking for a creator"}
                </div>
            </div>
            <div className="s-box-2 s-box ml-5 cursor-pointer" onClick={()=>handleClick("creator")}>
                <div className="b-icon ml-4 mt-6">
                    <MdOndemandVideo className='text-[#e2e2e2] text-xl'/>
                </div>
                <div className="b-text ml-4 mt-6">
                    {"I'm a creator, looking for a business"}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SelectType