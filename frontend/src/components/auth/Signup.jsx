import { auth, googleProvider } from '@/./firebasse.js';
import { setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
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
    e.preventDefault();
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
      navigate("/login");
      toast.success(res.data.message);
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
  
  const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result);

    const token = await result.user.getIdToken();
    
    const response = await axios.post(`${USER_API_END_POINT}/goglesignup`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, 
      },
    });

    console.log("userData: ", response.data);
  } catch (error) {
    console.error("Error in signing in:", error);
  }
};


  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            placeholder="Naman katiyar" />
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
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
        
      </div>
      <button
  onClick={handleGoogleSignIn}
  className="flex items-center justify-center gap-2 w-full bg-red-600 text-white p-3 rounded-md font-semibold hover:bg-red-700 transition-all duration-200 my-4"
>
  <img
    src="/google-icon.svg"
    alt="Google Logo"
    className="h-5 w-5"
  />
  Sign in with Google
</button>
    </div>
  );
};

export default Signup;
