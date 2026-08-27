import { ArrowUpRight, Bookmark, Building2, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "Recently";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <article className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500/50">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {daysAgoFunction(job?.createdAt)}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked(!bookmarked);
            }}
            className={`rounded-full p-2 transition-colors ${
              bookmarked
                ? "bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            }`}
            aria-label="Save job"
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
            <AvatarFallback className="bg-teal-700 font-bold text-white">
              {job?.company?.name ? job.company.name.substring(0, 2).toUpperCase() : <Building2 className="h-5 w-5" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {job?.company?.name || "Company"}
            </h2>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="h-3 w-3 text-slate-400" />
              {job?.location || "India"}
            </p>
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

      <div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
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

        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            className="flex-1 rounded-xl bg-slate-900 font-semibold text-white transition-all hover:bg-teal-700 dark:bg-slate-800 dark:hover:bg-teal-600"
          >
            View Details <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Job;
