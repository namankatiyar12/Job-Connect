import { ArrowUpRight, Bookmark, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Job = ({job}) => {
  const navigate=useNavigate();
  // const jobId="";
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime=new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-950/10 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{daysAgoFunction(job?.createdAt)==0?"Today": `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="ghost" className="rounded-full text-slate-400 hover:text-teal-700" size="icon" aria-label="Save job">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
          <Avatar className="h-9 w-9">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white">{job?.company?.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" /> India</p>
        </div>
      </div>
      <div>
        <h1 className="my-4 text-xl font-bold text-slate-900 dark:text-white">{job?.title}</h1>
        <p className="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
            <Badge className={'bg-teal-50 font-bold text-teal-700'} variant="ghost">{job?.position} positions</Badge>
            <Badge className={'bg-amber-50 font-bold text-amber-700'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'bg-slate-100 font-bold text-slate-700'} variant="ghost">{job?.salary} LPA</Badge>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <Button onClick={()=>navigate(`/description/${job?._id}`)} className="flex-1 bg-slate-950 text-white hover:bg-teal-700"  >View details <ArrowUpRight /></Button>
          <Button variant="outline" size="icon" className="shrink-0" aria-label="Bookmark job"><Bookmark /></Button>

        </div>
    </article>
  
)};

export default Job;
