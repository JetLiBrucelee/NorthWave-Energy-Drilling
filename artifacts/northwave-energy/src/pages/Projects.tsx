import { Layout } from "@/components/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play } from "lucide-react";

import img1 from "@assets/Screenshot_2026-06-29_at_11.10.29_AM_1782745943532.png";
import img2 from "@assets/Screenshot_2026-06-29_at_11.10.47_AM_1782745943542.png";
import img3 from "@assets/Screenshot_2026-06-29_at_11.10.59_AM_1782745943543.png";
import img4 from "@assets/Screenshot_2026-06-29_at_11.11.12_AM_1782745943544.png";
import img5 from "@assets/Screenshot_2026-06-29_at_11.11.33_AM_1782745943544.png";
import img6 from "@assets/Screenshot_2026-06-29_at_11.11.48_AM_1782745943545.png";
import img7 from "@assets/Screenshot_2026-06-29_at_11.11.59_AM_1782745943545.png";

const VIDEOS = [
  { id: "G9H8h-a_Lzo", title: "Offshore Drilling Operations", desc: "Deep sea rig mobilization and platform setup" },
  { id: "mkZn-N8UJBU", title: "Subsea Pipeline Installation", desc: "SURF installation in extreme-depth conditions" },
  { id: "nQ3nGMEy1-0", title: "Heavy Lift and Deck Operations", desc: "Crane operations and cargo handling aboard an offshore production facility" },
];

export default function Projects() {
  const [selectedImg, setSelectedImg] = useState<{ src: string; caption: string } | null>(null);

  const gallery = [
    { src: img2, caption: "Deepwater Rig Alpha, Sunset Operations", span: "col-span-1 md:col-span-2 row-span-2" },
    { src: img3, caption: "Crane Maintenance and Supply Transfer", span: "col-span-1" },
    { src: img4, caption: "Saturation Dive Bell Deployment", span: "col-span-1" },
    { src: img6, caption: "Supply Vessel Transit, North Sea", span: "col-span-1 md:col-span-2" },
    { src: img5, caption: "Top Drive Inspection", span: "col-span-1" },
    { src: img1, caption: "Crew Logistics, Port Docking", span: "col-span-1" },
    { src: img7, caption: "Pipeline Laying Operations, Aerial View", span: "col-span-1 md:col-span-2" },
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
      <section className="bg-[hsl(221,40%,8%)] pt-28 pb-16 border-b border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">Operations</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Operation Gallery</h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            A visual record of our capability. Hard environments demanding hardened equipment.
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-3">
            {gallery.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className={`relative group cursor-pointer overflow-hidden rounded-lg bg-card ${item.span}`}
                onClick={() => setSelectedImg(item)}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-[hsl(222,47%,5%)]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                  <ZoomIn size={28} className="text-primary mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform" />
                  <p className="text-white font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75 max-w-xs">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video Gallery */}
      <section className="py-20 bg-[hsl(221,40%,8%)] border-t border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">Field Operations</p>
            <h2 className="text-3xl font-bold text-white mb-2">Live from the Rig</h2>
            <p className="text-white/50 text-sm max-w-xl leading-relaxed">
              Behind-the-scenes footage of our offshore drilling, subsea installation, and platform maintenance operations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {VIDEOS.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card border border-white/[0.07] rounded-lg overflow-hidden hover:border-primary/30 transition-all"
              >
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
                    <Play size={13} className="text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">NorthWave Operations</span>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{video.title}</h4>
                  <p className="text-white/45 text-xs leading-relaxed">{video.desc}</p>
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
            className="fixed inset-0 z-[100] bg-[hsl(222,47%,5%)]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.src}
                alt={selectedImg.caption}
                className="w-full h-auto max-h-[78vh] object-contain rounded-lg border border-white/[0.08] shadow-2xl"
              />
              <div className="bg-card border border-t-0 border-white/[0.08] rounded-b-lg px-6 py-4 text-center">
                <p className="text-white/80 font-semibold text-sm">{selectedImg.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
