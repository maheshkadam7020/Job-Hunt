import React, { use } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import daysAgoFunction from "./utils/postdate";

const OnlyJobs = ({ job }) => {
  const navigate=useNavigate();
  
  return (
    <div className="w-full bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl p-5">
      
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Posted {daysAgoFunction(job?.createdAt)===0?"today":daysAgoFunction(job?.createdAt)+" Days ago"}</span>

        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div>
          <h2 className="font-semibold text-gray-900">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      
      <div className="mt-4">
        <h1 className="font-bold text-lg text-gray-800">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {job?.description}
        </p>
      </div>

      
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-blue-50 text-blue-700">{job?.position} Positions</Badge>
        <Badge className="bg-red-50 text-red-600">{job?.jobtype}</Badge>
        <Badge className="bg-purple-50 text-purple-700">{job?.salary ? (job.salary / 100000).toFixed(1) : 'N/A'} LPA</Badge>
      </div>

      <div className="flex gap-2 mt-5">
        <Button onClick={() => { navigate(`/details/${job?._id}`) }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
          Details
        </Button>

        <Button variant="outline" className="flex-1">
          Save
        </Button>
      </div>
    </div>
  );
};

export default OnlyJobs;