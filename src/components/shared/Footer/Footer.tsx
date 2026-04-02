"use client";

import Link from "next/link";
import { Leaf, Github, Twitter, Linkedin, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-slate-100 pt-20 pb-10 overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-50/50 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-emerald-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <Leaf className="text-white" size={20} />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter lowercase">
                ecospark<span className="text-emerald-600">.hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed lowercase max-w-[240px]">
              the global network for eco-innovators. share, collaborate, and scale sustainable sparks into world impact.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="rounded-full w-9 h-9 border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 transition-all">
                  <Icon size={16} />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] lowercase">platform</h4>
            <ul className="space-y-4">
              {['explore ideas', 'submit innovation', 'eco-innovators', 'success stories'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors lowercase font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] lowercase">community</h4>
            <ul className="space-y-4">
              {['about mission', 'impact report', 'privacy policy', 'terms of spark'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors lowercase font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] lowercase">newsletter</h4>
            <p className="text-sm text-slate-500 lowercase font-medium">get the latest sparks in your inbox.</p>
            <div className="flex flex-col gap-2">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
                <Input 
                  placeholder="email address" 
                  className="pl-10 h-12 rounded-2xl border-slate-100 focus-visible:ring-emerald-500/10 focus-visible:border-emerald-200 lowercase"
                />
              </div>
              <Button className="h-12 rounded-2xl bg-slate-900 hover:bg-emerald-700 text-white font-bold transition-all lowercase">
                subscribe
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-slate-400 lowercase tracking-wider">
            © 2026 ecospark hub. all rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-500 lowercase">system live: global node</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 cursor-pointer transition-colors">
              <Globe size={14} />
              <span className="text-[11px] font-bold lowercase">english (us)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;