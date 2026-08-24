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

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const {loading,user}=useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async(e) => {
    const formData=new FormData();
    formData.append('fullname',input.fullname);
    formData.append('email',input.email);
    formData.append('phoneNumber',input.phoneNumber);
    formData.append('password',input.password);
    formData.append('role',input.role);
    if(input.file){
      formData.append('file',input.file);
    }
    try {
      dispatch(setLoading(true));
      const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
      },
      withCredentials:true,
    });
    if(res.data.success){
      navigate(`/verify-email?email=${encodeURIComponent(input.email)}`);
      toast.success("Check your inbox to verify your email");
    }
  } catch (error) {
      console.log(error);
       toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
    
  }


    useEffect(()=>{
      if(user){
        navigate("/");
      }
  
    }, [])
  
  const handleGoogleSignIn = async (credentialResponse) => {
  try {
      dispatch(setLoading(true));
    const response = await axios.post(`${USER_API_END_POINT}/goglesignup`, {}, {
      headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${credentialResponse.credential}`,
      },
      withCredentials: true,
    });

    dispatch(setUser(response.data?.user));
    navigate("/");
    toast.success("Account created with Google");
  } catch (error) {
    console.error("Error in signing in:", error);
    toast.error(error.response?.data?.message || error.message || "Google signup failed");
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
          className="animate-rise-in w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Start your journey</p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Create your JobConnect profile</h1>
          <p className="mb-6 text-sm text-slate-500">A stronger profile gets you closer to the right team.</p>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            placeholder="Naman Katiyar" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="naman@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="number"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler} placeholder="1234567890" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="Password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="1234.." />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role=='student'}
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
                  checked={input.role=='recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file"
              onChange={changeFileHandler}
              className="cursor-pointer" />
            </div>
          </div>
          {loading ? (
            <Button className="w-full bg-black text-white  my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin " />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-black text-white  my-4">
              Signup
            </Button>
          )}
          <span className="text-small">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-teal-700 hover:underline">
              Login
            </Link>
          </span>
        </form>
        
      </div>
      <div className="mx-auto my-4 flex min-h-10 w-[calc(100%-2rem)] max-w-md justify-center">
        <GoogleLogin onSuccess={handleGoogleSignIn} onError={() => toast.error("Google signup failed")} useOneTap={false} />
      </div>
    </div>
  );
};

export default Signup;
