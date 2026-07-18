import { Layout } from "@/components/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
import { motion } from "framer-motion";
import { useGetSiteSettings, useListWorkers } from "@workspace/api-client-react";
import { Phone, CheckCircle } from "lucide-react";
import { formatPhone } from "@/lib/formatPhone";

import twoWorkers from "@assets/Screenshot_2026-06-29_at_11.11.33_AM_1782745943544.png";
import vesselSea from "@assets/Screenshot_2026-06-29_at_11.11.48_AM_1782745943545.png";

export default function About() {
  const { data: settings } = useGetSiteSettings();
  const { data: workers } = useListWorkers();

  const ceoPhotoUrl = settings?.ceoPhotoUrl
    ? (settings.ceoPhotoUrl.startsWith("http") ? settings.ceoPhotoUrl : `/api/storage${settings.ceoPhotoUrl}`)
    : null;

  const values = [
    "Zero Incident Tolerance",
    "Environmental Stewardship",
    "Technical Superiority",
    "Unwavering Reliability",
  ];

  return (
    <Layout>
      <SEO
        title="About Us | NorthWave Energy Drilling"
        description="Learn about our history, our leadership, and the expert crew that makes NorthWave a leader in offshore drilling."
        url="/about"
        jsonLd={organizationJsonLd}
      />

      {/* Header */}
      <section className="relative bg-[hsl(221,40%,8%)] pt-32 pb-20 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute right-0 top-0 w-2/5 h-full opacity-20">
          <img src={vesselSea} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(221,40%,8%)] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-4">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-5">
              Forged in Steel.<br />Proven at Sea.
            </h1>
            <p className="text-white/60 text-lg leading-relaxed border-l-2 border-primary pl-5">
              Since our inception, NorthWave Energy Drilling has pushed the boundaries of what is possible in offshore extraction, setting new standards for safety, efficiency, and engineering excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Values */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={twoWorkers}
                alt="Two workers on offshore equipment"
                className="w-full h-auto object-cover brightness-90 rounded-lg"
              />
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10"></div>
            </div>
            <div className="space-y-7">
              <div>
                <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">Our Mission</p>
                <h2 className="text-3xl font-bold text-white leading-snug">
                  Relentless Pursuit of Operational Perfection.
                </h2>
              </div>
              <div className="space-y-4 text-white/55 leading-relaxed text-sm">
                <p>
                  Northwave Energy Drilling is an offshore energy services and drilling support company specializing in the construction, installation, and maintenance of critical oil and gas infrastructure in challenging environments. Our operations are focused on delivering safe, efficient, and reliable solutions for offshore and onshore energy projects.
                </p>
                <p>
                  With a strong emphasis on safety, precision, and operational excellence, Northwave Energy Drilling supports a wide range of engineering and field services including rig installation support, subsea system integration, control and power system commissioning, and offshore equipment deployment.
                </p>
                <p>
                  Our team consists of experienced field engineers and offshore specialists who understand the demands of high-pressure environments and complex marine operations. We take pride in executing projects with strict adherence to industry safety standards and environmental responsibility.
                </p>
                <p className="font-semibold text-white/75 pt-1">Our Core Services</p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Offshore drilling support operations</li>
                  <li>Rig installation and commissioning assistance</li>
                  <li>Control and electrical systems integration</li>
                  <li>Maintenance and equipment optimization</li>
                  <li>Marine and offshore logistics support</li>
                </ul>
                <p className="font-semibold text-white/75 pt-1">Project Experience</p>
                <p>
                  Northwave Energy Drilling has contributed to multiple offshore development projects, supporting installation phases, system upgrades, and operational readiness activities across various marine energy sites. Our focus is always on ensuring systems are delivered safely, on time, and fully operational for production readiness.
                </p>
                <p className="font-semibold text-white/75 pt-1">Our Commitment</p>
                <p>
                  We are committed to integrity, safety, and performance. Every project is approached with discipline, technical expertise, and a dedication to long-term reliability in the energy sector.
                </p>
                <p className="font-semibold text-white/75 pt-1">Global Presence</p>
                <p>NorthWave operates across multiple offshore regions, supporting energy infrastructure in:</p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Arctic offshore zones</li>
                  <li>Gulf basin developments</li>
                  <li>Atlantic deepwater corridors</li>
                </ul>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.07]">
                {values.map((value, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={17} className="text-primary shrink-0" />
                    <span className="text-white/80 text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-[hsl(221,40%,8%)] border-y border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-card border border-white/[0.07] rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/40 bg-[hsl(220,38%,14%)] flex items-center justify-center">
              {ceoPhotoUrl ? (
                <img
                  src={ceoPhotoUrl}
                  alt={settings?.ceoName?.trim() || "CEO"}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <span className="text-4xl font-bold text-white/30">
                  {(settings?.ceoName?.trim() || "C").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-2">Leadership</p>
              <h3 className="text-2xl font-bold text-white mb-1">
                {settings?.ceoName?.trim() || "Chief Executive Officer"}
              </h3>
              <p className="text-white/35 text-sm font-medium mb-2">CEO & Founder, NorthWave Energy</p>
              {settings?.phone2 && (
                <p className="flex items-center gap-2 text-white/55 text-sm mb-4">
                  <Phone size={13} className="shrink-0 text-primary" />
                  <a href={`tel:${settings.phone2}`} className="hover:text-white transition-colors font-mono tracking-wide">
                    {formatPhone(settings.phone2)}
                  </a>
                </p>
              )}
              <p className="text-white/60 text-sm leading-relaxed italic">
                "Our reputation is built on the cold, hard steel of our rigs and the unbreakable resolve of our crews. We don't make excuses; we make well completions happen."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Crew Roster */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">The Crew</p>
            <h2 className="text-3xl font-bold text-white mb-3">Expert Roster</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              The men and women who command the deep. Every worker is rigorously certified for extreme condition operations.
            </p>
          </div>

          {!workers ? (
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-24 bg-card animate-pulse rounded-lg border border-white/[0.07]"></div>
              ))}
            </div>
          ) : workers.length === 0 ? (
            <div className="text-center p-12 bg-card rounded-lg border border-white/[0.07] border-dashed">
              <p className="text-white/40 font-semibold uppercase tracking-widest text-sm">No crew members listed.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.sort((a, b) => a.sortOrder - b.sortOrder).map((worker) => (
                <div
                  key={worker.id}
                  className="bg-card border border-white/[0.07] rounded-lg p-5 hover:border-primary/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white text-base">{worker.name}</h4>
                      <p className="text-primary text-xs font-semibold mt-0.5">{worker.role || "Crew Member"}</p>
                    </div>
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors text-sm font-bold">
                      {worker.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/45 text-sm">
                    <Phone size={13} className="shrink-0" />
                    <a
                      href={`tel:${worker.phone}`}
                      className="hover:text-white transition-colors font-mono text-xs tracking-wide"
                    >
                      {formatPhone(worker.phone)}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
