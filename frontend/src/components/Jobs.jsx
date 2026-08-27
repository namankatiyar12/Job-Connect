import { motion } from "framer-motion";
import { BriefcaseBusiness, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-slate-200/80 bg-white px-4 py-12 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
        <div className="hero-glow top-0 right-10 h-64 w-64 bg-teal-500/10" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
            Opportunity Board
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Explore Open Roles
          </h1>
          <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">
            Discover verified job opportunities tailored to your skill set and ambition.
          </p>

          {searchedQuery && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              <Search className="h-3.5 w-3.5" /> Filtered by: "{searchedQuery}"
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Mobile Filter Toggle */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <p className="text-sm font-medium text-slate-500">
            Showing <strong className="text-slate-900 dark:text-white">{filterJobs.length}</strong> roles
          </p>
          <Button
            variant="outline"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 rounded-xl border-slate-200 dark:border-slate-800"
          >
            <Filter className="h-4 w-4 text-teal-600" /> Filters
          </Button>
        </div>

        {mobileFilterOpen && (
          <div className="mb-6 lg:hidden">
            <FilterCard />
          </div>
        )}

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop Filter Sidebar */}
          <div className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterCard />
            </div>
          </div>

          {/* Job List Container */}
          {filterJobs?.length <= 0 ? (
            <div className="flex min-h-[400px] flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                <BriefcaseBusiness className="h-8 w-8" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No Roles Match Your Search</h2>
              <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Try searching for a different keyword or clear your active filters to see all available opportunities.
              </p>
            </div>
          ) : (
            <div className="flex-1">
              <div className="mb-4 hidden items-center justify-between lg:flex">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Showing <strong className="text-slate-900 dark:text-white">{filterJobs.length}</strong> available positions
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
