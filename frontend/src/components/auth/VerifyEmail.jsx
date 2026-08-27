import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("waiting");
      return;
    }

    axios.get(`${USER_API_END_POINT}/verify-email`, { params: { token } })
      .then((response) => {
        setStatus("success");
        setMessage(response.data.message);
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.response?.data?.message || "This verification link is invalid or expired");
      });
  }, [searchParams]);

  const handleResend = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setResending(true);
    try {
      const response = await axios.post(`${USER_API_END_POINT}/resend-verification`, { email });
      setMessage(response.data.message);
      setStatus("waiting");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to resend verification email");
      setStatus("error");
    } finally {
      setResending(false);
    }
  };

  const content = {
    loading: { icon: <Loader2 className="h-12 w-12 animate-spin text-teal-600 dark:text-teal-400" />, title: "Verifying Email", text: "Just a moment while we confirm your account token." },
    waiting: { icon: <Mail className="h-12 w-12 text-teal-600 dark:text-teal-400" />, title: "Check Your Inbox", text: "We sent a verification link to your email. Click the link to activate your account." },
    success: { icon: <CheckCircle2 className="h-12 w-12 text-emerald-500" />, title: "Email Verified!", text: message || "Your account is activated and ready for use." },
    error: { icon: <XCircle className="h-12 w-12 text-rose-500" />, title: "Verification Failed", text: message },
  }[status];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <section className="animate-rise-in w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none sm:p-10">
          <div className="mb-6 flex justify-center">{content.icon}</div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{content.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{content.text}</p>
          {(status === "waiting" || status === "error") && (
            <form onSubmit={handleResend} className="mt-6 text-left space-y-4">
              <div>
                <Label htmlFor="verification-email" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Email address
                </Label>
                <Input
                  id="verification-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800/50"
                  required
                />
              </div>
              <Button type="submit" disabled={resending} className="w-full rounded-xl bg-teal-700 font-semibold text-white hover:bg-teal-800">
                {resending ? "Sending Email..." : "Resend Verification Link"}
              </Button>
            </form>
          )}
          {(status === "success" || status === "error") && (
            <Link to="/login" className="mt-8 block">
              <Button className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white shadow-md">
                Continue to Sign In
              </Button>
            </Link>
          )}
        </section>
      </main>
    </div>
  );
};

export default VerifyEmail;
