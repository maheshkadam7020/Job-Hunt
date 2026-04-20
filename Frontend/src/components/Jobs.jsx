import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import OnlyJobs from "./OnlyJobs";
import { useSelector } from "react-redux";
import useGetAllJobs from "./useGetAllJobs";
import { motion } from "framer-motion";
const Jobs = () => {
  useGetAllJobs();

  const { alljob, searchquery } = useSelector((state) => state.job);
  const [filterJob, setFilterJob] = useState(alljob);

  useEffect(() => {
    if (searchquery) {
      const query = String(searchquery).toLowerCase();

      const fillteredjob = alljob.filter((job) => {
        return (
          job.title.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.salary >= Number(searchquery)
        );
      });

      setFilterJob(fillteredjob);
    } else {
      setFilterJob(alljob);
    }
  }, [alljob, searchquery]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-5">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="w-full sm:w-70">
          <FilterCard />
        </div>

        <div className="flex-1">
          {filterJob.length === 0 ? (
            <span className="text-2xl font-bold">No jobs available</span>
          ) : (
            <div className="h-[80vh] overflow-y-auto pb-5">
              <motion.div
                key={searchquery}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filterJob.map((job) => (
                  <OnlyJobs key={job._id} job={job} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
