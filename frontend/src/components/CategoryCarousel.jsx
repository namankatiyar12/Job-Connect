import { setSearchedQuery } from "@/redux/jobSlice";
import { ArrowRight, Code2, Database, Palette, PenTool, Sparkles } from "lucide-react";
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

const category = [
  { label: "Frontend Developer", icon: Code2 },
  { label: "Backend Developer", icon: Database },
  { label: "Data Science", icon: Sparkles },
  { label: "Graphic Designer", icon: Palette },
  { label: "FullStack Developer", icon: PenTool },
];
const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

    const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    };


  return (
    <section className="mx-auto my-16 max-w-7xl px-4 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Explore by focus</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Find your kind of work</h2>
        </div>
        <ArrowRight className="hidden h-5 w-5 text-teal-700 sm:block" />
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {category.map(({ label, icon: Icon }, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <Button onClick={()=>searchJobHandler(label)} variant="outline" className="group h-auto w-full justify-start gap-3 rounded-2xl border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800" >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white dark:bg-teal-950"><Icon className="h-5 w-5" /></span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{label}</span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
