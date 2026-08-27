import { ArrowUpRight, Bookmark, Building2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group relative flex flex-col justify-between cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500/50"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
              <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
              <AvatarFallback className="bg-teal-700 text-sm font-bold text-white">
                {job?.company?.name ? job.company.name.substring(0, 2).toUpperCase() : <Building2 className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {job?.company?.name || "Company"}
              </h2>
              <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="h-3 w-3 text-slate-400" />
                {job?.location || "India"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Bookmark job"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <ArrowUpRight className="h-5 w-5 text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-600 dark:text-slate-600 dark:group-hover:text-teal-400" />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {job?.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {job?.description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <Badge variant="outline" className="border-teal-200 bg-teal-50/80 font-bold text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/80 dark:text-teal-300">
          {job?.position} Positions
        </Badge>
        <Badge variant="outline" className="border-amber-200 bg-amber-50/80 font-bold text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/80 dark:text-amber-300">
          {job?.jobType}
        </Badge>
        <Badge variant="outline" className="border-slate-200 bg-slate-100/80 font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;