"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

const stats = [
  { key: "rides", value: 3, suffix: " min" },
  { key: "drivers", value: 100, suffix: "%" },
  { key: "co2", value: 100, suffix: "%" },
];

function AnimatedCounter({
  value,
  suffix,
  delay = 0,
}: {
  value: number;
  suffix: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const displayValue = useTransform(springValue, (v) => Math.round(v));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        springValue.set(value);
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, springValue, delay, hasAnimated]);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (v) => {
      setCount(v);
    });
    return unsubscribe;
  }, [displayValue]);

  return (
    <p ref={ref} className="text-3xl lg:text-4xl font-bold text-primary mb-2">
      {count}
      <span className="text-2xl">{suffix}</span>
    </p>
  );
}

export function StatsSection() {
  const t = useTranslations("stats");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 lg:py-26 xl:py-28 relative overflow-hidden"
    >
      {/* Background decoration with subtle animation */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 via-muted/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-10 lg:gap-12 xl:gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm mb-6"
              whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                className="text-primary font-medium"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("badge")}
              </motion.span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("title")}
              <br />
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t("titleHighlight")}
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                variant="outline"
                className="rounded-full group overflow-hidden relative"
              >
                <motion.span
                  className="absolute inset-0 bg-primary/5"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center gap-2">
                  {t("cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="relative p-6 md:p-5 lg:p-6 xl:p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm text-center group cursor-default"
                >
                  {/* Hover gradient */}
                  <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      delay={400 + index * 200}
                    />
                    <motion.p
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {t(`${stat.key}.label`)}
                    </motion.p>
                    <motion.p
                      className="text-xs text-muted-foreground/70 mt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      {t(`${stat.key}.sublabel`)}
                    </motion.p>
                  </div>

                  {/* Decorative dot */}
                  <motion.div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
