import { setSearchQuery } from "@/redux/jobSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Herosection = () => {

  const [text, setText] = useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchHandler=()=>{
    dispatch(setSearchQuery(text));
    navigate('/browse')
  }

  return (
    <div className="w-full px-4 py-10 sm:py-16 text-center">
      <div className="flex flex-col gap-5 max-w-3xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No.1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Search, Apply & <br />
          Get your <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Find jobs, connect with companies, and build your career with ease.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search for jobs, companies..."
          onChange={(e)=>{
            setText(e.target.value)
          }}
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F83002]"
        />

        <button onClick={searchHandler} className="w-full sm:w-auto px-6 py-3 bg-[#F83002] text-white rounded-full hover:bg-[#d12700] transition duration-300">
          Search
        </button>
      </div>
    </div>
  );
};

export default Herosection;