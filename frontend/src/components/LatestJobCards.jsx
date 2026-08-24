import { ArrowUpRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';

const LatestJobCards = ({job}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=> navigate(`/description/${job._id}`)} className='group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-950/10 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-teal-700'>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className='font-bold text-lg text-slate-900 dark:text-white'>{job?.company?.name}</h1>
            <p className='mt-1 flex items-center gap-1 text-sm text-slate-500'><MapPin className="h-3.5 w-3.5" /> India</p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-slate-300 transition-colors group-hover:text-teal-700" />
        </div>
        <div>
            <h1 className='my-4 text-xl font-bold text-slate-900 dark:text-white'>{job?.title}</h1>
            <p className='line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400'>{job?.description}</p>

        </div>
        <div className='mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4'>
          <Badge className={'bg-teal-50 font-bold text-teal-700'} variant="ghost"> {job?.position} positions </Badge>
          <Badge className={'bg-amber-50 font-bold text-amber-700'} variant="ghost">{job?.jobType}</Badge>
          <Badge className={'bg-slate-100 font-bold text-slate-700'} variant="ghost">{job?.salary} LPA</Badge>
        </div>
        
    </div>
  )
}

export default LatestJobCards