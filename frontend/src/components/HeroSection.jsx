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
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6">
        <span className="animate-rise-in rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
          Find work that moves you
        </span>
        <h1 className="animate-rise-in-delay text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Your next chapter<br />
          starts <span className="text-cyan-300">here.</span>
        </h1>
        <p className="animate-rise-in-delay max-w-2xl text-slate-300">
          Discover thoughtful teams, ambitious roles, and opportunities built around your potential.
        </p>
        <form onSubmit={(event) => { event.preventDefault(); searchJobHandler(); }} className="animate-rise-in-delay flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/15 bg-white p-2 pl-5 shadow-2xl shadow-slate-950/30 sm:rounded-full">
          <input
            type="text"
            placeholder="Search by title, skill, or location"
            aria-label="Search jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-none bg-transparent text-slate-900 outline-none"
          />
          <Button
            onClick={searchJobHandler}
            type="submit"
            className="rounded-xl bg-cyan-600 px-5 hover:bg-cyan-500 sm:rounded-full"
          >
            <Search className="h-5 w-5" />
          </Button>
        </form>
        <div className="grid w-full max-w-lg grid-cols-3 gap-8 border-t border-white/10 pt-6 text-left text-white/80">
          <div><strong className="block text-2xl text-white">10k+</strong><span className="text-xs uppercase tracking-wider">Open roles</span></div>
          <div><strong className="block text-2xl text-white">2.4k</strong><span className="text-xs uppercase tracking-wider">Hiring teams</span></div>
          <div><strong className="block text-2xl text-white">92%</strong><span className="text-xs uppercase tracking-wider">Match rate</span></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
