import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';
// const randomJobs=[
//     1,2,3,4,5,6,7,8
// ];

const LatestJobs = () => {
  const {allJobs} =useSelector(store=>store.job);
  return (
    <div className='mx-auto my-20 max-w-7xl px-4 sm:px-6'>
      <h1 className='text-3xl font-bold sm:text-4xl'><span className='text-slate-400'>Latest & top </span>Job Openings</h1>
      <div className='my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {
            allJobs.length<=0?<span>No Job available</span> :allJobs?.slice(0,6).map((job)=><LatestJobCards  key={job._id} job={job}/>)
        }
        </div>
        
    </div>
  )
}

export default LatestJobs