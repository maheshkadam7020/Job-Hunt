import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { user_api_end_point } from "../utils/constant";
import store from "@/redux/store";
import { useSelector } from "react-redux";

const UpdateCompany = () => {
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const resp = await axios.get(
          `${user_api_end_point}/company/getcompany/${id}`,
          {
            withCredentials: true,
          },
        );

        const company = resp.data.Company;

        setValue("name", company.name);
        setValue("description", company.description);
        setValue("website", company.website);
        setValue("location", company.location);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load company details");
      }
    };

    fetchCompany();
  }, [id, setValue]);

  const submitHandler = async (data) => {
    try {
      const resp = await axios.put(
        `${user_api_end_point}/company/updatecompany/${id}`,
        {
          name: data.name,
          description: data.description,
          website: data.website,
          location: data.location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (resp.data.success) {
        toast.success(resp.data.message);

        setTimeout(() => {
          navigate("/admin/company");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update company");
    }
  };
  if (!user) {
    navigate("/login");
  }
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Update Company
          </h1>
          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Update your company information below.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
              <div>
                <div className="mb-6 inline-flex rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  Company Update
                </div>

                <h2 className="text-4xl font-bold leading-tight">
                  Keep your company details up to date.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/80">
                  Update company logo, website, location, and description for
                  better visibility.
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm text-white/80">
                  A complete company profile helps attract more candidates.
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
                    {isSubmitting ? "Updating..." : "Update Company"}
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

export default UpdateCompany;
