import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_#155e75,_transparent_42%),linear-gradient(135deg,#082f49,#0f172a_60%,#134e4a)] px-4 py-20 text-center text-white sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5">
        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
          No. 1 Job Hunt Website{" "}
        </span>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Search, Apply &<br />
          Get Your<span className="text-cyan-300"> Dream Jobs</span>
        </h1>
        <p className="max-w-2xl text-slate-300">
          Find meaningful work with teams building what comes next.
        </p>
        <div className="flex w-full max-w-2xl items-center gap-3 rounded-full border border-white/15 bg-white p-1.5 pl-5 shadow-2xl">
          <input
            type="text"
            placeholder="Search for jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-none bg-transparent text-slate-900 outline-none"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-cyan-600 hover:bg-cyan-500"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
