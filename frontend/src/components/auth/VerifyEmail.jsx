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
    loading: { icon: <Loader2 className="h-10 w-10 animate-spin text-teal-700" />, title: "Verifying your email", text: "Just a moment while we confirm your account." },
    waiting: { icon: <Mail className="h-10 w-10 text-teal-700" />, title: "Check your inbox", text: "Open the verification link sent to your email to activate your account." },
    success: { icon: <CheckCircle2 className="h-10 w-10 text-emerald-600" />, title: "Email verified", text: message || "Your account is ready." },
    error: { icon: <XCircle className="h-10 w-10 text-rose-600" />, title: "Verification failed", text: message },
  }[status];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <section className="animate-rise-in w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
          <div className="mb-5 flex justify-center">{content.icon}</div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">{content.title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">{content.text}</p>
          {(status === "waiting" || status === "error") && (
            <form onSubmit={handleResend} className="mt-6 text-left">
              <Label htmlFor="verification-email">Email address</Label>
              <Input id="verification-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2" required />
              <Button type="submit" disabled={resending} className="mt-4 w-full bg-teal-700 hover:bg-teal-800">{resending ? "Sending..." : "Resend verification email"}</Button>
            </form>
          )}
          {(status === "success" || status === "error") && <Link to="/login"><Button className="mt-7 bg-teal-700 hover:bg-teal-800">Continue to login</Button></Link>}
        </section>
      </main>
    </div>
  );
};

export default VerifyEmail;
