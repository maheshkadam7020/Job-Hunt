import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { user_api_end_point } from "../utils/constant";

const useGetCompies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${user_api_end_point}/company/get`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(setCompanies(response.data.Companies));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch companies"
        );
      }
    };

    fetchCompanies();
  }, [dispatch]);

  return null;
};

export default useGetCompies;