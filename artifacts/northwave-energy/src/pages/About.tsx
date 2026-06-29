import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useGetSiteSettings, useListWorkers } from "@workspace/api-client-react";
import { Phone, CheckCircle } from "lucide-react";

// Images
import twoWorkers from "@assets/Screenshot_2026-06-29_at_11.11.33_AM_1782745943544.png";
import vesselSea from "@assets/Screenshot_2026-06-29_at_11.11.48_AM_1782745943545.png";

export default function About() {
  const { data: settings } = useGetSiteSettings();
  const { data: workers } = useListWorkers();

  // Helper to construct CEO photo URL
  const ceoPhotoUrl = settings?.ceoPhotoUrl 
    ? `/api/storage${settings.ceoPhotoUrl}` 
    : "https://ui-avatars.com/api/?name=" + encodeURIComponent(settings?.ceoName || "CEO") + "&background=1e293b&color=fff&size=256";

  return (
    <Layout>
      <SEO 
        title="About Us | NorthWave Energy Drilling"
        description="Learn about our history, our leadership, and the expert crew that makes NorthWave a leader in offshore drilling."
      />
      
      {/* Header */}
      <section className="bg-slate-950 py-24 border-b-4 border-primary relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-30 mix-blend-luminosity">
          <img src={vesselSea} alt="Offshore supply vessel" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-6">
              Forged in <span className="text-primary">Steel</span>.<br/>Proven at Sea.
            </h1>
            <p className="text-xl text-slate-300 border-l-4 border-primary pl-6">
              Since our inception, NorthWave Energy Drilling has pushed the boundaries of what is possible in offshore extraction, setting new standards for safety, efficiency, and engineering excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-sm -z-10"></div>
              <img 
                src={twoWorkers} 
                alt="Two workers on offshore equipment" 
                className="w-full h-auto object-cover rounded-sm shadow-xl filter contrast-125 saturate-50"
              />
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Our Mission</h2>
                <h3 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground">Relentless Pursuit of Operational Perfection.</h3>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  NorthWave was founded on a simple premise: offshore drilling is unforgiving, and the companies operating in it must be uncompromising. We don't just supply equipment; we supply certainty.
                </p>
                <p>
                  When you contract NorthWave, you're getting a hardened team of veterans who treat every rig, every pipeline, and every dive as a mission-critical operation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
                {[
                  "Zero Incident Tolerance",
                  "Environmental Stewardship",
                  "Technical Superiority",
                  "Unwavering Reliability"
                ].map((value, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-primary shrink-0 mt-0.5" size={20} />
                    <span className="font-bold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-background p-8 md:p-12 shadow-xl border-l-8 border-primary rounded-sm">
            <img 
              src={ceoPhotoUrl} 
              alt={settings?.ceoName || "CEO"} 
              className="w-48 h-48 rounded-full object-cover shadow-inner grayscale hover:grayscale-0 transition-all duration-500 border-4 border-muted"
            />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Leadership</h2>
              <h3 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground mb-4">
                {settings?.ceoName || "Chief Executive Officer"}
              </h3>
              <p className="text-muted-foreground italic mb-6">
                "Our reputation is built on the cold, hard steel of our rigs and the unbreakable resolve of our crews. We don't make excuses; we make well completions happen."
              </p>
              <div className="font-bold text-sm tracking-widest uppercase">CEO & Founder, NorthWave Energy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Roster */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">The Crew</h2>
            <h3 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-4">Expert Roster</h3>
            <p className="text-muted-foreground">The men and women who command the deep. Every worker is rigorously certified for extreme condition operations.</p>
          </div>

          {!workers ? (
             <div className="grid md:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-24 bg-muted animate-pulse rounded-sm"></div>
                ))}
             </div>
          ) : workers.length === 0 ? (
            <div className="text-center p-12 bg-muted rounded-sm border border-border border-dashed">
              <p className="text-muted-foreground font-bold uppercase tracking-widest">No crew members listed.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.sort((a,b) => a.sortOrder - b.sortOrder).map((worker) => (
                <div key={worker.id} className="bg-card border border-card-border p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-heading font-bold text-lg uppercase tracking-wide">{worker.name}</h4>
                      <p className="text-sm text-primary font-bold">{worker.role || "Crew Member"}</p>
                    </div>
                    <div className="w-10 h-10 bg-muted flex items-center justify-center rounded-full text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span className="font-bold text-sm">{worker.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone size={14} />
                    <a href={`tel:${worker.phone}`} className="hover:text-foreground transition-colors">{worker.phone}</a>
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
