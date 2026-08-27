import { Building2, Edit2, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <Table>
      <TableCaption className="py-4 text-xs text-slate-400">A list of your registered company profiles</TableCaption>
      <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
        <TableRow>
          <TableHead className="font-bold text-slate-700 dark:text-slate-300">Logo</TableHead>
          <TableHead className="font-bold text-slate-700 dark:text-slate-300">Company Name</TableHead>
          <TableHead className="font-bold text-slate-700 dark:text-slate-300">Registration Date</TableHead>
          <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterCompany?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="py-12 text-center text-sm text-slate-500">
              No registered companies found.
            </TableCell>
          </TableRow>
        ) : (
          filterCompany?.map((company) => (
            <TableRow key={company._id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <TableCell>
                <Avatar className="h-10 w-10 border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="bg-teal-700 text-xs font-bold text-white">
                    {company.name ? company.name.substring(0, 2).toUpperCase() : <Building2 className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-bold text-slate-900 dark:text-white">{company.name}</TableCell>
              <TableCell className="text-sm text-slate-500 dark:text-slate-400">
                {company?.createdAt?.split("T")[0] || "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <MoreHorizontal className="h-4 w-4 text-slate-500" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 rounded-xl border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <button
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                      Edit Profile
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CompaniesTable;
