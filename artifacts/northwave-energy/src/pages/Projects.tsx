import { Layout } from "@/components/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play } from "lucide-react";

// Import all 7 photos
import img1 from "@assets/Screenshot_2026-06-29_at_11.10.29_AM_1782745943532.png";
import img2 from "@assets/Screenshot_2026-06-29_at_11.10.47_AM_1782745943542.png";
import img3 from "@assets/Screenshot_2026-06-29_at_11.10.59_AM_1782745943543.png";
import img4 from "@assets/Screenshot_2026-06-29_at_11.11.12_AM_1782745943544.png";
import img5 from "@assets/Screenshot_2026-06-29_at_11.11.33_AM_1782745943544.png";
import img6 from "@assets/Screenshot_2026-06-29_at_11.11.48_AM_1782745943545.png";
import img7 from "@assets/Screenshot_2026-06-29_at_11.11.59_AM_1782745943545.png";

const VIDEOS = [
  {
    id: "G9H8h-a_Lzo",
    title: "Offshore Drilling Operations",
    desc: "Deep sea rig mobilization and platform setup",
  },
  {
    id: "mkZn-N8UJBU",
    title: "Subsea Pipeline Installation",
    desc: "SURF installation in extreme-depth conditions",
  },
  {
    id: "PCGeQdZpO6A",
    title: "Heavy Lift & Well Completion",
    desc: "Top drive installation and wellbore completion sequence",
  },
];

export default function Projects() {
  const [selectedImg, setSelectedImg] = useState<{ src: string; caption: string } | null>(null);

  const gallery = [
    { src: img2, caption: "Deepwater Rig Alpha — Sunset Operations", span: "col-span-1 md:col-span-2 row-span-2" },
    { src: img3, caption: "Crane Maintenance and Supply Transfer", span: "col-span-1" },
    { src: img4, caption: "Saturation Dive Bell Deployment", span: "col-span-1" },
    { src: img6, caption: "Supply Vessel Transit — North Sea", span: "col-span-1 md:col-span-2" },
    { src: img5, caption: "Top Drive Inspection", span: "col-span-1" },
    { src: img1, caption: "Crew Logistics — Port Docking", span: "col-span-1" },
    { src: img7, caption: "Pipeline Laying Operations — Aerial View", span: "col-span-1 md:col-span-2" },
  ];

  return (
    <Layout>
      <SEO
        title="Project Gallery | NorthWave Energy Drilling"
        description="Visual showcase of NorthWave Energy Drilling's offshore operations, rigs, and crew in action."
        url="/projects"
        jsonLd={organizationJsonLd}
      />

      {/* Header */}
      <section className="bg-slate-900 py-16 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Operation <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            A visual record of our capability. Hard environments demanding hardened equipment.
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-4">
            {gallery.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className={`relative group cursor-pointer overflow-hidden rounded-sm bg-muted ${item.span}`}
                onClick={() => setSelectedImg(item)}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-50 group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                  <ZoomIn size={32} className="text-primary mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform" />
                  <p className="text-white font-heading font-bold uppercase tracking-widest text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video Gallery */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Field Operations</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight text-white">
              Live from the Rig
            </h3>
            <p className="text-slate-400 mt-3 max-w-xl">
              Behind-the-scenes footage of our offshore drilling, subsea installation, and platform maintenance operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VIDEOS.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group bg-slate-900 border border-slate-800 rounded-sm overflow-hidden hover:border-primary transition-colors"
              >
                {/* Responsive 16/9 iframe wrapper */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-primary"></div>
                    <Play size={14} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">NorthWave Operations</span>
                  </div>
                  <h4 className="font-heading font-bold uppercase tracking-wide text-white text-base mb-1">{video.title}</h4>
                  <p className="text-sm text-slate-400">{video.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-sm"
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-6xl w-full max-h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.src}
                alt={selectedImg.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-sm border border-slate-800 shadow-2xl"
              />
              <div className="bg-slate-900 p-4 border border-t-0 border-slate-800 text-center">
                <p className="text-white font-heading font-bold uppercase tracking-widest text-sm">
                  {selectedImg.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
