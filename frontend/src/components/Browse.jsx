import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
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
      <div className="mx-auto my-10 max-w-7xl px-4 sm:px-6">
        <h1 className="font-bold text-xl my-10">
          search results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
