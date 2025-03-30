import { auth, googleProvider } from "@/firebasse";
import { setLoading, setUser } from "@/redux/authSlice";
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
      toast.error(error.response?.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
    if(user){
      navigate("/");
    }

  },[])

  
const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In Result:", result);

    const token = await result.user.getIdToken();

    const response = await axios.post(`${USER_API_END_POINT}/goglelogin`, {}, {
      headers: { Authorization: token },
      withCredentials: true, 
    });

    const userData = response.data?.user;
    console.log("User Data :", userData);

    // dispatch(setUser(userData.user));

    navigate("/");

    toast.success("Login successful!");

  } catch (error) {
    console.error("Error in Google Sign-In:", error);
    toast.error("Login failed. Please try again.");
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
          <h1 className="font-bold text-xl mb-5">Login</h1>

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
            <Link to="/signup" className="text-blue-600">
              Sign up
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

export default Login;
