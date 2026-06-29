import { Layout } from "@/components/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
import { motion } from "framer-motion";
import { Anchor, Settings, Waves, Search, Ruler, Wrench, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import pipelineImg from "@assets/Screenshot_2026-06-29_at_11.11.59_AM_1782745943545.png";

export default function Services() {
  const servicesList = [
    {
      id: "directional-drilling",
      icon: Ruler,
      title: "Directional Drilling",
      description: "Precision-guided drilling technology allowing for complex well trajectories to maximize reservoir exposure while minimizing surface footprint.",
      detail: "Our directional drilling teams deploy rotary steerable systems (RSS) and measurement-while-drilling (MWD) tools to deliver real-time borehole positioning with sub-meter accuracy across any geological formation.",
    },
    {
      id: "well-completion",
      icon: Anchor,
      title: "Well Completion",
      description: "End-to-end well completion services ensuring absolute integrity of the wellbore and readiness for optimal production flow.",
      detail: "From casing and cementing through perforation and stimulation, our completion engineers design and execute wellbore programs that maximize reservoir contact and long-term production stability.",
    },
    {
      id: "platform-maintenance",
      icon: Wrench,
      title: "Platform Maintenance",
      description: "Structural reinforcements, anti-corrosion treatments, and heavy-machinery overhauls executed directly on active offshore rigs.",
      detail: "Our maintenance crews operate 24/7 on active platforms, executing planned maintenance and emergency repairs without halting production. Certified for NORSOK and API standards.",
    },
    {
      id: "underwater-inspection",
      icon: Search,
      title: "Underwater Inspection",
      description: "ROV and saturation diver-led subsea inspections for pipelines, risers, and platform jackets to ensure structural integrity.",
      detail: "We deploy Class 2 work-class ROVs and saturation dive systems capable of operating at depths exceeding 300m, providing full video documentation and non-destructive testing (NDT) reports.",
    },
    {
      id: "pipeline-laying",
      icon: Waves,
      title: "Pipeline Laying",
      description: "Subsea umbilical, riser, and flowline (SURF) installation utilizing state-of-the-art laying vessels and tensioners.",
      detail: "Our lay vessels are equipped with dynamic positioning (DP2/DP3) systems, high-tension carousels, and automated J-lay and S-lay systems for installation in shallow to ultra-deepwater environments.",
    },
    {
      id: "equipment-rental",
      icon: Settings,
      title: "Heavy Equipment Rental",
      description: "Leasing of certified blowout preventers (BOPs), top drives, and specialized heavy lifting gear for offshore platforms.",
      detail: "Our rental fleet includes Cameron and NOV BOPs, Varco/TDS top drives, and Liebherr offshore cranes — all maintained to OEM specifications with full certification documentation.",
    },
  ];

  return (
    <Layout>
      <SEO
        title="Services | NorthWave Energy Drilling"
        description="Comprehensive offshore drilling services including directional drilling, platform maintenance, and subsea inspection."
        url="/services"
        jsonLd={organizationJsonLd}
      />

      {/* Page header */}
      <section className="bg-[hsl(221,40%,8%)] pt-28 pb-16 border-b border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">What We Do</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Capabilities</h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            Technical dominance in harsh environments. We execute complex engineering tasks where failure is not an option.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesList.map((service, i) => (
              <motion.a
                key={service.id}
                href={`#${service.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="block bg-card border border-white/[0.07] rounded-lg p-6 hover:border-primary/40 transition-all group focus:outline-none"
              >
                <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <service.icon size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed specs — anchor targets */}
      <section className="py-20 bg-[hsl(221,40%,8%)] border-y border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">Technical Breakdown</p>
            <h2 className="text-3xl font-bold text-white">Service Specifications</h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {servicesList.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-20 bg-card border border-white/[0.07] rounded-lg p-6 flex gap-5 hover:border-primary/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors mt-0.5">
                  <service.icon size={20} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{service.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">{service.detail}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all"
                  >
                    Request a Consultation <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">Featured Operation</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Deepwater Pipeline Infrastructure</h2>
              <p className="text-white/55 text-base mb-8 leading-relaxed">
                Deploying thousands of kilometres of subsea pipelines requires immense logistical coordination. Our specialized vessels operate seamlessly in hostile waters to connect vital extraction nodes to primary platforms.
              </p>
              <ul className="space-y-3 mb-8">
                {["Dynamic Positioning Systems (Class 3)", "High-Tension Lay Spreads", "Automated Welding & Field Joint Coating"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 bg-card border border-white/[0.07] rounded-lg px-4 py-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></div>
                    <span className="text-white/80 text-sm font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-semibold rounded-md transition-all"
              >
                Get a Project Quote <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-white/[0.07]">
              <img
                src={pipelineImg}
                alt="Pipeline laying operations"
                className="w-full h-auto object-cover brightness-90"
              />
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase">
                SURF Operations
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
