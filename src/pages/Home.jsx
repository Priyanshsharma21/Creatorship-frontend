import React, { useState } from 'react';
import withContainer from '../hof/Hof';
import ShowAll from '../components/ShowAll.jsx';  
import ForYou from '../components/ForYou.jsx';   

const Home = () => {
  const [active, setActive] = useState("All");

  const handleClick = (section) => {
    setActive(section);
  };

  return (
    <div className="w-full min-h-screen bg-[#161616]">
      <div className="home-main-box flex w-full justify-center">
        <div
          className={`h-box-1 text-center cursor-pointer flex justify-center items-center font-semibold text-[#e2e2e2] ${active === "All" ? "bg-[#c4c4c484] rounded-xl w-[60px] h-[30px]" : ""}`}
          onClick={()=>handleClick("All")}
        >
          All
        </div>
        <div
          className={`h-box-1 cursor-pointer text-center flex ml-3 justify-center items-center font-semibold text-[#e2e2e2] ${active === "For you" ? "bg-[#c4c4c484] rounded-xl w-[80px] h-[30px]" : ""}`}
          onClick={()=>handleClick("For you")}
        >
          For you
        </div>
      </div>

      <div className="content w-full flex flex-col items-center">
        {active === "All" ? <ShowAll /> : <ForYou />}
      </div>
    </div>
  );
};

export default withContainer(Home);
