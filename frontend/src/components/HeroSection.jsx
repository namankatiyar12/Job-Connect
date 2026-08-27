import { setSearchedQuery } from "@/redux/jobSlice";
import { ArrowRight, Briefcase, Building2, Search, Sparkles, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (searchQuery) => {
    const q = searchQuery !== undefined ? searchQuery : query;
    dispatch(setSearchedQuery(q));
    navigate("/browse");
  };

  const quickTags = ["Frontend", "Backend", "Fullstack", "Data Science", "DevOps", "Remote"];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.3),rgba(255,255,255,0))]" />
      <div className="hero-glow top-20 left-10 h-96 w-96 bg-teal-500/20" />
      <div className="hero-glow bottom-10 right-10 h-96 w-96 bg-indigo-500/20" />

      {/* Decorative Grid Lines Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      <div className="relative mx-auto flex min-h-[640px] max-w-7xl flex-col justify-between px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-rise-in inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-teal-400" />
            <span>Discover 10,000+ Verified Career Opportunities</span>
          </div>

          <h1 className="animate-rise-in-delay mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Connect with Companies <br />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-indigo-300 bg-clip-text text-transparent">
              Building the Future
            </span>
          </h1>

          <p className="animate-rise-in-delay mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            JobConnect streamlines your job search. Match with leading startups, enterprise tech teams, and high-impact remote projects effortlessly.
          </p>

          {/* Interactive Search Bar */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              searchJobHandler();
            }}
            className="animate-rise-in-delay mx-auto mt-10 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-xl shadow-2xl transition-all focus-within:border-teal-400/60 focus-within:ring-4 focus-within:ring-teal-500/20 sm:flex-row sm:items-center sm:rounded-full"
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <Search className="h-5 w-5 shrink-0 text-teal-400" />
              <input
                type="text"
                placeholder="Job title, technical skill, or city..."
                aria-label="Search jobs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-400 outline-none"
              />
            </div>
            <Button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-7 py-3 font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-emerald-600 sm:rounded-full"
            >
              Find Jobs <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          {/* Quick Search Chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Popular:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => searchJobHandler(tag)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300 transition-colors hover:border-teal-400/50 hover:bg-teal-500/20 hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 sm:grid-cols-4 lg:gap-8">
          <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">12,500+</p>
              <p className="text-xs text-slate-400">Active Job Posts</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">3,200+</p>
              <p className="text-xs text-slate-400">Top Employers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">45,000+</p>
              <p className="text-xs text-slate-400">Hired Candidates</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">98.4%</p>
              <p className="text-xs text-slate-400">Match Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
