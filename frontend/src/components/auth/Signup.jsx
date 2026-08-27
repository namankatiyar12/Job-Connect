import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Briefcase, GraduationCap, Image as ImageIcon, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
      toast.error("Please fill in all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate(`/verify-email?email=${encodeURIComponent(input.email)}`);
        toast.success("Check your inbox to verify your email");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async (credentialResponse) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/goglesignup`,
        { role: input.role },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentialResponse.credential}`,
          },
          withCredentials: true,
        }
      );

      dispatch(setUser(response.data?.user));
      navigate("/");
      toast.success(response.data?.message || "Account created with Google");
    } catch (error) {
      console.error("Error in signing in:", error);
      toast.error(error.response?.data?.message || error.message || "Google signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:py-16">
        {/* Glow background accent */}
        <div className="hero-glow top-1/4 left-1/2 -translate-x-1/2 h-80 w-80 bg-teal-500/20 dark:bg-teal-500/10" />

        <div className="animate-rise-in relative z-10 w-full max-w-xl rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none sm:p-10">
          <div className="text-center">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Start your journey
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create your JobConnect profile
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              A complete profile connects you directly to top opportunities.
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="mt-6 flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => setInput({ ...input, role: "student" })}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                input.role === "student"
                  ? "bg-white text-teal-700 shadow-md dark:bg-slate-900 dark:text-teal-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Student / Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setInput({ ...input, role: "recruiter" })}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                input.role === "recruiter"
                  ? "bg-white text-teal-700 shadow-md dark:bg-slate-900 dark:text-teal-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Recruiter / Employer
            </button>
          </div>

          <form onSubmit={submitHandler} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Full Name
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventHandler}
                    placeholder="Naman Katiyar"
                    className="rounded-xl border-slate-200 pl-10 focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800/50"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Phone Number
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="number"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    placeholder="9876543210"
                    className="rounded-xl border-slate-200 pl-10 focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800/50"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Email Address
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="naman@gmail.com"
                  className="rounded-xl border-slate-200 pl-10 focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800/50"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Password
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Create password"
                  className="rounded-xl border-slate-200 pl-10 focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800/50"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Profile Avatar (Optional)
              </Label>
              <div className="relative mt-1 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800/50">
                  <ImageIcon className="h-4 w-4 text-slate-400" />
                  <input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-teal-950 dark:file:text-teal-300"
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <Button disabled className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:from-teal-700 hover:to-emerald-700 hover:shadow-xl"
              >
                Sign Up
              </Button>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            <span className="absolute bg-white px-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:bg-slate-900">
              Or sign up with
            </span>
          </div>

          {/* Embedded Google Sign In Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={() => toast.error("Google signup failed")}
              useOneTap={false}
              shape="pill"
              theme="outline"
              size="large"
              text="signup_with"
            />
          </div>

          <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
