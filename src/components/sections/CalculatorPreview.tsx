"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { Navigation, ArrowRight, Calculator, Route, Clock, Euro } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function CalculatorPreview() {
  const t = useTranslations("calculator");
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  // Mouse spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.06), transparent 80%)`;

  return (
    <section ref={sectionRef} id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"
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
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Calculator className="w-4 h-4 text-primary" />
            </motion.div>
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

        {/* Calculator Card with scroll animation */}
        <motion.div
          style={{ y, opacity, scale }}
          className="max-w-4xl mx-auto perspective-1000"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ y: -4 }}
            className="relative rounded-[2rem] border border-border bg-card/80 backdrop-blur-xl p-8 lg:p-12 shadow-2xl overflow-hidden group"
          >
            {/* Mouse spotlight */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: spotlightBackground }}
            />

            {/* Decorative elements with animation */}
            <motion.div
              className="absolute top-4 right-4 flex gap-1.5"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-destructive/60"
                whileHover={{ scale: 1.2 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-amber-500/60"
                whileHover={{ scale: 1.2 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-primary/60"
                whileHover={{ scale: 1.2 }}
              />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left - Input Preview */}
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Pickup Input */}
                  <motion.div
                    className="group/input"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="text-sm text-muted-foreground mb-2 block">{t("pickup")}</label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <motion.div
                          className="w-3 h-3 rounded-full bg-primary"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <div className="h-14 w-full rounded-2xl border border-border bg-muted/50 pl-12 pr-4 flex items-center text-muted-foreground group-hover/input:border-primary/50 transition-colors">
                        Tour Eiffel, Paris
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Dropoff Input */}
                  <motion.div
                    className="group/input"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="text-sm text-muted-foreground mb-2 block">{t("dropoff")}</label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <Navigation className="w-4 h-4 text-destructive fill-destructive" />
                      </div>
                      <div className="h-14 w-full rounded-2xl border border-border bg-muted/50 pl-12 pr-4 flex items-center text-muted-foreground group-hover/input:border-primary/50 transition-colors">
                        Arc de Triomphe, Paris
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Route Info */}
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="p-4 rounded-2xl bg-primary/5 border border-primary/10"
                    whileHover={{ scale: 1.03, borderColor: "hsl(var(--primary) / 0.3)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Route className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{t("distance")}</span>
                    </div>
                    <motion.p
                      className="font-semibold text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      4.2 km
                    </motion.p>
                  </motion.div>
                  <motion.div
                    className="p-4 rounded-2xl bg-primary/5 border border-primary/10"
                    whileHover={{ scale: 1.03, borderColor: "hsl(var(--primary) / 0.3)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{t("duration")}</span>
                    </div>
                    <motion.p
                      className="font-semibold text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >
                      12 min
                    </motion.p>
                  </motion.div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/calculator" className="block">
                    <Button size="lg" className="w-full rounded-2xl h-14 text-base group overflow-hidden relative">
                      <motion.span
                        className="absolute inset-0 bg-primary-foreground/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative flex items-center gap-2">
                        {t("calculate")}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right - Fare Preview */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.div
                  className="rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Fare Display */}
                  <div className="text-center mb-8">
                    <p className="text-sm text-muted-foreground mb-2">{t("estimatedFare")}</p>
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    >
                      <Euro className="w-10 h-10 text-primary" />
                      <motion.span
                        className="text-6xl font-bold text-primary"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        12.50
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Fare Breakdown with stagger */}
                  <div className="space-y-3 mb-6">
                    {[
                      { label: t("baseFare"), value: "€2.60" },
                      { label: t("distanceCalc", { distance: "4.2 km" }), value: "€4.41" },
                      { label: t("timeCalc", { time: "12 min" }), value: "€4.20" },
                      { label: t("discount"), value: "€1.29" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="flex justify-between text-sm"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="pt-4 border-t border-border"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t("total")}</span>
                      <span className="text-2xl font-bold">€12.50</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg cursor-default"
                >
                  {t("save")} ✓
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
