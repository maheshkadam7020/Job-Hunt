import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { user_api_end_point } from "../utils/constant";
import { useSelector } from "react-redux";
import store from "@/redux/store";



const AddCompany = () => {
  const {user}=useSelector(store=>store.auth)
   if (!user) {
      navigate("/login");
    }
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("website", data.website);
      formData.append("location", data.location);

      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }

      const resp = await axios.post(
        `${user_api_end_point}/company/registercompany`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (resp.data.success) {
        toast.success(resp.data.message);
        setTimeout(() => {
          navigate(`/admin/company`);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Add New Company
          </h1>
          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Fill in the company details below to create a new company profile.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
              <div>
                <div className="mb-6 inline-flex rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  Company Registration
                </div>

                <h2 className="text-4xl font-bold leading-tight">
                  Build your company profile professionally.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/80">
                  Add company information, website, logo, and location to help
                  job seekers know more about your organization.
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm text-white/80">
                  Keep your company profile complete and attractive to improve
                  trust and visibility.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-6"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                    {...register("name", {
                      required: "Company name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write company description"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                    {...register("description")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Website
                    </label>
                    <input
                      type="text"
                      placeholder="https://company.com"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                      {...register("website")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                      {...register("location")}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Company Logo
                  </label>
                  <div className="rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:border-violet-500">
                    <input
                      type="file"
                      className="w-full cursor-pointer text-sm text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-violet-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-violet-700 hover:file:bg-violet-200"
                      {...register("file")}
                    />
                    <p className="mt-3 text-xs text-slate-400">
                      PNG, JPG or JPEG up to 5MB
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/company")}
                    className="w-full rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-300 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {isSubmitting ? "Adding..." : "Add Company"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;