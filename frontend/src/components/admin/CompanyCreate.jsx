import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Building2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="animate-rise-in rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
              <Building2 className="h-7 w-7" />
            </div>
            <span className="mt-4 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Step 1 of 2
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Register Your Company Profile
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Give your organization a recognized presence. You can edit branding details anytime later.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Company Name
              </Label>
              <Input
                type="text"
                className="mt-1 rounded-xl border-slate-200 py-3 dark:border-slate-700 dark:bg-slate-800/50"
                placeholder="Google, Microsoft, Stripe, Acme Inc..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                className="flex-1 rounded-xl border-slate-200 font-semibold dark:border-slate-700"
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                onClick={registerNewCompany}
                className="flex-1 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-emerald-700"
              >
                {loading ? "Registering..." : "Continue & Setup"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyCreate;