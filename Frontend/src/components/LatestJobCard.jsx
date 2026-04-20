import React from "react";
import { Badge } from "./ui/badge";

import { Avatar, AvatarImage } from "./ui/avatar";
import daysAgoFunction from "./utils/postdate";

const LatestJobCard = ({job,onClick}) => {
  
  return (
    <div  onClick={onClick} className="w-full max-w-sm sm:max-w-md p-5 rounded-xl border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3 mt-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div>
          <h2 className="font-semibold text-gray-900">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      </div>

      <div className="mt-3">
        <h2 className="font-bold text-xl text-gray-800 leading-snug">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {job?.description}
  
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-red-50 text-red-600 hover:bg-red-100 transition">
          {job?.jobtype}
        </Badge>

        <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 transition">
         {job?.salary ? (job.salary / 100000).toFixed(1) : 'N/A'} LPA
        </Badge>
      </div>

      <div className="mt-5 flex justify-end items-center">
        <p className="text-xs text-gray-400">Posted {daysAgoFunction(job?.createdAt)===0?"today":daysAgoFunction(job?.createdAt)+" Days ago"}</p>
      </div>
    </div>
  );
};

export default LatestJobCard;
