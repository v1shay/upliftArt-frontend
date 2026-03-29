import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { cn } from '../lib/utils';

// Import IMG_ assets
import img1308 from '../assets/cards1.jpeg';
import img1326 from '../assets/cards2.jpeg';
import img1327 from '../assets/cards3.jpeg';
import img1328 from '../assets/cards4.jpeg';
import img2925 from '../assets/cards5.jpeg';
import img4557 from '../assets/cards6.jpeg';
import img4559 from '../assets/cards7.jpeg';
import img4563 from '../assets/cards8.jpeg';
import img4565 from '../assets/cards9.jpeg';
import img5527 from '../assets/cards10.jpg';
import img2222 from '../assets/photo.jpeg'

/* ─── 3D Animation Presets ──────────────────────────────────── */

const fadeUp3D = {
  hidden: { opacity: 0, y: 60, rotateX: 25, scale: 0.9 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1.6, delay, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.6, delay, ease: [0.33, 1, 0.68, 1] as const },
  }),
};

const rotateIn3D = {
  hidden: { opacity: 0, rotateY: -25, rotateX: 10, x: -80, scale: 0.85 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    x: 0,
    scale: 1,
    transition: { duration: 1.8, delay, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

const rotateInReverse3D = {
  hidden: { opacity: 0, rotateY: 25, rotateX: 10, x: 80, scale: 0.85 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    x: 0,
    scale: 1,
    transition: { duration: 1.8, delay, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

const flipIn3D = {
  hidden: { opacity: 0, rotateX: 45, y: 80, scale: 0.8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: { duration: 1.8, delay, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

const slideIn3D = (direction: 'left' | 'right') => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -100 : 100,
    rotateY: direction === 'left' ? -20 : 20,
    scale: 0.9,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 1.6, delay, ease: [0.23, 1, 0.32, 1] as const },
  }),
});

/* ─── Lazy Image with Shimmer ───────────────────────────────── */

const LazyImage: React.FC<{
  src: string;
  className?: string;
  alt?: string;
}> = ({ src, className, alt = "Foundation Visual" }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 img-shimmer rounded-[8px] transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover transform-gpu transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

/* ─── 3D Tilt Card on Mouse Move ────────────────────────────── */

const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className, intensity = 8 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("transform-gpu transition-transform duration-300 ease-out", className)}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

/* ─── Shared Components ─────────────────────────────────────── */

const LiquidGlassFrame: React.FC<{
  src: string;
  className?: string;
}> = ({ src, className }) => (
  <TiltCard intensity={6}>
    <div
      className={cn(
        "relative rounded-[8px] overflow-hidden border border-white/[0.08] bg-ivory/[0.06] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-sm group cursor-pointer transform-gpu",
        className
      )}
    >
      <LazyImage
        src={src}
        className="w-full h-full group-hover:scale-[1.04] group-hover:grayscale-0 grayscale-[15%] transition-transform duration-[1.2s] ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-ivory/[0.08] via-transparent to-ivory/[0.04] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-ivory/[0.03] pointer-events-none" />
    </div>
  </TiltCard>
);

const GalleryCard: React.FC<{
  src: string;
  className?: string;
}> = ({ src, className }) => (
  <div
    className={cn(
      "relative rounded-[8px] overflow-hidden border border-white/[0.08] bg-black/20 transform-gpu flex-shrink-0",
      className
    )}
  >
    <LazyImage src={src} className="w-full h-full" />
  </div>
);

const SectionContainer: React.FC<{ children: React.ReactNode; isFullWidth?: boolean }> = ({ children, isFullWidth }) => (
  <div className={cn("min-h-screen pt-28 pb-40 px-6 max-w-7xl mx-auto flex flex-col", isFullWidth && "max-w-none px-0 overflow-hidden pt-20")}>
    {children}
  </div>
);

/* ─── Section Title with 3D Reveal ──────────────────────────── */

const SectionDivider: React.FC<{ label: string }> = ({ label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center gap-8 my-20 perspective-scene"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 120 } : {}}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="h-px bg-gradient-to-r from-transparent to-gold/40"
      />
      <motion.span
        initial={{ opacity: 0, rotateX: 90, y: 20 }}
        animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="text-[10px] font-sans font-bold tracking-[0.5em] uppercase text-gold/60"
      >
        {label}
      </motion.span>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 120 } : {}}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="h-px bg-gradient-to-l from-transparent to-gold/40"
      />
    </motion.div>
  );
};

/* ─── Glass Marquee — 3D perspective rows ───────────────────── */

const GlassMarquee: React.FC<{
  images: string[];
  direction?: 'left' | 'right';
  speed?: number;
  height?: string;
  tiltDeg?: number;
}> = ({ images, direction = 'left', speed = 40, height = "h-[450px]", tiltDeg = 0 }) => {
  const totalImages = [...images, ...images];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative flex overflow-hidden select-none"
      initial={{ opacity: 0, rotateX: 8, y: 40 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: '1200px', transform: `rotateY(${tiltDeg}deg)` }}
    >
      <div
        className={cn(
          "flex gap-6 py-3 px-3 transform-gpu",
          direction === 'left' ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isVisible ? 'running' : 'paused',
          willChange: isVisible ? 'transform' : 'auto',
        }}
      >
        {totalImages.map((src, i) => (
          <GalleryCard
            key={i}
            src={src}
            className={cn("w-[420px]", height)}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ─── Scroll-Linked Parallax Section ────────────────────────── */

const ParallaxSection: React.FC<{
  children: React.ReactNode;
  offset?: number;
}> = ({ children, offset = 50 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className="transform-gpu">
      {children}
    </motion.div>
  );
};

/* ─── MISSION ───────────────────────────────────────────────── */

export const Mission = () => (
  <section id="mission">
    <SectionDivider label="Our Mission" />
    <SectionContainer>
      <div className="flex flex-col gap-40 perspective-scene">
        {[
          {
            img: img1308,
            title: "It starts at a table.",
            desc: "Students from 10+ Bay Area schools sit together — markers, watercolors, and cotton paper spread between them. No curriculum. No rubric. Just the quiet work of making something for someone they've never met.",
          },
          {
            img: img1326,
            title: "Every card is singular.",
            desc: "We don't produce cards. Students create them — individually, by hand, with materials funded by community donations. Over 5,000+ have been made so far. Each one is different. That's the point.",
          },
          {
            img: img1327,
            title: "They arrive where they matter.",
            desc: "Through our partnership with Cards for Hospitalized Kids, each piece enters a network of more than 500,000 cards reaching pediatric patients nationwide. Ours come from the Bay. They carry something local.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={flipIn3D}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0}
            className={cn(
              "flex flex-col md:flex-row gap-16 md:gap-28 items-center w-full preserve-3d",
              i % 2 !== 0 && "md:flex-row-reverse"
            )}
          >
            <motion.div
              variants={i % 2 === 0 ? rotateIn3D : rotateInReverse3D}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              custom={0.15}
              className="w-full md:w-3/5 aspect-[16/10] preserve-3d"
            >
              <ParallaxSection offset={30}>
                <LiquidGlassFrame src={item.img} className="w-full h-full" />
              </ParallaxSection>
            </motion.div>
            <motion.div
              variants={slideIn3D(i % 2 === 0 ? 'right' : 'left')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              custom={0.3}
              className="flex-1 flex flex-col gap-8 preserve-3d"
            >
              <motion.h3
                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40, rotateY: i % 2 === 0 ? 10 : -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="text-4xl md:text-5xl font-serif font-bold italic text-glass-creme-text drop-shadow-[0_0_15px_rgba(255,243,222,0.15)] leading-tight"
              >
                {item.title}
              </motion.h3>
              <motion.div
                initial={{ width: 0, rotateZ: -3 }}
                whileInView={{ width: 80, rotateZ: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-gold/40"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.7 }}
                className="text-xl md:text-2xl font-serif font-light leading-[1.8] text-glass-ivory-text/75 text-balance"
              >
                {item.desc}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  </section>
);

/* ─── IMPACT ────────────────────────────────────────────────── */

export const Impact = () => (
  <section id="impact">
    <SectionDivider label="Our Impact" />
    <SectionContainer>
      <div className="flex flex-col gap-20 pt-12 perspective-scene">
        {[
          {
            img: img1328,
            title: "Bay Area, outward.",
            desc: "Our chapters span 10+ schools across the region. Students bring friends — it's that kind of atmosphere. Every session is open, social, and intentionally low-pressure.",
          },
          {
            img: img2925,
            title: "5,000+ and counting.",
            desc: "Not a target — a tally. Each card represents one student choosing to spend time on someone else. We provide all supplies. They provide the rest.",
          },
          {
            img: img4557,
            title: "Part of something larger.",
            desc: "Through Cards for Hospitalized Kids, our work joins a national network exceeding half a million cards. The scale is collective. The gesture is always personal.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={flipIn3D}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={i * 0.12}
            className="flex flex-col md:flex-row border border-white/[0.06] bg-ivory/[0.06] backdrop-blur-2xl rounded-[12px] overflow-hidden min-h-[450px] group preserve-3d"
          >
            <TiltCard intensity={4} className="w-full md:w-1/2 min-h-[350px] md:min-h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full relative overflow-hidden"
              >
                <img
                  src={item.img}
                  className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-[1.05] grayscale-[15%] group-hover:grayscale-0"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-ivory/[0.04] mix-blend-overlay pointer-events-none" />
              </motion.div>
            </TiltCard>
            <div className="w-full md:w-1/2 p-16 md:p-20 flex flex-col justify-center gap-8">
              <motion.h3
                variants={fadeUp3D}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2 + i * 0.1}
                className="text-3xl md:text-4xl font-serif font-bold italic text-glass-creme-text"
              >
                {item.title}
              </motion.h3>
              <motion.div
                initial={{ width: 0, rotateZ: -5 }}
                whileInView={{ width: 48, rotateZ: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-gold/40"
              />
              <motion.p
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.6 }}
                className="text-lg md:text-xl font-serif font-light leading-[1.85] text-glass-ivory-text/60"
              >
                {item.desc}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  </section>
);

/* ─── CARDS (Gallery) — 3D Perspective Rows ─────────────────── */

export const Cards = () => {
  const imagesRow1 = [img4559, img1308, img4563, img4565, img5527];
  const imagesRow2 = [img1326, img1327, img1328, img2925, img4557];
  const imagesRow3 = [img4559, img1308, img4563, img1326, img1327];

  return (
    <section id="cards">
      <SectionDivider label="Gallery" />
      <SectionContainer isFullWidth>
        <div className="flex flex-col gap-6 perspective-scene">
          <GlassMarquee images={imagesRow1} direction="left" speed={55} height="h-[520px]" tiltDeg={-1} />
          <GlassMarquee images={imagesRow2} direction="right" speed={75} height="h-[340px]" tiltDeg={0.5} />
          <GlassMarquee images={imagesRow3} direction="left" speed={65} height="h-[380px]" tiltDeg={-0.5} />
        </div>
      </SectionContainer>
    </section>
  );
};

/* ─── CONTACT — 3D Split Reveal ─────────────────────────────── */

export const Contact = () => (
  <section id="contact" className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto">
    <SectionDivider label="Get In Touch" />
    <div className="flex flex-col lg:flex-row gap-20 items-stretch min-h-[700px] perspective-scene">
      {/* Left: Photo — rotates in from left 3D space */}
      <motion.div
        variants={rotateIn3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        custom={0}
        className="flex-1 preserve-3d"
      >
        <ParallaxSection offset={20}>
          <LiquidGlassFrame src={img2222} className="w-full h-full" />
        </ParallaxSection>
      </motion.div>

      {/* Right: Glass Text Panel — rotates in from right */}
      <motion.div
        variants={rotateInReverse3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        custom={0.2}
        className="flex-1 bg-ivory/[0.06] backdrop-blur-3xl border border-white/[0.06] p-20 md:p-24 flex flex-col justify-center rounded-[12px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] preserve-3d"
      >
        <motion.span
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          className="text-[11px] font-sans font-bold uppercase tracking-[0.7em] text-gold mb-12 block"
        >
          Get Involved
        </motion.span>
        <motion.h2
          variants={fadeUp3D}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="text-6xl md:text-7xl font-serif font-bold italic tracking-tight text-glass-creme-text mb-10 leading-none"
        >
          Vishay Agarwal <span className="font-normal not-italic opacity-60">Founder</span>
        </motion.h2>
        <motion.div
          initial={{ width: 0, rotateZ: -5 }}
          whileInView={{ width: 96, rotateZ: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="h-px bg-gold/40 mb-10"
        />
        <motion.p
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.7 }}
          className="text-xl md:text-2xl font-serif font-light leading-[1.8] text-glass-ivory-text/65 mb-16"
        >
          I started Uplift Art to make something simple actually reach people when it matters.

          Seeing people sit down, make something real, and send it to a kid who might need it has been the best part.

          If you want to be part of it, just show up. We have everything you need!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="space-y-6"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-glass-creme-text/35 font-bold">General Inquiries</p>
          <a
            href="mailto:v.agrwl17@gmail.com"
            className="inline-block text-3xl md:text-4xl font-serif font-bold text-glass-creme-text italic border-b border-gold/20 pb-2 hover:text-gold hover:border-gold/60 transition-all duration-700"
          >
            v.agrwl17@gmail.com
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);
