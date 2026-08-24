import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs , setFilterJobs]=useState(allJobs);


  useEffect(()=>{
    if(searchedQuery){
      const filteredJobs=allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase())||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase())||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())

      })
      setFilterJobs(filteredJobs)

    }
    else{
      setFilterJobs(allJobs)
    }


  },[allJobs,searchedQuery]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-10 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">The opportunity board</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">Work worth showing up for.</h1>
          <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">Browse roles from teams looking for your exact perspective and skills.</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="w-full shrink-0 lg:w-64">
            <FilterCard />
          </div>

          {filterJobs?.length <= 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <BriefcaseBusiness className="mb-3 h-8 w-8 text-slate-300" />
              <h2 className="font-bold text-slate-900 dark:text-white">No roles found</h2>
              <p className="mt-1 text-sm text-slate-500">Try another keyword or clear your filters.</p>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
