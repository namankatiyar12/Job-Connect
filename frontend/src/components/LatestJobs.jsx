import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';
// const randomJobs=[
//     1,2,3,4,5,6,7,8
// ];

const LatestJobs = () => {
  const {allJobs} =useSelector(store=>store.job);
  return (
    <section className='mx-auto my-20 max-w-7xl px-4 sm:px-6'>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Curated for you</p>
          <h1 className='text-3xl font-bold tracking-tight dark:text-white sm:text-4xl'><span className='text-slate-400'>Latest & top </span>Job Openings</h1>
        </div>
        <span className="hidden text-sm text-slate-500 sm:block">Fresh opportunities, updated daily</span>
      </div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {
            allJobs.length<=0?<span>No Job available</span> :allJobs?.slice(0,6).map((job)=><LatestJobCards  key={job._id} job={job}/>)
        }
        </div>
        
    </section>
  )
}

export default LatestJobs