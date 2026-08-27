import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <Table>
      <TableCaption className="py-4 text-xs text-slate-400">A list of all jobs posted by your organization</TableCaption>
      <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
        <TableRow>
          <TableHead className="font-bold text-slate-700 dark:text-slate-300">Company</TableHead>
          <TableHead className="font-bold text-slate-700 dark:text-slate-300">Job Role</TableHead>
          <TableHead className="font-bold text-slate-700 dark:text-slate-300">Date Posted</TableHead>
          <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterJobs?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="py-12 text-center text-sm text-slate-500">
              No posted jobs found matching search criteria.
            </TableCell>
          </TableRow>
        ) : (
          filterJobs?.map((job) => (
            <TableRow key={job._id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <TableCell className="font-semibold text-slate-900 dark:text-white">
                {job?.company?.name || "N/A"}
              </TableCell>
              <TableCell className="font-bold text-teal-700 dark:text-teal-300">{job?.title}</TableCell>
              <TableCell className="text-sm text-slate-500 dark:text-slate-400">
                {job?.createdAt?.split("T")[0] || "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <MoreHorizontal className="h-4 w-4 text-slate-500" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 rounded-xl border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <button
                      onClick={() => navigate(`/admin/companies/${job?.company?._id || job._id}`)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                      Edit Details
                    </button>
                    <button
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Eye className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      Applicants
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AdminJobsTable;
