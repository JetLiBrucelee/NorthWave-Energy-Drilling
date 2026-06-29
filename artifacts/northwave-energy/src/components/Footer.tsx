import { Link } from "wouter";
import { Anchor, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { useGetSiteSettings } from "@workspace/api-client-react";

export function Footer() {
  const { data: settings } = useGetSiteSettings();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group inline-flex">
              <div className="bg-primary text-primary-foreground p-2 rounded-sm">
                <Anchor size={20} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none text-white tracking-wider">
                  NORTHWAVE
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-primary font-semibold">
                  Energy Drilling
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Delivering heavy-duty offshore drilling solutions with uncompromising precision, safety, and operational excellence in the most demanding environments on Earth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Our Company" },
                { href: "/services", label: "Offshore Services" },
                { href: "/projects", label: "Project Gallery" },
                { href: "/contact", label: "Contact Us" },
                { href: "/admin", label: "Employee Portal" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-bold uppercase tracking-wider mb-4">Core Services</h4>
            <ul className="space-y-2">
              {[
                "Directional Drilling",
                "Well Completion",
                "Platform Maintenance",
                "Underwater Inspection",
                "Pipeline Laying",
              ].map((service) => (
                <li key={service} className="text-sm text-slate-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-bold uppercase tracking-wider mb-4">Headquarters</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">{settings?.address || "1400 Offshore Blvd, Suite 800\nHouston, TX 77002"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400">{settings?.phone1 || "+1 (555) 019-8472"}</span>
                  {settings?.phone2 && <span className="text-sm text-slate-400">{settings.phone2}</span>}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm text-slate-400">{settings?.contactEmail || "operations@northwave-energy.com"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} NorthWave Energy Drilling. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Safety Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
