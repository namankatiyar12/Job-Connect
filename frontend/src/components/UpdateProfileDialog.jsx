import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { FileText, Loader2, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || "",
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file && typeof input.file !== "string") {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-3xl border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 sm:max-w-[480px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Update Profile</DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Keep your profile details and skills up to date for recruiters.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="mt-4 space-y-4">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Full Name
            </Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Email Address
            </Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Phone Number
            </Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                type="number"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Bio Summary
            </Label>
            <Input
              type="text"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              placeholder="Fullstack Developer with 3+ years experience..."
              className="mt-1 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800/50"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Skills (comma separated)
            </Label>
            <Input
              type="text"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="React, Node.js, TypeScript, Tailwind"
              className="mt-1 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800/50"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Upload Resume (PDF)
            </Label>
            <div className="relative mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800/50">
              <FileText className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="w-full text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-teal-950 dark:file:text-teal-300"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            {loading ? (
              <Button disabled className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Changes...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-emerald-700"
              >
                Save Profile Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
