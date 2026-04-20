import React, { useEffect } from "react";
import OnlyJobs from "./Onlyjobs";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "./useGetAllJobs";
import { setSearchQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";
const Browse = () => {
  useGetAllJobs();
  const { alljob } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  });
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-xl">Search Result ({alljob.length})</h1>
      <motion.div
        
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
      >
        {alljob.map((item) => (
          <OnlyJobs key={item._id} job={item} />
        ))}
      </motion.div>
    </div>
  );
};

export default Browse;
