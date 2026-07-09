import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import{motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs , setFilterJobs]=useState(allJobs);


  // useEffect(()=>{
  //   if(searchedQuery){
  //     const filteredJobs=allJobs.filter((job)=>{
  //       return job.title.toLowerCase().includes(searchedQuery.toLowerCase())||
  //       job.description.toLowerCase().includes(searchedQuery.toLowerCase())||
  //       job.location.toLowerCase().includes(searchedQuery.toLowerCase())

  //     })
  //     setFilterJobs(filteredJobs)

  //   }
  //   else{
  //     setFilterJobs(allJobs)
  //   }


  // },[allJobs,searchedQuery]);

  useEffect(() => {
  if (searchedQuery) {
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      const salary = Number(job.salary);

      // Title
      if (job.title.toLowerCase().includes(query)) return true;

      // Description
      if (job.description.toLowerCase().includes(query)) return true;

      // Location
      if (job.location.toLowerCase().includes(query)) return true;

      // Industry (optional)
      if (job.title.toLowerCase().includes(query)) return true;

      // Salary
      // Salary
if (query === "1-5 lpa") {
  return salary >= 1 && salary <= 5;
}

if (query === "5-10 lpa") {
  return salary > 5 && salary <= 10;
}

if (query === "10-20 lpa") {
  return salary > 10 && salary <= 20;
}

if (query === "20-30 lpa") {
  return salary > 20 && salary <= 30;
}

if (query === "30-40 lpa") {
  return salary > 30 && salary <= 40;
}

if (query === "40-50 lpa") {
  return salary > 40 && salary <= 50;
}

if (query === "50-60 lpa") {
  return salary > 50 && salary <= 60;
}
      return false;
    });

    setFilterJobs(filteredJobs);
  } else {
    setFilterJobs(allJobs);
  }
}, [allJobs, searchedQuery]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {filterJobs?.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {
                  filterJobs.map((job) => (
                    <motion.div
                    initial={{opacity:0,x:100}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0,x:-100}}
                    transition={{duration:0.3}}
                    
                    key={job?._id}>
                      <Job job={job} />
                    </motion.div>
                  ))
                  //  <div key={index}>
                  //     <Job />
                  //   </div>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
