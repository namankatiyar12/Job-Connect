import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Briefcase, Search } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Browse Directory
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Search & Explore Roles
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              {allJobs.length} {allJobs.length === 1 ? "role" : "roles"} matching your current parameters.
            </p>
          </div>
        </div>

        {searchedQuery && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50/70 p-4 text-teal-900 dark:border-teal-900/60 dark:bg-teal-950/60 dark:text-teal-200">
            <Search className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <p className="text-sm font-medium">
              Active query: <strong className="font-bold">"{searchedQuery}"</strong>
            </p>
          </div>
        )}

        {allJobs.length <= 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
              <Briefcase className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No Matching Results</h2>
            <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              We couldn't find any positions matching your search query. Try broadening your keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
