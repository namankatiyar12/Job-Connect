import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Job Management Workspace
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Posted Job Listings
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Create, inspect, and manage active recruitment postings
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-emerald-700"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Post New Job
          </Button>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:w-80">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <Input
            placeholder="Filter by job title or company..."
            onChange={(e) => setInput(e.target.value)}
            className="border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 dark:text-white"
          />
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <AdminJobsTable />
        </div>
      </main>
    </div>
  );
};

export default AdminJobs;
