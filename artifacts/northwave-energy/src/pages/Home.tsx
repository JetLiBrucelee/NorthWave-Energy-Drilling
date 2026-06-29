import { Layout } from "@/components/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight, Anchor, Globe, ShieldCheck, Zap, MapPin, CheckCircle } from "lucide-react";
import { Link } from "wouter";

import heroImage from "@assets/Screenshot_2026-06-29_at_11.10.47_AM_1782745943542.png";
import capImg1 from "@assets/Screenshot_2026-06-29_at_11.10.59_AM_1782745943543.png";
import capImg2 from "@assets/Screenshot_2026-06-29_at_11.11.12_AM_1782745943544.png";
import capImg3 from "@assets/Screenshot_2026-06-29_at_11.11.59_AM_1782745943545.png";
import ctaBg from "@assets/Screenshot_2026-06-29_at_11.11.48_AM_1782745943545.png";

export default function Home() {
  const stats = [
    { icon: Anchor, value: "15+", label: "Active Vessels" },
    { icon: Globe, value: "3", label: "Countries" },
    { icon: ShieldCheck, value: "99.2%", label: "Safety Record" },
    { icon: Zap, value: "25+", label: "Years Experience" },
  ];

  const capabilities = [
    {
      img: capImg1,
      title: "Offshore Drilling & Completion",
      desc: "Full-spectrum drilling operations from surface installation to deepwater well completion, using state-of-the-art jack-up rigs and drillships calibrated for extreme environments.",
    },
    {
      img: capImg2,
      title: "Subsea & Inspection Services",
      desc: "ROV-led and saturation dive inspections for pipelines, risers, and platform jackets. Real-time NDT reporting with 300m+ operational depth capability.",
    },
    {
      img: capImg3,
      title: "Pipeline & SURF Installation",
      desc: "Subsea umbilical, riser, and flowline deployment using DP3-equipped lay vessels. J-lay and S-lay systems for shallow to ultra-deepwater environments.",
    },
  ];

  const regions = [
    {
      name: "North Sea",
      desc: "Harsh-environment expertise supporting legacy oil & gas assets and emerging floating wind developments in UK and Norwegian waters.",
      projects: "8 Active Projects",
    },
    {
      name: "Gulf of Mexico",
      desc: "Major deepwater production hub with multiple platform operations and a strong pipeline of field development projects.",
      projects: "12 Active Projects",
    },
    {
      name: "Gulf of Alaska",
      desc: "Arctic and sub-Arctic offshore operations supporting Cook Inlet and Beaufort Sea developments with ice-class vessel capabilities.",
      projects: "5 Active Projects",
    },
  ];

  const certifications = [
    { code: "ISO 9001:2015", label: "Quality Management" },
    { code: "ISO 14001:2015", label: "Environmental Mgmt" },
    { code: "ISO 45001:2018", label: "Health & Safety" },
    { code: "API Spec Q1", label: "Quality Program" },
    { code: "IOGP Member", label: "Intl Oil & Gas Producers" },
    { code: "DNV GL Certified", label: "Marine & Offshore" },
  ];

  return (
    <Layout>
      <SEO
        title="NorthWave Energy Drilling | Offshore Drilling Experts"
        description="NorthWave Energy Drilling — delivering precision offshore drilling, well completion, and subsea operations across the world's most challenging environments."
        url="/"
        jsonLd={organizationJsonLd}
      />

      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline
            poster={heroImage}
            className="w-full h-full object-cover"
            aria-hidden="true"
            crossOrigin="anonymous"
          >
            <source src="https://videos.pexels.com/video-files/3249060/3249060-sd_640_360_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[hsl(222,47%,6%)]/75"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,5%)]/90 via-[hsl(222,47%,5%)]/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-primary text-sm font-semibold tracking-[0.18em] uppercase mb-4">
              NorthWave Operations
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
              Precision Drilling at the Frontier of the Possible
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              From the Arctic shelf to ultra-deep basins, NorthWave crews operate at the limits of depth, weather, and pressure — and deliver every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3.5 text-sm font-semibold rounded-md transition-all"
              >
                Our Services <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white px-7 py-3.5 text-sm font-semibold rounded-md transition-all hover:bg-white/5"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[hsl(221,40%,10%)] border-y border-white/[0.07]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 px-6 md:px-8 py-6"
              >
                <stat.icon size={22} className="text-primary shrink-0" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mt-0.5">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrated Capabilities ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Integrated Offshore Capabilities
            </h2>
            <p className="text-white/55 text-base max-w-2xl leading-relaxed">
              From engineered subsea products to full-scale drilling operations, we provide end-to-end solutions for the global offshore energy industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-white/[0.07] rounded-lg overflow-hidden group hover:border-primary/40 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={cap.img}
                    alt={cap.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{cap.desc}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Operations ── */}
      <section className="py-20 md:py-28 bg-[hsl(221,40%,8%)]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">Worldwide Presence</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Global Operations</h2>
            <p className="text-white/55 max-w-xl mx-auto text-sm leading-relaxed">
              Operating across three major regions with 15 active vessels and a presence in 3 countries, NorthWave delivers deepwater solutions wherever our clients need them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {regions.map((region, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-white/[0.07] rounded-lg p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <h3 className="text-base font-bold text-white">{region.name}</h3>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-4">{region.desc}</p>
                <span className="text-primary text-xs font-bold tracking-widest uppercase">{region.projects}</span>
              </motion.div>
            ))}
          </div>

          {/* Global stats */}
          <div className="bg-card border border-white/[0.07] rounded-lg grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
            {[
              { value: "25+", label: "Active Projects" },
              { value: "3", label: "Major Regions" },
              { value: "3", label: "Countries" },
              { value: "24/7", label: "Operations Center" },
            ].map((s, i) => (
              <div key={i} className="text-center py-8 px-4">
                <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-[11px] uppercase tracking-widest font-semibold text-white/45">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">Trust & Quality</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Partners & Certifications</h2>
            <p className="text-white/55 max-w-lg mx-auto text-sm leading-relaxed">
              We maintain the highest standards of quality, safety, and environmental management, validated by leading international certification bodies.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-white/[0.07] rounded-lg p-4 text-center hover:border-primary/30 transition-all"
              >
                <CheckCircle size={18} className="text-primary mx-auto mb-2" />
                <div className="text-white text-sm font-bold leading-tight">{cert.code}</div>
                <div className="text-white/45 text-[10px] mt-1 leading-tight">{cert.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-6">Trusted By Industry Leaders</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Schlumberger", "TechnipFMC", "Saipem", "Bureau Veritas", "Lloyd's Register", "DNV GL", "Equinor"].map((p) => (
                <span key={p} className="bg-card border border-white/[0.07] rounded-md px-4 py-2 text-white/60 text-sm font-medium hover:text-white/90 hover:border-white/20 transition-colors">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="Offshore vessel" className="w-full h-full object-cover brightness-[0.25]" />
          <div className="absolute inset-0 bg-[hsl(222,47%,5%)]/60"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Partner with NorthWave for your next major offshore endeavor. We bring the equipment, crew, and commitment to execute with zero compromises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 text-sm font-semibold rounded-md transition-all"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-white/25 hover:border-white/50 text-white px-8 py-3.5 text-sm font-semibold rounded-md transition-all hover:bg-white/5"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
