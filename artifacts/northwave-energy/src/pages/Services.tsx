import { Layout } from "@/components/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
import { motion } from "framer-motion";
import { Anchor, Settings, Waves, Search, Ruler, Wrench } from "lucide-react";
import pipelineImg from "@assets/Screenshot_2026-06-29_at_11.11.59_AM_1782745943545.png";

export default function Services() {
  const servicesList = [
    {
      id: "directional-drilling",
      title: "Directional Drilling",
      icon: Ruler,
      description: "Precision-guided drilling technology allowing for complex well trajectories to maximize reservoir exposure while minimizing surface footprint."
    },
    {
      id: "well-completion",
      title: "Well Completion",
      icon: Anchor,
      description: "End-to-end well completion services, ensuring absolute integrity of the wellbore and readiness for optimal production flow."
    },
    {
      id: "platform-maintenance",
      title: "Platform Maintenance",
      icon: Wrench,
      description: "Structural reinforcements, anti-corrosion treatments, and heavy-machinery overhauls executed directly on active offshore rigs."
    },
    {
      id: "underwater-inspection",
      title: "Underwater Inspection",
      icon: Search,
      description: "ROV and saturation diver-led subsea inspections for pipelines, risers, and platform jackets to ensure structural integrity."
    },
    {
      id: "pipeline-laying",
      title: "Pipeline Laying",
      icon: Waves,
      description: "Subsea umbilical, riser, and flowline (SURF) installation utilizing state-of-the-art laying vessels and tensioners."
    },
    {
      id: "equipment-rental",
      title: "Heavy Equipment Rental",
      icon: Settings,
      description: "Leasing of certified blowout preventers (BOPs), top drives, and specialized heavy lifting gear for offshore platforms."
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Services | NorthWave Energy Drilling"
        description="Comprehensive offshore drilling services including directional drilling, platform maintenance, and subsea inspection."
        url="/services"
        jsonLd={organizationJsonLd}
      />
      
      {/* Header */}
      <section className="bg-slate-900 py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
              Core <span className="text-primary">Capabilities</span>
            </h1>
            <p className="text-lg text-slate-400">
              Technical dominance in harsh environments. We execute complex engineering tasks where failure is not an option.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 rounded-sm hover:border-primary transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="w-14 h-14 bg-muted flex items-center justify-center text-primary mb-6 rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon size={28} />
                </div>
                
                <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-8 pt-4 border-t border-border flex justify-between items-center text-sm font-bold uppercase tracking-wider text-primary">
                  <span>View Specifications</span>
                  <Anchor size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Capability */}
      <section className="py-24 bg-slate-950 text-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Featured Operation</h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight text-white mb-6">Deepwater Pipeline Infrastructure</h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Deploying thousands of kilometers of subsea pipelines requires immense logistical coordination and heavy-duty machinery. Our specialized vessels operate seamlessly in hostile waters to connect vital extraction nodes to primary platforms.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Dynamic Positioning Systems (Class 3)",
                  "High-Tension Lay Spreads",
                  "Automated Welding & Field Joint Coating",
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 bg-slate-900 p-4 border border-slate-800 rounded-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-bold text-sm tracking-wide">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative p-4 bg-slate-900 border border-slate-800 rounded-sm">
              <img 
                src={pipelineImg} 
                alt="Pipeline/cable laying equipment from above" 
                className="w-full h-auto object-cover filter contrast-125 saturate-50"
              />
              <div className="absolute top-8 right-8 bg-primary text-primary-foreground px-4 py-2 font-bold uppercase tracking-widest text-xs shadow-lg">
                SURF Operations
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
