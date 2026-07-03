import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
 
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

//   useEffect(() => {
//     const filteredCompany =
//       companies.length >= 0 &&
//       companies.filter((company) => {
//         if (!searchCompanyByText) {
//           return true;
//         }
//         return company?.name
//           ?.toLowerCase()
//           .includes(searchCompanyByText.toLowerCase());
//       });
//     setFilterCompany(filteredCompany);
//      companies.forEach(company => {
//   console.log(company._id, company.name);
// });
//   }, [companies, searchCompanyByText]);


useEffect(() => {
  console.log("Companies from Redux:", companies);

  companies.forEach(company => {
    console.log("ID:", company._id);
    console.log("Name:", company.name);
  });

  const filteredCompany = companies.filter((company) => {
    if (!searchCompanyByText) return true;

    return company.name
      .toLowerCase()
      .includes(searchCompanyByText.toLowerCase());
  });

  setFilterCompany(filteredCompany);
}, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company,index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => {
    console.log("Clicked:", company._id);
    navigate(`/admin/companies/${company._id}`);
}}
                      className="flex items-center justify-between"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
