import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Plus } from "lucide-react";
import useGetAdminJob from "./useGetAdminJob";
import { setSearchText } from "@/redux/companySlice";
import AdminJobTable from "./AdminJobPortal";

const AdminJobs = () => {
  const { alladminjob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  useGetAdminJob();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border p-5 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <BriefcaseBusiness className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Admin Jobs
                </h1>
                <p className="text-sm text-gray-500">
                  Manage and track all posted jobs
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                placeholder="Search by job title or company"
                className="w-full sm:w-[320px] h-11 rounded-xl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <Button
                onClick={() => navigate("/admin/post/job")}
                className="h-11 rounded-xl px-5 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Button>
            </div>
          </div>
        </div>

        <AdminJobTable jobs={alladminjob} />
      </div>
    </div>
  );
};

export default AdminJobs;