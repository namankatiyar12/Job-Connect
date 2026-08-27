import { setSearchedQuery } from "@/redux/jobSlice";
import { FilterX, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["DelhiNcr", "Banglore", "Hydrabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1 lakh to 5lakh", "5lakh to 10lakh", "10lakh to 20lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const { searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <aside className="w-full rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Filter Jobs</h2>
        </div>
        {(selectedValue || searchedQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedValue("");
              dispatch(setSearchedQuery(""));
            }}
            className="h-8 gap-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
          >
            <FilterX className="h-3.5 w-3.5" /> Clear
          </Button>
        )}
      </div>

      <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              {data.filterType}
            </h3>
            <div className="space-y-1">
              {data.array.map((item, idx) => {
                const itemId = `filter-${index}-${idx}`;
                return (
                  <div
                    key={idx}
                    className={`flex items-center space-x-2.5 rounded-xl px-3 py-2 transition-colors cursor-pointer ${
                      selectedValue === item
                        ? "bg-teal-50 text-teal-900 dark:bg-teal-950/60 dark:text-teal-200"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <RadioGroupItem value={item} id={itemId} className="text-teal-600" />
                    <Label htmlFor={itemId} className="cursor-pointer text-sm font-medium">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </aside>
  );
};

export default FilterCard;
