import { setSearchedQuery } from '@/redux/jobSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const filterData=[
  {
    filterType:"Location",
    array:["DelhiNcr","Banglore","Hydrabad","Pune","Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer","Backend Developer","FullStack Developer","Data Scientist"]
  },
  {
    filterType:"Salary",
    array:["0-40k","42-1lakh","1 lakh to 5lakh","5lakh to 10lakh","10lakh to 20lakh"]
  },
]

const FilterCard = () => {
  const [selectedValue , setSelectedValue]=useState('');
  const dispatch=useDispatch();
  const changeHandler=(value)=>{
    setSelectedValue(value);

  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));

  },[selectedValue]);


  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Filter jobs</h1>
        {selectedValue && <button onClick={() => changeHandler("")} className="text-xs font-semibold text-teal-700 hover:underline">Clear</button>}
      </div>
      <hr className="my-4 border-slate-100 dark:border-slate-800"/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {
        filterData.map((data,index) => (
          <div key={index}>
            <h1 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{data.filterType}</h1>
            {
              data.array.map((item,idx)=>{
                const itemId=`id${index}-${idx}`
                return (
                  <div key={idx} className="my-1 flex items-center space-x-2 rounded-lg px-2 py-2 transition-colors hover:bg-teal-50 dark:hover:bg-slate-800">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} >{item}</Label>
                  </div>
                )
              })
            }
          </div>
        ))
      }
      </RadioGroup>
    </aside>
  )
}

export default FilterCard
// import React, { useState } from 'react';
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'; // Assuming you have a RadioGroup and RadioGroupItem component.

// const filterData = [
//   {
//     filterType: "Location",
//     array: ["DelhiNcr", "Banglore", "Hyderabad", "Pune", "Mumbai"],
//   },
//   {
//     filterType: "Industry",
//     array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist"],
//   },
//   {
//     filterType: "Salary",
//     array: ["0-40k", "42-1lakh", "1 lakh to 5lakh", "5lakh to 10lakh", "10lakh to 20lakh"],
//   },
// ];

// const FilterCard = () => {
//   const [selectedFilters, setSelectedFilters] = useState({});

//   const handleFilterChange = (filterType, value) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterType]: value,
//     }));
//   };

//   return (
//     <div className="p-4 border rounded-md shadow-md w-full max-w-md bg-white">
//       <h1 className="text-2xl font-semibold mb-4">Filter Jobs</h1>
//       <hr className="mb-4" />
//       {filterData.map((filter, index) => (
//         <div key={index} className="mb-6">
//           <h2 className="text-lg font-medium mb-2">{filter.filterType}</h2>
//           <RadioGroup
//             className="flex flex-col gap-2"
//             value={selectedFilters[filter.filterType] || ''}
//             onChange={(value) => handleFilterChange(filter.filterType, value)}
//           >
//             {filter.array.map((item, idx) => (
//               <RadioGroupItem
//                 key={idx}
//                 value={item}
//                 label={item}
//                 className="flex items-center gap-2"
//               />
//             ))}
//           </RadioGroup>
//         </div>
//       ))}
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">Selected Filters:</h3>
//         <ul className="list-disc ml-5 mt-2">
//           {Object.entries(selectedFilters).map(([key, value], idx) => (
//             <li key={idx}>
//               <strong>{key}:</strong> {value}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FilterCard;
