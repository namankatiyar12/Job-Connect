import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import axios from "axios";
import { MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { PopoverContent } from "../ui/popover";
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
  if (score >= 70) return "bg-emerald-100 text-emerald-700";
  if (score >= 40) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
};
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [search, setSearch] = useState("");
  const [resumeFilter, setResumeFilter] = useState("all");
  const [minimumScore, setMinimumScore] = useState("0");

  const filteredApplications = useMemo(() => {
    const applications = applicants?.applications || [];
    return applications.filter((item) => {
      const applicant = item.applicant;
      const searchText = `${applicant?.fullname || ""} ${applicant?.email || ""}`.toLowerCase();
      const hasResume = Boolean(applicant?.profile?.resume);
      const score = item?.atsScore?.score || 0;
      return searchText.includes(search.toLowerCase()) &&
        (resumeFilter === "all" || (resumeFilter === "resume" && hasResume) || (resumeFilter === "missing" && !hasResume)) &&
        score >= Number(minimumScore);
    });
  }, [applicants, minimumScore, resumeFilter, search]);

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 dark:border-slate-700">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search applicants" className="h-10 w-full bg-transparent text-sm outline-none dark:text-white" />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500"><SlidersHorizontal className="h-4 w-4" /><span className="hidden sm:inline">Filter</span></div>
        <select value={resumeFilter} onChange={(event) => setResumeFilter(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <option value="all">All applicants</option>
          <option value="resume">Has resume</option>
          <option value="missing">No resume</option>
        </select>
        <select value={minimumScore} onChange={(event) => setMinimumScore(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <option value="0">Any ATS score</option>
          <option value="40">40%+ match</option>
          <option value="70">70%+ match</option>
        </select>
      </div>
      <Table>
        <TableCaption>Showing {filteredApplications.length} of {applicants?.applications?.length || 0} applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>

            <TableHead>Contact</TableHead>
            <TableHead>ATS match</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            filteredApplications.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  <div className="group relative w-fit">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${getScoreStyle(item?.atsScore?.score || 0)}`}>
                      {item?.atsScore?.score || 0}%
                    </span>
                    <div className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 hidden w-64 rounded-lg border bg-white p-3 text-xs text-slate-600 shadow-xl group-hover:block dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">Matched skills:</strong> {item?.atsScore?.matchedKeywords?.join(", ") || "No matches yet"}
                      {item?.atsScore?.missingKeywords?.length > 0 && <><br /><strong className="text-slate-900 dark:text-white">Missing keywords:</strong> {item.atsScore.missingKeywords.join(", ")}</>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
