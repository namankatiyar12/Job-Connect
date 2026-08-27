import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { BriefcaseBusiness, LogOut, Menu, Moon, Sun, User2, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 glass-nav dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-slate-900 transition-opacity hover:opacity-90 dark:text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-md shadow-teal-500/20">
            <BriefcaseBusiness className="h-5 w-5" />
          </span>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Job<span className="gradient-text">Connect</span>
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 font-medium text-slate-600 dark:text-slate-300 md:flex">
          {user && user.role === "recruiter" ? (
            <>
              <Link
                to="/admin/companies"
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive("/admin/companies")
                    ? "bg-teal-50 font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                    : "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                Companies
              </Link>
              <Link
                to="/admin/jobs"
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive("/admin/jobs")
                    ? "bg-teal-50 font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                    : "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                Manage Jobs
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive("/")
                    ? "bg-teal-50 font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                    : "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive("/jobs")
                    ? "bg-teal-50 font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                    : "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                Find Jobs
              </Link>
              <Link
                to="/browse"
                className={`rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive("/browse")
                    ? "bg-teal-50 font-semibold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                    : "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                Browse
              </Link>
            </>
          )}
        </nav>

        {/* Actions & User Profile */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
          </Button>

          {!user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login">
                <Button variant="ghost" className="rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-700 hover:to-emerald-700 hover:shadow-lg">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border-2 border-teal-500/40 ring-2 ring-teal-500/20 transition-transform hover:scale-105">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  <AvatarFallback className="bg-teal-700 text-sm font-semibold text-white">
                    {user?.fullname ? user.fullname.substring(0, 2).toUpperCase() : "JC"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 rounded-2xl border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    <AvatarFallback className="bg-teal-700 font-semibold text-white">
                      {user?.fullname ? user.fullname.substring(0, 2).toUpperCase() : "JC"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <h4 className="truncate font-semibold text-slate-900 dark:text-white">{user?.fullname}</h4>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-1 text-sm">
                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <User2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
          <nav className="flex flex-col gap-2 font-medium text-slate-700 dark:text-slate-200">
            {user && user.role === "recruiter" ? (
              <>
                <Link
                  to="/admin/companies"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 transition-colors ${
                    isActive("/admin/companies") ? "bg-teal-50 text-teal-700 font-bold dark:bg-teal-950 dark:text-teal-300" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Companies
                </Link>
                <Link
                  to="/admin/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 transition-colors ${
                    isActive("/admin/jobs") ? "bg-teal-50 text-teal-700 font-bold dark:bg-teal-950 dark:text-teal-300" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Manage Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 transition-colors ${
                    isActive("/") ? "bg-teal-50 text-teal-700 font-bold dark:bg-teal-950 dark:text-teal-300" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 transition-colors ${
                    isActive("/jobs") ? "bg-teal-50 text-teal-700 font-bold dark:bg-teal-950 dark:text-teal-300" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Find Jobs
                </Link>
                <Link
                  to="/browse"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 transition-colors ${
                    isActive("/browse") ? "bg-teal-50 text-teal-700 font-bold dark:bg-teal-950 dark:text-teal-300" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Browse
                </Link>
              </>
            )}

            {!user && (
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center rounded-xl font-semibold">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
