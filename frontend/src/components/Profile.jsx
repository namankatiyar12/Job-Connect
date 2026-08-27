import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { ExternalLink, FileText, Mail, Pen, Phone, User2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTables from "./AppliedJobTables";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import UpdateProfileDialog from "./UpdateProfileDialog";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* User Info Header Card */}
        <div className="animate-rise-in overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-2 border-teal-500/40 ring-4 ring-teal-500/10">
                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                <AvatarFallback className="bg-teal-700 text-xl font-bold text-white">
                  {user?.fullname ? user.fullname.substring(0, 2).toUpperCase() : <User2 className="h-8 w-8" />}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.fullname}</h1>
                  <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                    {user?.role}
                  </span>
                </div>
                <p className="mt-1 max-w-lg text-sm text-slate-600 dark:text-slate-400">
                  {user?.profile?.bio || "No bio added yet. Click edit to introduce yourself."}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>{user?.phoneNumber || "Not provided"}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="gap-2 rounded-xl border-slate-200 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <Pen className="h-4 w-4 text-teal-600 dark:text-teal-400" /> Edit Profile
            </Button>
          </div>

          {/* Skills Pill Section */}
          <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Skills & Tech Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-teal-200 bg-teal-50/80 px-3 py-1 font-semibold text-teal-800 dark:border-teal-900/60 dark:bg-teal-950/80 dark:text-teal-200"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-slate-400">No skills added yet</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Resume / CV Document</h2>
            <div className="mt-3">
              {user?.profile?.resume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user?.profile?.resume}
                  className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-100 dark:border-teal-900/60 dark:bg-teal-950 dark:text-teal-300"
                >
                  <FileText className="h-4 w-4" />
                  {user?.profile?.resumeOriginalName || "View Resume PDF"}
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              ) : (
                <span className="text-xs text-slate-400">No resume file uploaded yet</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Table Section */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Applied Applications</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 mb-6">
            Track the status of positions you have applied for
          </p>
          <AppliedJobTables />
        </div>
      </main>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
