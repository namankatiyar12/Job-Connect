import React, { useEffect, useState } from 'react'
import { RadioGroup,RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData=[
  {
    filterType:"Location",
    array:["DelhiNcr","Bangalore","Hyderabad","Pune","Mumbai","Delhi","Chennai","Kolkata","Jaipur","Lucknow"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer","Backend Developer","FullStack Developer","Data Scientist","AI/ML Engineer","DevOps Engineer","Mobile App Developer","UI/UX Designer","Cybersecurity Specialist","Cloud Solutions Architect"]
  },
  {
  filterType: "Salary",
  array: [
    "1-5 LPA",
    "5-10 LPA",
    "10-20 LPA",
    "20-30 LPA",
    "30-40 LPA",
    "40-50 LPA",
    "50-60 LPA"
    
  ]
}
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
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-md">Filter Jobs</h1>
      <hr className="mt-3"/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {
        filterData.map((data,index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {
              data.array.map((item,idx)=>{
                const itemId=`id${index}-${idx}`
                return (
                  <div key={idx} className="flex items-center space-x-2 my-2">
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
    </div>
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
