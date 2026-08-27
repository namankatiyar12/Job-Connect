import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Award, Briefcase, Building2, DollarSign, FileText, Loader2, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 1,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      toast.error("Please select a registered company first");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="animate-rise-in rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="text-center">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Recruiter Posting Portal
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create New Job Opening
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Fill in the role details to publish this opportunity to candidates
            </p>
          </div>

          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Job Title
                </Label>
                <div className="relative mt-1">
                  <Briefcase className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    placeholder="Senior React Developer"
                    className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Target Company
                </Label>
                <div className="mt-1">
                  {companies.length > 0 ? (
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
                        <SelectValue placeholder="Select Registered Company" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white dark:bg-slate-900">
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                      *Please register a company profile first before posting jobs.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Compensation / Package (LPA)
                </Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                    placeholder="12"
                    className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Location
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="Bangalore, Remote, Delhi NCR"
                    className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Job Type
                </Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  placeholder="Full-time, Contract, Internship"
                  className="mt-1 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800/50"
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Experience Level (Years)
                </Label>
                <div className="relative mt-1">
                  <Award className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    placeholder="2-4"
                    className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Open Positions Count
                </Label>
                <div className="relative mt-1">
                  <Users className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                    placeholder="3"
                    className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Job Overview & Description
              </Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="We are looking for an experienced developer to join our core team..."
                className="mt-1 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800/50"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Required Technical Skills (Comma-separated)
              </Label>
              <div className="relative mt-1">
                <FileText className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  placeholder="React, TypeScript, Node.js, MongoDB"
                  className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              {loading ? (
                <Button disabled className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing Opening...
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={companies.length === 0}
                  className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:from-teal-700 hover:to-emerald-700 hover:shadow-xl"
                >
                  Publish Job Posting
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostJob;
