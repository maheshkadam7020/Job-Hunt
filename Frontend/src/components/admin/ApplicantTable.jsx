import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { user_api_end_point } from "../utils/constant";

const ApplicantTable = () => {
  const { singlejob } = useSelector((store) => store.job);
  
  const statusHandler = async (status, applicationId) => {
    try {
      const res = await axios.post(
        `${user_api_end_point}/updatestatus/${applicationId}`,
        { status },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Applicants
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Total Applicants: {singlejob?.applications?.length || 0}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="min-w-55">Candidate</TableHead>
                <TableHead className="min-w-55">Email</TableHead>
                <TableHead className="min-w-35">Phone</TableHead>
                <TableHead className="min-w-37.5">Resume</TableHead>
                <TableHead className="min-w-45">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {singlejob?.applications?.length > 0 ? (
                singlejob.applications.map((application) => (
                  <TableRow
                    key={application._id}
                    className="hover:bg-blue-50/40 transition-all duration-200"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11 border border-gray-200">
                          <AvatarImage
                            src={application.applicant?.profile?.profilephoto}
                          />
                          <AvatarFallback>
                            {application.applicant?.fullname
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-semibold text-gray-800 text-sm sm:text-base">
                            {application.applicant?.fullname}
                          </p>
                          <p className="text-xs text-gray-500">
                            Applicant ID:{" "}
                            {application.applicant?._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <p className="text-sm text-gray-700 break-all">
                        {application.applicant?.email}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-sm text-gray-700">
                        {application.applicant?.phonenumber}
                      </p>
                    </TableCell>

                    <TableCell>
                      {application.applicant?.profile?.resume ? (
                        <a
                          href={application.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
                        >
                          <FileText size={16} />
                          View Resume
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">No Resume</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Select
                          defaultValue={application.status}
                          onValueChange={(value) =>
                            statusHandler(value, application._id)
                          }
                        >
                          <SelectTrigger className="w-37.5 h-9 rounded-xl border-gray-200 bg-gray-50 text-sm shadow-none focus:ring-2 focus:ring-blue-400">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>

                          <SelectContent className="rounded-xl border border-gray-100 shadow-lg">
                            <SelectItem
                              value="pending"
                              className="cursor-pointer"
                            >
                              Pending
                            </SelectItem>
                            <SelectItem
                              value="accepted"
                              className="cursor-pointer"
                            >
                              Accepted
                            </SelectItem>
                            <SelectItem
                              value="rejected"
                              className="cursor-pointer"
                            >
                              Rejected
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <FileText className="text-gray-400" size={28} />
                      </div>

                      <h2 className="text-lg font-semibold text-gray-700">
                        No Applicants Found
                      </h2>

                      <p className="text-sm text-gray-500">
                        No one has applied for this job yet.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantTable;
