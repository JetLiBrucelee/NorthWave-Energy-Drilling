import { Layout } from "@/components/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Anchor, Shield, HardHat, Droplets } from "lucide-react";
import { Link } from "wouter";

// Import images
import heroImage from "@assets/Screenshot_2026-06-29_at_11.10.47_AM_1782745943542.png";
import platformCrane from "@assets/Screenshot_2026-06-29_at_11.10.59_AM_1782745943543.png";
import workersDock from "@assets/Screenshot_2026-06-29_at_11.10.29_AM_1782745943532.png";
import saturationDiver from "@assets/Screenshot_2026-06-29_at_11.11.12_AM_1782745943544.png";

export default function Home() {
  return (
    <Layout>
      <SEO 
        title="NorthWave Energy Drilling | Offshore Drilling Experts"
        description="Heavyweight offshore energy company delivering precision, safety, and operational excellence in extreme conditions."
        url="/"
        jsonLd={organizationJsonLd}
      />
      
      {/* Cinematic Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center bg-slate-900 overflow-hidden">
        {/* Background Video / Image Fallback */}
        <div className="absolute inset-0 z-0">
          {/* Autoplay video hero — falls back to poster image if blocked */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage}
            className="w-full h-full object-cover"
            aria-hidden="true"
            crossOrigin="anonymous"
          >
            {/* Pexels CC0 offshore drilling footage */}
            <source src="https://videos.pexels.com/video-files/3249060/3249060-sd_640_360_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/50 bg-primary/20 backdrop-blur-sm mb-6 rounded-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-white drop-shadow">Global Offshore Operations</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white leading-[1.1] mb-6 uppercase tracking-tight drop-shadow-lg">
              Conquering the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">Deep Ocean</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed border-l-4 border-primary pl-6 drop-shadow">
              NorthWave Energy Drilling provides heavy-duty offshore solutions. 
              Built for extreme conditions. Engineered for maximum yield. We execute $50M+ contracts with zero compromises.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-1 hover:translate-y-1 inline-flex items-center justify-center gap-3"
              >
                Request Consultation <ArrowRight size={18} />
              </Link>
              <Link 
                href="/projects" 
                className="bg-transparent border-2 border-white/20 hover:border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-all inline-flex items-center justify-center hover:bg-white/5"
              >
                View Operations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-primary text-primary-foreground relative z-20 -mt-10 mx-4 md:mx-auto md:max-w-6xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
          {[
            { value: "25+", label: "Years Experience" },
            { value: "140", label: "Deepwater Projects" },
            { value: "850+", label: "Expert Crew" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="px-8 py-6 text-center"
            >
              <div className="text-4xl md:text-5xl font-heading font-black mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-widest text-primary-foreground/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Intro / Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Our Capabilities</h2>
                <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight text-foreground">Heavy Machinery.<br/>Precise Execution.</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We operate top-tier jack-up rigs and drillships equipped for the most demanding environments. Our specialized crews undergo rigorous training to ensure safety and efficiency remain unmatched.
              </p>
              
              <ul className="space-y-4">
                {[
                  { icon: Shield, title: "Zero Incident Safety Culture" },
                  { icon: HardHat, title: "Specialized Engineering Teams" },
                  { icon: Droplets, title: "Advanced Fluid Management" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-sm text-primary">
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold">{item.title}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:underline underline-offset-4">
                Explore All Services <ChevronRight size={18} />
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-muted border border-border transform rotate-3 rounded-sm -z-10"></div>
              <img 
                src={platformCrane} 
                alt="Platform with crane and supply vessel" 
                className="w-full h-auto object-cover rounded-sm shadow-2xl relative z-10 filter contrast-125 saturate-110"
              />
              <div className="absolute -bottom-6 -left-6 bg-background border border-border p-6 shadow-xl z-20 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Anchor className="text-primary" />
                  <span className="font-heading font-bold uppercase">Operational Readiness</span>
                </div>
                <p className="text-sm text-muted-foreground">Maintained 99.8% uptime across all active rigs in Q3.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery Preview */}
      <section className="py-24 bg-slate-950 text-slate-200 border-t border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Field Operations</h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight text-white">Active Projects</h3>
            </div>
            <Link href="/projects" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2">
              View Complete Gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: workersDock, title: "Logistics Coordination", desc: "Vessel docking and crew transfer" },
              { img: saturationDiver, title: "Subsea Inspection", desc: "Deep water saturation diving" },
              { img: platformCrane, title: "Rig Maintenance", desc: "Heavy equipment maneuvering" },
            ].map((proj, i) => (
               <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative overflow-hidden rounded-sm cursor-pointer border border-slate-800"
              >
                <div className="aspect-[4/3] bg-slate-800">
                  <img 
                    src={proj.img} 
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="w-10 h-1 bg-primary mb-3"></div>
                  <h4 className="text-xl font-heading font-bold text-white uppercase mb-1">{proj.title}</h4>
                  <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{proj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-muted/50 -skew-x-12 transform origin-top translate-x-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight text-foreground mb-6">
              Ready to deploy.
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl">
              Partner with NorthWave for your next major offshore endeavor. We bring the equipment, the crew, and the commitment to get it done right.
            </p>
            <Link 
              href="/contact" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 text-lg font-bold uppercase tracking-widest rounded-sm transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 inline-flex items-center gap-3"
            >
              Contact Operations <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
