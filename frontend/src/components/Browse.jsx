import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
//const randomJobs = [1, 2, 3, 4, 5, 6, 7];
const Browse = () => {
  useGetAllJobs();



  const {allJobs}=useSelector(store=>store.job);
  const dispatch=useDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""));
    }

  },[])
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Opportunity board</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Find work that fits.</h1>
            <p className="mt-2 text-slate-500">{allJobs.length} roles matched to your search.</p>
          </div>
          <button className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:self-auto"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
        </div>
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-400 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <Search className="h-5 w-5" /><span className="text-sm">Showing your latest search results</span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default Browse;
