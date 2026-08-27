import { ArrowRight, BriefcaseBusiness, Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-md">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <span className="text-2xl font-bold tracking-tight">
                Job<span className="gradient-text">Connect</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Connecting talented developers, designers, and tech leaders with high-growth teams and groundbreaking opportunities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-teal-500 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-teal-500 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-teal-500 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/jobs" className="transition-colors hover:text-teal-400">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className="transition-colors hover:text-teal-400">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-teal-400">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="transition-colors hover:text-teal-400">
                  Create Candidate Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                <a href="mailto:support@jobconnect.com" className="transition-colors hover:text-teal-400">
                  support@jobconnect.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-teal-400 shrink-0" />
                <a href="tel:+1234567890" className="transition-colors hover:text-teal-400">
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                <span>123 JobConnect Way, Tech City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Weekly Job Alerts
            </h3>
            <p className="mb-3 text-xs leading-relaxed text-slate-400">
              Subscribe to get curated job listings sent directly to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-3 py-2 text-white transition-colors hover:bg-teal-500"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} JobConnect Inc. All rights reserved. Built for seamless career growth.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
