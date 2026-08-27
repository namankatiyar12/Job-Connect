import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTables = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
      <Table>
        <TableCaption className="py-4 text-xs text-slate-400">A comprehensive history of your job applications</TableCaption>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow>
            <TableHead className="font-bold text-slate-700 dark:text-slate-300">Date Applied</TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-300">Job Role</TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-300">Company</TableHead>
            <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Application Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-12 text-center text-sm text-slate-500">
                You have not applied to any positions yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs?.map((appliedJob) => (
              <TableRow key={appliedJob?._id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <TableCell className="font-medium text-slate-600 dark:text-slate-400">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="font-bold text-slate-900 dark:text-white">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-300">
                  {appliedJob?.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={`font-bold uppercase tracking-wider ${
                      appliedJob?.status === "rejected"
                        ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950 dark:text-rose-300"
                        : appliedJob?.status === "pending"
                        ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950 dark:text-amber-300"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950 dark:text-emerald-300"
                    }`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTables;
