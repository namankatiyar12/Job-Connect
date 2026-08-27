import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { CheckCircle, ExternalLink, FileText, MoreHorizontal, Search, SlidersHorizontal, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const shortlistingStatus = ["Accepted", "Rejected"];

const getScoreStyle = (score) => {
  if (score >= 70) return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300";
  if (score >= 40) return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300";
  return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300";
};

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [resumeFilter, setResumeFilter] = useState("all");
  const [minimumScore, setMinimumScore] = useState("0");
  const [sortBy, setSortBy] = useState("score");

  const filteredApplications = useMemo(() => {
    const applications = applicants?.applications || [];
    const results = applications.filter((item) => {
      const applicant = item.applicant;
      const searchText = `${applicant?.fullname || ""} ${applicant?.email || ""}`.toLowerCase();
      const hasResume = Boolean(applicant?.profile?.resume);
      const score = item?.atsScore?.score || 0;
      return (
        searchText.includes(search.toLowerCase()) &&
        (resumeFilter === "all" || (resumeFilter === "resume" && hasResume) || (resumeFilter === "missing" && !hasResume)) &&
        score >= Number(minimumScore)
      );
    });
    return results.sort((first, second) => {
      if (sortBy === "recent") return new Date(second.createdAt) - new Date(first.createdAt);
      return (second?.atsScore?.score || 0) - (first?.atsScore?.score || 0);
    });
  }, [applicants, minimumScore, resumeFilter, search, sortBy]);

  const statusHandler = async (status, id) => {
    console.log("Updating application status:", { status, applicationId: id });
    if (!id || !/^[a-f\d]{24}$/i.test(String(id))) {
      toast.error("Application ID is missing or invalid");
      return;
    }
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) {
        dispatch(
          setAllApplicants({
            ...applicants,
            applications: (applicants?.applications || []).map((application) =>
              String(application.applicationId || application._id) === String(id)
                ? { ...application, status: status.toLowerCase() }
                : application
            ),
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update application status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Control Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800/50">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search candidate name or email..."
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder-slate-400 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <SlidersHorizontal className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          <span className="hidden sm:inline">Filters:</span>
        </div>

        <select
          value={resumeFilter}
          onChange={(event) => setResumeFilter(event.target.value)}
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="all">All Applicants</option>
          <option value="resume">Has Resume</option>
          <option value="missing">No Resume</option>
        </select>

        <select
          value={minimumScore}
          onChange={(event) => setMinimumScore(event.target.value)}
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="0">Any ATS Score</option>
          <option value="40">40%+ Match</option>
          <option value="70">70%+ Match</option>
        </select>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="score">Sort by Best Match</option>
          <option value="recent">Sort by Most Recent</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <Table>
          <TableCaption className="py-4 text-xs text-slate-400">
            Showing {filteredApplications.length} of {applicants?.applications?.length || 0} candidate applications
          </TableCaption>
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Candidate Name</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Email</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Contact</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">ATS Match</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Resume</TableHead>
              <TableHead className="font-bold text-slate-700 dark:text-slate-300">Applied Date</TableHead>
              <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Decision</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredApplications?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-sm text-slate-500">
                  No applicants match the current filter selection.
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((item) => {
                const appId = item?.applicationId || item?._id;
                return (
                  <TableRow key={appId || Math.random()} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <TableCell className="font-bold text-slate-900 dark:text-white">
                      {item?.applicant?.fullname || "Candidate"}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                      {item?.applicant?.email}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                      {item?.applicant?.phoneNumber || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-bold ${getScoreStyle(item?.atsScore?.score || 0)}`}>
                        {item?.atsScore?.score || 0}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.applicant?.profile?.resume ? (
                        <a
                          className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:underline dark:text-teal-400"
                          href={item?.applicant?.profile?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          {item?.applicant?.profile?.resumeOriginalName || "Resume"}
                          <ExternalLink className="h-3 w-3 ml-0.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">No Resume</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500 dark:text-slate-400">
                      {item?.createdAt?.split("T")[0] || "Recent"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
                          <MoreHorizontal className="h-4 w-4 text-slate-500" />
                        </PopoverTrigger>

                        <PopoverContent className="w-36 rounded-xl border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                          {shortlistingStatus.map((status, index) => (
                            <button
                              key={index}
                              onClick={() => statusHandler(status, appId)}
                              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                                status === "Accepted"
                                  ? "text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                                  : "text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                              }`}
                            >
                              {status === "Accepted" ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                              Mark {status}
                            </button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
