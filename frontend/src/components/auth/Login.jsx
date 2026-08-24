import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading ,user} = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
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
      console.log(error);
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
  useEffect(()=>{
    if(user){
      navigate("/");
    }

  },[])

  
const handleGoogleSignIn = async (credentialResponse) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${USER_API_END_POINT}/goglelogin`, {}, {
      headers: { Authorization: `Bearer ${credentialResponse.credential}` },
      withCredentials: true, 
    });

    const userData = response.data?.user;
    dispatch(setUser(userData));

    navigate("/");
    toast.success("Login successful!");
  } catch (error) {
    console.error("Error in Google Sign-In:", error);
    toast.error(error.response?.data?.message || error.message || "Google login failed");
  } finally {
    dispatch(setLoading(false));
  }
};


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <form
          onSubmit={submitHandler}
          className="animate-rise-in w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Welcome back</p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Sign in to JobConnect</h1>
          <p className="mb-6 text-sm text-slate-500">Pick up where your next opportunity begins.</p>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="naman@gmail.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="1234.."
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full bg-black text-white  my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin " />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-black text-white  my-4">
              Login
            </Button>
          )}

          <span className="text-small">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-teal-700 hover:underline">
              Sign up
            </Link>
          </span>
        </form>
      </div>
      <div className="mx-auto -mt-6 flex min-h-10 w-[calc(100%-2rem)] max-w-md justify-center pb-10">
        <GoogleLogin onSuccess={handleGoogleSignIn} onError={() => toast.error("Google login failed")} useOneTap={false} />
      </div>
    </div>
  );
};

export default Login;
