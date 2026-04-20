
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { user_api_end_point } from "../utils/constant";
import { setAllAdminJob } from "@/redux/jobSlice";

const useGetAdminJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${user_api_end_point}/admin/job`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(setAllAdminJob(response.data.Job));
         
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching Admin Jobs:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch Admin jobs"
        );
      }
    };

    fetchCompanies();
  }, [dispatch]);

  return null;
};

export default useGetAdminJob;