import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  MoreHorizontal,
  Edit2,
  Eye,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { user_api_end_point } from "../utils/constant";

const AdminJobTable = ({ jobs }) => {
  const navigate = useNavigate();
  const { searchText } = useSelector((store) => store.companies);

  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const filteredJob = jobs.filter((job) => {
      if (!searchText) {
        return true;
      }

      return (
        job?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setFilter(filteredJob);
  }, [jobs, searchText]);

  const handleDeleteJob = async (id) => {
    try {
      if (!window.confirm("Delete this job and all applications?")) return;

      const res = await axios.delete(`${user_api_end_point}/job/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        setFilter((prev) => prev.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="w-full rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Posted Jobs</h2>
          <p className="text-sm text-gray-500">
            Manage all jobs posted by your company
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="py-4 text-gray-500">
            Recently posted jobs list
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="min-w-65">Job</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden lg:table-cell">Salary</TableHead>
              <TableHead className="hidden sm:table-cell">
                Posted Date
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filter.length <= 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No jobs found
                </TableCell>
              </TableRow>
            ) : (
              filter.map((job) => (
                <TableRow
                  key={job._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center shrink-0">
                        {job?.company?.logo ? (
                          <img
                            src={job.company.logo}
                            alt={job.company.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <BriefcaseBusiness className="h-6 w-6 text-blue-600" />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {job.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {job?.company?.name}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">{job.jobtype}</Badge>

                          <Badge variant="outline">
                            {job.position} Positions
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                      <IndianRupee className="h-4 w-4" />
                      {job.salary / 100000} LPA
                    </div>
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(job.createdAt).toLocaleDateString("en-GB")}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-44 p-2">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() =>
                              navigate(`/admin/applicants/${job._id}`)
                            }
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition"
                          >
                            <Eye className="h-4 w-4" />
                            Applicants
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteJob(job._id);
                            }}
                            className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobTable;
