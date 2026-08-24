import { setSearchedQuery } from "@/redux/jobSlice";
import { ArrowRight, Search, Sparkles } from "lucide-react";
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
    <section className="relative isolate min-h-[620px] overflow-hidden bg-slate-950 text-white">
      <img
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85"
        alt="A bright creative team workspace"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,.94)_0%,rgba(2,6,23,.78)_42%,rgba(2,6,23,.25)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-slate-950/80 to-transparent" />

      <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col justify-between px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-3xl">
          <div className="animate-rise-in mb-6 flex items-center gap-2 text-sm font-semibold text-teal-200">
            <Sparkles className="h-4 w-4" /> The better way to find your next role
          </div>
          <h1 className="animate-rise-in-delay max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
            Make your next move <span className="text-teal-300">matter.</span>
          </h1>
          <p className="animate-rise-in-delay mt-7 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            Find work that fits your ambition, your rhythm, and the kind of future you want to build.
          </p>
        </div>

        <div className="animate-rise-in-delay mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <form onSubmit={(event) => { event.preventDefault(); searchJobHandler(); }} className="flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/20 bg-white p-2 pl-5 shadow-2xl shadow-slate-950/40 sm:rounded-full">
            <Search className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, skill, or location"
              aria-label="Search jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-none bg-transparent text-slate-900 outline-none"
            />
            <Button type="submit" className="rounded-xl bg-teal-700 px-5 hover:bg-teal-800 sm:rounded-full">
              Search <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex gap-8 border-l border-white/20 pl-6 text-left">
            <div><strong className="block text-2xl text-white">10k+</strong><span className="text-xs uppercase tracking-wider text-slate-300">Open roles</span></div>
            <div><strong className="block text-2xl text-white">2.4k</strong><span className="text-xs uppercase tracking-wider text-slate-300">Hiring teams</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
