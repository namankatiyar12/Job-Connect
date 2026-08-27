import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Briefcase, GraduationCap, Loader2, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        navigate(`/verify-email?email=${encodeURIComponent(input.email)}`);
        toast.error("Please verify your email before signing in");
      } else {
        toast.error(error.response?.data?.message || "Unable to sign in");
      }
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
        `${USER_API_END_POINT}/goglelogin`,
        { role: input.role },
        {
          headers: { Authorization: `Bearer ${credentialResponse.credential}` },
          withCredentials: true,
        }
      );

      const userData = response.data?.user;
      dispatch(setUser(userData));
      navigate("/");
      toast.success(response.data?.message || "Login successful!");
    } catch (error) {
      console.error("Error in Google Sign-In:", error);
      toast.error(error.response?.data?.message || error.message || "Google login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:py-20">
        {/* Glow background accents */}
        <div className="hero-glow top-1/4 left-1/2 -translate-x-1/2 h-72 w-72 bg-teal-500/20 dark:bg-teal-500/10" />

        <div className="animate-rise-in relative z-10 w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none sm:p-10">
          <div className="text-center">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Welcome back
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sign in to JobConnect
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Pick up where your next career move left off.
            </p>
          </div>

          {/* Role selector buttons */}
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
              Recruiter
            </button>
          </div>

          <form onSubmit={submitHandler} className="mt-6 space-y-4">
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
                  placeholder="••••••••"
                  className="rounded-xl border-slate-200 pl-10 focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800/50"
                  required
                />
              </div>
            </div>

            {loading ? (
              <Button disabled className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:from-teal-700 hover:to-emerald-700 hover:shadow-xl"
              >
                Sign In
              </Button>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            <span className="absolute bg-white px-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:bg-slate-900">
              Or continue with
            </span>
          </div>

          {/* Embedded Google Sign In Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={() => toast.error("Google login failed")}
              useOneTap={false}
              shape="pill"
              theme="outline"
              size="large"
              text="continue_with"
            />
          </div>

          <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
