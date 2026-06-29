import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import { useGetSiteSettings } from "@workspace/api-client-react";
import { LogoFull } from "@/components/Logo";
import { formatPhone } from "@/lib/formatPhone";

export function Footer() {
  const { data: settings } = useGetSiteSettings();

  const companyLinks = [
    { href: "/about", label: "Who We Are" },
    { href: "/about", label: "Our Heritage" },
    { href: "/about", label: "Leadership" },
    { href: "/contact", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  const serviceLinks = [
    { href: "/services#directional-drilling", label: "Directional Drilling" },
    { href: "/services#well-completion", label: "Well Completion" },
    { href: "/services#platform-maintenance", label: "Platform Maintenance" },
    { href: "/services#underwater-inspection", label: "Subsea Inspection" },
    { href: "/services#pipeline-laying", label: "Pipeline Laying" },
    { href: "/services#equipment-rental", label: "Equipment Rental" },
  ];

  const safetyLinks = [
    { href: "/services#platform-maintenance", label: "Safety Standards" },
    { href: "/contact", label: "Environmental Policy" },
    { href: "/services#underwater-inspection", label: "Health & Safety" },
    { href: "/services#equipment-rental", label: "ISO Certifications" },
    { href: "/contact", label: "Compliance" },
  ];

  return (
    <footer className="bg-[hsl(222,47%,5%)] border-t border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">

          {/* Brand col — spans 2 on lg */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <LogoFull variant="light" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              The world's deepwater ocean-infrastructure leader. Delivering sustainable offshore solutions that power the global energy transition.
            </p>
            <p className="text-white/35 text-xs leading-relaxed max-w-xs">
              NorthWave Energy Drilling is committed to pioneering innovative marine technologies while maintaining the highest standards of safety, environmental stewardship, and corporate responsibility.
            </p>

            {/* Contact details */}
            <ul className="space-y-2.5 pt-2">
              <li className="flex items-center gap-3 text-sm text-white/55">
                <Phone size={14} className="text-primary shrink-0" />
                <span>{settings?.phone1 ? formatPhone(settings.phone1) : "(904) 222-4690"}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/55">
                <Mail size={14} className="text-primary shrink-0" />
                <span>{settings?.contactEmail || "operations@northwave-energy.com"}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/55">
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                <span>{settings?.address || "1400 Offshore Blvd, Suite 800\nHouston, TX 77002"}</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — use native <a> so hash anchors scroll correctly */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety & Quality — also use native <a> for hash links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Safety & Quality</h4>
            <ul className="space-y-3">
              {safetyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regional offices */}
        <div className="border-t border-white/[0.06] py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-2">Regional Offices</p>
              <div className="flex flex-wrap gap-6 text-white/50 text-sm">
                <span>Houston, TX, USA</span>
                <span>Aberdeen, Scotland</span>
                <span>Anchorage, AK, USA</span>
              </div>
            </div>
            <div>
              <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-2">Certifications</p>
              <div className="flex flex-wrap gap-4 text-white/50 text-xs">
                <span>ISO 9001:2015</span>
                <span>ISO 14001:2015</span>
                <span>ISO 45001:2018</span>
                <span>API Spec Q1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} NorthWave Energy Drilling. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="/contact" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
