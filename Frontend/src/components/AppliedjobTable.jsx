import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { user_api_end_point } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setApplication } from "@/redux/jobSlice";
import { toast } from "sonner";

const AppliedjobTable = () => {
  const { application } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const {user}= useSelector((store)=>store.auth)

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const fetchAppliedJob = async () => {
    try {
      const resp = await axios.get(
        `${user_api_end_point}/appliedjob`,
        {
          withCredentials: true,
        }
      );

      if (resp.data.success) {
        dispatch(setApplication(resp.data.Application));
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch applied jobs");
    }
  };

  useEffect(() => {
    fetchAppliedJob();
  }, []);

  const totalPages = Math.ceil(application.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = application.slice(indexOfFirstJob, indexOfLastJob);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

 return (
  user?.role === "student" && (
    <div className="w-full flex justify-center px-4 py-6">
      <div className="w-full max-w-7xl rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Applied Jobs
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Track all your job applications
            </p>
          </div>

          <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-blue-100">
            <BriefcaseBusiness className="text-blue-600 w-7 h-7" />
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <Table className="w-full">
            <TableCaption className="py-5 text-gray-500 text-base">
              Showing latest applied jobs
            </TableCaption>

            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-center py-4">
                  Applied Date
                </TableHead>
                <TableHead className="text-center py-4">
                  Company
                </TableHead>
                <TableHead className="text-center py-4">
                  Position
                </TableHead>
                <TableHead className="text-center py-4">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <TableRow
                    key={job._id}
                    className="hover:bg-gray-50 transition-all duration-300"
                  >
                    <TableCell className="text-center text-gray-600 py-5">
                      {new Date(job.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>

                    <TableCell className="text-center font-semibold text-gray-800 py-5">
                      {job.job?.company?.name}
                    </TableCell>

                    <TableCell className="text-center text-gray-700 py-5">
                      {job.job?.title}
                    </TableCell>

                    <TableCell className="text-center py-5">
                      <div className="flex justify-center">
                        <Badge
                          className={`rounded-full px-4 py-1.5 text-sm font-medium border capitalize ${getStatusColor(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-10 text-gray-500"
                  >
                    No applied jobs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-4 p-4 md:hidden">
          {currentJobs.map((job) => (
            <div
              key={job._id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 text-base">
                  {job.job?.company?.name}
                </h3>

                <Badge
                  className={`rounded-full px-3 py-1 text-xs font-medium border capitalize ${getStatusColor(
                    job.status
                  )}`}
                >
                  {job.status}
                </Badge>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="w-4 h-4 text-blue-500" />
                  <span>{job.job?.title}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-500" />
                  <span>{job.job?.company?.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-green-500" />
                  <span>
                    {new Date(job.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {application.length > jobsPerPage && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t bg-gray-50">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
);
};

export default AppliedjobTable;