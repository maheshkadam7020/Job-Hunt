import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { BriefcaseBusiness, MapPin, IndianRupee } from "lucide-react";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { user_api_end_point } from "../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const { companies } = useSelector((store) => store.companies);
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      experience: "",
      position: "",
      jobtype: "",
      company: "",
    },
  });

  const submitHandler = async (data) => {
    try {
      const resp = await axios.post(
        `${user_api_end_point}/admin/postjob`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (resp.data.success) {
        toast.success(resp.data.message);
        setTimeout(()=>{navigate('/admin/jobs')},1500)
        reset();
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <BriefcaseBusiness className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Post a New Job
                </h1>
                <p className="text-sm md:text-base text-blue-100 mt-1">
                  Fill in the details below to publish a new job opening
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-5 md:p-8">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    placeholder="Frontend Developer"
                    className="h-11 rounded-xl"
                    {...register("title", {
                      required: "Job title is required",
                    })}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Company</Label>
                  <Select
                    onValueChange={(value) => setValue("company", value)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>

                    <SelectContent>
                      {companies?.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <input
                    type="hidden"
                    {...register("company", {
                      required: "Company is required",
                    })}
                  />

                  {errors.company && (
                    <p className="text-sm text-red-500">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Pune, Maharashtra"
                      className="h-11 rounded-xl pl-10"
                      {...register("location", {
                        required: "Location is required",
                      })}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-sm text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Salary</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="600000"
                      className="h-11 rounded-xl pl-10"
                      {...register("salary", {
                        required: "Salary is required",
                      })}
                    />
                  </div>
                  {errors.salary && (
                    <p className="text-sm text-red-500">
                      {errors.salary.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Experience</Label>
                  <Input
                    placeholder="2 Years"
                    className="h-11 rounded-xl"
                    {...register("experience", {
                      required: "Experience is required",
                    })}
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-500">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Open Positions</Label>
                  <Input
                    type="number"
                    placeholder="5"
                    className="h-11 rounded-xl"
                    {...register("position", {
                      required: "Position is required",
                    })}
                  />
                  {errors.position && (
                    <p className="text-sm text-red-500">
                      {errors.position.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select
                    onValueChange={(value) => setValue("jobtype", value)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Full Time">Full Time</SelectItem>
                      <SelectItem value="Part Time">Part Time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>

                  <input
                    type="hidden"
                    {...register("jobtype", {
                      required: "Job type is required",
                    })}
                  />

                  {errors.jobtype && (
                    <p className="text-sm text-red-500">
                      {errors.jobtype.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Write complete job description..."
                  className="min-h-30 rounded-xl"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Requirements</Label>
                <Textarea
                  placeholder="React, Node.js, MongoDB, Communication Skills"
                  className="min-h-25 rounded-xl"
                  {...register("requirements", {
                    required: "Requirements are required",
                  })}
                />
                {errors.requirements && (
                  <p className="text-sm text-red-500">
                    {errors.requirements.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto rounded-xl px-8 h-11 bg-blue-600 hover:bg-blue-700"
              >
                Post Job
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;