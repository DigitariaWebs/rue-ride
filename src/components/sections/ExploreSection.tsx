"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Clock, CreditCard, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

const exploreFeatures = [
  { key: "anywhere", icon: MapPin, color: "text-emerald-500" },
  { key: "anytime", icon: Clock, color: "text-amber-500" },
  { key: "payment", icon: CreditCard, color: "text-blue-500" },
];

function FloatingCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function FeatureCard({
  feature,
  index,
  t,
}: {
  feature: (typeof exploreFeatures)[0];
  index: number;
  t: (key: string) => string;
}) {
  const Icon = feature.icon;
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set((e.clientY - centerY) / 25);
    rotateY.set((centerX - e.clientX) / 25);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000"
    >
      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
        <Card className="relative p-8 h-full border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl transition-all duration-300 group overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <motion.div
            className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ transform: "translateZ(30px)" }}
          >
            <Icon className={`w-7 h-7 ${feature.color}`} />
          </motion.div>
          <motion.h3
            className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors"
            style={{ transform: "translateZ(20px)" }}
          >
            {t(`${feature.key}.title`)}
          </motion.h3>
          <motion.p
            className="text-muted-foreground leading-relaxed mb-6"
            style={{ transform: "translateZ(15px)" }}
          >
            {t(`${feature.key}.description`)}
          </motion.p>

          {/* Mini feature list with stagger */}
          <div className="space-y-2" style={{ transform: "translateZ(10px)" }}>
            {[1, 2].map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 + i * 0.1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <span className="text-muted-foreground">{t(`${feature.key}.feature${item}`)}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function TestimonialCard({
  index,
  quote,
  name,
  role,
  delay,
}: {
  index: number;
  quote: string;
  name: string;
  role: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <FloatingCard delay={index * 0.5}>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
          <Card className="relative p-6 border-border bg-card/50 backdrop-blur-sm group hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />

            <motion.div
              initial={{ scale: 0.5, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors" />
            </motion.div>
            <p className="text-muted-foreground mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {name.charAt(0)}
              </motion.div>
              <div>
                <p className="font-medium text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </FloatingCard>
    </motion.div>
  );
}

export function ExploreSection() {
  const t = useTranslations("explore");

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

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
            transition={{ delay: 0.1 }}
          >
            {t("title")}
            <br />
            <motion.span
              className="text-primary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {t("titleHighlight")}
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {exploreFeatures.map((feature, index) => (
            <FeatureCard key={feature.key} feature={feature} index={index} t={t} />
          ))}
        </div>

        {/* Testimonials Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((testimonial, index) => (
            <TestimonialCard
              key={testimonial}
              index={index}
              quote={t(`testimonial${testimonial}.quote`)}
              name={t(`testimonial${testimonial}.name`)}
              role={t(`testimonial${testimonial}.role`)}
              delay={0.4 + index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
