import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { ArrowLeft, Building2, Globe, Image as ImageIcon, Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CompanySetup = () => {
  const params = useParams();

  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Company update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="animate-rise-in rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-800">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              size="sm"
              className="gap-2 rounded-xl border-slate-200 font-semibold dark:border-slate-700"
            >
              <ArrowLeft className="h-4 w-4" /> Back to List
            </Button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Setup Company Profile</h1>
          </div>

          <form onSubmit={submitHandler} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Company Name
                </Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Location / HQ
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="Bangalore, Remote..."
                    className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Official Website URL
              </Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://company.com"
                  className="rounded-xl border-slate-200 pl-10 dark:border-slate-700 dark:bg-slate-800/50"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Company Overview
              </Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Innovating tech solutions for Global Enterprise..."
                className="mt-1 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800/50"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Company Brand Logo
              </Label>
              <div className="relative mt-1 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800/50">
                <ImageIcon className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="w-full text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-teal-950 dark:file:text-teal-300"
                />
              </div>
            </div>

            <div className="pt-4">
              {loading ? (
                <Button disabled className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Changes...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-emerald-700"
                >
                  Save Profile Details
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CompanySetup;
