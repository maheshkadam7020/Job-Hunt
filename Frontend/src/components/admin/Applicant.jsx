import React, { useEffect } from "react";
import ApplicantTable from "./ApplicantTable";
import axios from "axios";
import { user_api_end_point } from "../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const Applicant = () => {
    const dispatch=useDispatch();
  const { id } = useParams();
  const fetchJobApplicants = async () => {
    try {
      const resp = await axios.get(`${user_api_end_point}/applicant/${id}`, {
        withCredentials: true,
      });
      if(resp.data.success)
      {
            dispatch(setSingleJob(resp.data.Job));
            
      }
      else toast.error(resp.data.message)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchJobApplicants();
  })
  return (
    <div className="max-w-7xl mx-auto">
      <ApplicantTable />
    </div>
  );
};

export default Applicant;
