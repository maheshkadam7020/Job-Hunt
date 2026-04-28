import React, { useEffect, useState } from "react";
import {
  MapPin,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  Users,
  CalendarDays,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { user_api_end_point } from "./utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import daysAgoFunction from "./utils/postdate";
import { Avatar, AvatarImage } from "./ui/avatar";

const Details = () => {
  const navigate = useNavigate();
  const { singlejob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isApplied = singlejob?.applications?.some(
    (application) => application?.applicant === user?._id
  );

  const [applied, setApplied] = useState(isApplied);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (singlejob && user) {
      const alreadyApplied = singlejob?.applications?.some(
        (application) =>
          application?.applicant?.toString() === user?._id?.toString()
      );

      setApplied(alreadyApplied);
    }
  }, [singlejob, user]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `${user_api_end_point}/getjob/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(setSingleJob(response.data.Job));

  
        const alreadyApplied = response.data.Job?.applications?.some(
          (application) =>
            application?.applicant?.toString() === user?._id?.toString()
        );

        setApplied(alreadyApplied);
      }
    } catch (error) {
      toast.error("Failed to fetch job details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const applyjob = async (jobid) => {
    try {
      if (!user) {
        return navigate("/login");
      }

      const resp = await axios.get(
        `${user_api_end_point}/applyjob/${jobid}`,
        {
          withCredentials: true,
        }
      );

      if (resp.data.success) {
        toast.success(resp.data.message);

        const updateSingleJob = {
          ...singlejob,
          
          applications: [
            ...(singlejob?.applications || []),
            { applicant: user._id },
          ],
        };

        dispatch(setSingleJob(updateSingleJob));
        setApplied(true);
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex justify-center px-4 py-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
        
        
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
           
            <div className="text-center lg:text-left">
              
             
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-center sm:text-left">
                
                
                <Avatar className="w-14 h-14 bg-white p-1 shadow-md rounded-xl">
                  <AvatarImage
                    src={singlejob?.company?.logo}
                    alt="Company Logo"
                    className="w-full h-full object-contain"
                  />
                </Avatar>

                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 break-words">
                  {singlejob?.title}
                </h1>
              </div>

              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-5">
                <Badge className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm">
                  {singlejob?.position || 1} Positions
                </Badge>

                <Badge className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm">
                  {singlejob?.jobtype || "Part Time"}
                </Badge>

                <Badge className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm">
                  {singlejob?.salary
                    ? (singlejob.salary / 100000).toFixed(1)
                    : "N/A"}{" "}
                  LPA
                </Badge>
              </div>
            </div>

            
            <div className="flex justify-center lg:justify-end">
              <Button
                disabled={applied}
                onClick={() => applyjob(singlejob?._id)}
                className={`px-5 py-3 sm:px-8 sm:py-6 text-sm sm:text-base rounded-xl ${
                  applied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {applied ? "Applied" : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>

       
        <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          <h2 className="text-lg font-bold text-gray-500 mb-6 border-b pb-3">
            {singlejob?.description}
          </h2>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="flex items-start gap-4 p-4 rounded-2xl border bg-gray-50">
              <BriefcaseBusiness className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-sm text-gray-500">Role</h3>
                <p className="font-semibold text-gray-800">
                  {singlejob?.title}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl border bg-gray-50">
              <MapPin className="w-6 h-6 text-red-500 mt-1" />
              <div>
                <h3 className="text-sm text-gray-500">Location</h3>
                <p className="font-semibold text-gray-800">
                  {singlejob?.location || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl border bg-gray-50">
              <Clock3 className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-sm text-gray-500">Experience</h3>
                <p className="font-semibold text-gray-800">
                  {singlejob?.experience || "0 - 2"} Year
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl border bg-gray-50">
              <IndianRupee className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="text-sm text-gray-500">Salary</h3>
                <p className="font-semibold text-gray-800">
                  {singlejob?.salary
                    ? (singlejob.salary / 100000).toFixed(1)
                    : "N/A"}{" "}
                  LPA
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl border bg-gray-50">
              <Users className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h3 className="text-sm text-gray-500">Total Applicants</h3>
                <p className="font-semibold text-gray-800">
                  {singlejob?.applications?.length || 0} Applicants
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl border bg-gray-50">
              <CalendarDays className="w-6 h-6 text-cyan-600 mt-1" />
              <div>
                <h3 className="text-sm text-gray-500">Posted</h3>
                <p className="font-semibold text-gray-800">
                  {daysAgoFunction(singlejob?.createdAt) === 0
                    ? "Today"
                    : `${daysAgoFunction(singlejob?.createdAt)} Days Ago`}
                </p>
              </div>
            </div>
          </div>

          
          <div className="mt-8 p-5 rounded-2xl border bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              About This Job
            </h3>
            <p className="text-gray-600 leading-7">
              {singlejob?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;