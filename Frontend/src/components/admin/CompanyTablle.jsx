import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Building2, CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user_api_end_point } from "../utils/constant";

const CompanyTablle = ({ companies }) => {
  const navigate = useNavigate();
  const { searchText } = useSelector((store) => store.companies);

  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchText) {
        return true;
      }

      return company?.name?.toLowerCase().includes(searchText.toLowerCase());
    });

    setFilter(filteredCompany);
  }, [companies, searchText]);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this job and all applications?")) return;

      const res = await axios.delete(
        `${user_api_end_point}/company/delete/${id}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success("Company deleted successfully");
        navigate("/admin/company");

        setFilter((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete company");
    }
  };
  return (
    <div className="w-full rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Registered Companies
          </h2>
          <p className="text-sm text-gray-500">
            Manage all recently added companies
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="py-4 text-gray-500">
            Recent registered companies list
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="min-w-55">Company</TableHead>
              <TableHead className="hidden md:table-cell">Industry</TableHead>
              <TableHead className="hidden sm:table-cell">
                Created Date
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filter.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback>
                        <Building2 className="h-5 w-5 text-gray-500" />
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {company.name}
                      </h3>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                    IT Company
                  </span>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(company.createdAt).toLocaleDateString("en-GB")}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-44 p-2">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() =>
                            navigate(`/admin/company/${company._id}`)
                          }
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            handleDelete(company._id);
                          }}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompanyTablle;
