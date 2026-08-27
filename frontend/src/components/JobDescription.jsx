import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Award, Briefcase, Building2, Calendar, CheckCircle2, Clock, DollarSign, Loader2, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => String(application.applicant?._id || application.applicant) === String(user?._id)
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [isApplying, setIsApplying] = useState(false);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please sign in to apply for this job");
      return;
    }
    if (user.role !== "student") {
      toast.error("Only student accounts can apply for jobs");
      return;
    }
    try {
      setIsApplying(true);
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to apply for this job");
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => String(application.applicant?._id || application.applicant) === String(user?._id)
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Main Job Header Card */}
        <div className="animate-rise-in overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} />
                <AvatarFallback className="bg-teal-700 text-lg font-bold text-white">
                  {singleJob?.company?.name ? singleJob.company.name.substring(0, 2).toUpperCase() : <Building2 className="h-7 w-7" />}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  {singleJob?.title}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400">
                  <Building2 className="h-4 w-4" /> {singleJob?.company?.name || "Company"}
                  <span className="mx-1 text-slate-300">•</span>
                  <MapPin className="h-4 w-4 text-slate-400" /> {singleJob?.location || "India"}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-teal-200 bg-teal-50 font-bold text-teal-700 dark:border-teal-900/60 dark:bg-teal-950 dark:text-teal-300">
                    {singleJob?.position} Positions Available
                  </Badge>
                  <Badge variant="outline" className="border-amber-200 bg-amber-50 font-bold text-amber-700 dark:border-amber-900/60 dark:bg-amber-950 dark:text-amber-300">
                    {singleJob?.jobType}
                  </Badge>
                  <Badge variant="outline" className="border-indigo-200 bg-indigo-50 font-bold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950 dark:text-indigo-300">
                    {singleJob?.salary} LPA
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              onClick={isApplied ? undefined : applyJobHandler}
              disabled={isApplied || isApplying}
              className={`rounded-2xl px-8 py-6 text-base font-bold shadow-lg transition-all ${
                isApplied
                  ? "bg-slate-200 text-slate-600 cursor-not-allowed dark:bg-slate-800 dark:text-slate-400"
                  : "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 shadow-teal-600/25"
              }`}
            >
              {isApplying ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                </>
              ) : isApplied ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-500" /> Already Applied
                </>
              ) : (
                "Apply For Job"
              )}
            </Button>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8 dark:border-slate-800 sm:grid-cols-4">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Experience</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{singleJob?.experienceLevel || 0} Years</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Compensation</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{singleJob?.salary} LPA</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Applicants</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{singleJob?.applications?.length || 0}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Posted Date</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{singleJob?.createdAt?.split("T")[0] || "Recent"}</p>
              </div>
            </div>
          </div>

          {/* Job Overview & Description */}
          <div className="mt-10 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job Description & Responsibilities</h2>
              <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/30">
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {singleJob?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDescription;
