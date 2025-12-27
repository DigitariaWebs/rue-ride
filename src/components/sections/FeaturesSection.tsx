"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Shield, Zap, BadgeEuro, HeadphonesIcon, CreditCard, Leaf } from "lucide-react";
import { useRef } from "react";

const features = [
  { key: "safety", icon: Shield, gradient: "from-emerald-500/20 to-emerald-500/5", iconBg: "group-hover:bg-emerald-500/20" },
  { key: "speed", icon: Zap, gradient: "from-amber-500/20 to-amber-500/5", iconBg: "group-hover:bg-amber-500/20" },
  { key: "pricing", icon: BadgeEuro, gradient: "from-blue-500/20 to-blue-500/5", iconBg: "group-hover:bg-blue-500/20" },
  { key: "support", icon: HeadphonesIcon, gradient: "from-purple-500/20 to-purple-500/5", iconBg: "group-hover:bg-purple-500/20" },
  { key: "payment", icon: CreditCard, gradient: "from-rose-500/20 to-rose-500/5", iconBg: "group-hover:bg-rose-500/20" },
  { key: "eco", icon: Leaf, gradient: "from-teal-500/20 to-teal-500/5", iconBg: "group-hover:bg-teal-500/20" },
];

function TiltCard({ children, gradient }: { children: React.ReactNode; gradient: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Position for gradient spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    
    // Tilt effect
    const x = (e.clientY - centerY) / 10;
    const y = (centerX - e.clientX) / 10;
    rotateX.set(x);
    rotateY.set(y);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const gradientBackground = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.15), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {/* Gradient spotlight that follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: gradientBackground }}
      />
      {children}
    </motion.div>
  );
}

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="about" className="py-24 lg:py-32 relative">
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/30 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm mb-6"
            whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
          >
            <span className="text-primary font-medium">{t("badge")}</span>
          </motion.div>
          <motion.h2
            className="text-3xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="group perspective-1000"
              >
                <TiltCard gradient={feature.gradient}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative h-full p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                  >
                    {/* Gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                      {/* Icon with animation */}
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-primary/10 ${feature.iconBg} flex items-center justify-center mb-6 transition-all duration-300`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: [0, -15, 15, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-7 h-7 text-primary" />
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <motion.h3
                        className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        {t(`${feature.key}.title`)}
                      </motion.h3>
                      <motion.p
                        className="text-muted-foreground leading-relaxed"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        {t(`${feature.key}.description`)}
                      </motion.p>
                    </div>

                    {/* Corner decoration */}
                    <motion.div
                      className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  </motion.div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
