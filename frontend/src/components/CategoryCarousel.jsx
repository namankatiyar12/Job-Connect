import { setSearchedQuery } from "@/redux/jobSlice";
import { ArrowRight, Code2, Cpu, Database, Layout, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const categories = [
  { label: "Frontend Developer", icon: Code2, count: "1.2k+ jobs", color: "from-blue-500/10 to-teal-500/10 text-blue-600 dark:text-blue-400" },
  { label: "Backend Developer", icon: Database, count: "950+ jobs", color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400" },
  { label: "Data Science", icon: Sparkles, count: "600+ jobs", color: "from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400" },
  { label: "Graphic Designer", icon: Palette, count: "480+ jobs", color: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400" },
  { label: "FullStack Developer", icon: Layout, count: "2.1k+ jobs", color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400" },
  { label: "DevOps Engineer", icon: Cpu, count: "430+ jobs", color: "from-teal-500/10 to-cyan-500/10 text-teal-600 dark:text-teal-400" },
  { label: "Cyber Security", icon: ShieldCheck, count: "310+ jobs", color: "from-red-500/10 to-rose-500/10 text-red-600 dark:text-red-400" },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="mx-auto my-16 max-w-7xl px-4 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
            Explore Categories
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Browse by Specialized Domain
          </h2>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate("/jobs")}
          className="hidden gap-2 font-semibold text-teal-600 hover:bg-teal-50 hover:text-teal-700 dark:text-teal-400 dark:hover:bg-teal-950/50 sm:flex"
        >
          View all jobs <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-3">
          {categories.map(({ label, icon: Icon, count, color }, index) => (
            <CarouselItem key={index} className="pl-3 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div
                onClick={() => searchJobHandler(label)}
                className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/60 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500/60"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-teal-600 dark:text-slate-600 dark:group-hover:text-teal-400" />
                </div>
                <h3 className="mt-4 font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {label}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{count}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex -left-4 bg-white shadow-md dark:bg-slate-800" />
        <CarouselNext className="hidden sm:flex -right-4 bg-white shadow-md dark:bg-slate-800" />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
