import { Briefcase, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="mx-auto my-20 max-w-7xl px-4 sm:px-6">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
            <Sparkles className="h-3.5 w-3.5" /> Curated Opportunities
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Featured <span className="gradient-text">Job Openings</span>
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Handpicked high-impact roles from verified hiring teams
        </p>
      </div>

      {allJobs.length <= 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
            <Briefcase className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No Jobs Found Right Now</h3>
          <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Check back soon or try updating your search criteria to explore new open positions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allJobs?.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestJobs;