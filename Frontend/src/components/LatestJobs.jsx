import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { alljob } = useSelector((state) => state.job);
  const navigate=useNavigate();
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Opening
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {alljob?.length > 0 ? (
          alljob
            .slice(0, 6)
            .map((job) => <LatestJobCard onClick={()=>navigate(`/details/${job._id}`)} key={job._id} job={job} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2a4 4 0 014-4h4m0 0l-3-3m3 3l-3 3M5 7h14"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Jobs Available
            </h2>

            <p className="text-gray-500 text-center max-w-md leading-relaxed">
              There are currently no job openings available. Please check back
              later for new opportunities and updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
