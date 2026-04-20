import { user_api_end_point } from "@/components/utils/constant";
import { resetSearchQuery, setAllJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchquery } = useSelector((store) => store.job);

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${user_api_end_point}/jobs/get?keyword=${encodeURIComponent(searchquery || "")}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setAllJob(response.data.Job));
      } else {
        dispatch(setAllJob([]));
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(setAllJob([]));
      console.error(error);
    }
  };

  fetchJobs();

}, []);
useEffect(() => {
  return () => {
    dispatch(resetSearchQuery());
  };
}, []);
}
export default useGetAllJobs;
