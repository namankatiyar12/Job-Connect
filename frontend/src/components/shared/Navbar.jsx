import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { BriefcaseBusiness, LogOut, Moon, Sun, User2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null)); // Correct Redux dispatch usage
        navigate("/"); // Use the navigate function from useNavigate
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-slate-950 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
            <BriefcaseBusiness className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">
            Job<span className="text-teal-700">Connect</span>
          </h1>
        </Link>
        <div className="flex items-center gap-4 sm:gap-10">
          <ul className="hidden items-center gap-5 font-medium text-slate-600 dark:text-slate-300 sm:flex">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link className="transition-colors hover:text-teal-700" to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-teal-700" to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="transition-colors hover:text-teal-700" to="/">Home</Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-teal-700" to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-teal-700" to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle color theme"
            title="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-slate-600 dark:text-slate-300"
          >
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
          </Button>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-teal-700 hover:bg-teal-800">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover className="bg-white">
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2  text-gray-600 bg-white">
                  {user && user.role == "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">view Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
