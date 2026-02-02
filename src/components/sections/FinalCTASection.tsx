"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FinalCTASection() {
  const t = useTranslations("finalCta");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0, 1, 1, 0.8],
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 lg:py-26 xl:py-28 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 rounded-full bg-primary/5 blur-3xl"
            style={{
              left: `${10 + i * 20}%`,
              top: `${30 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm mb-6"
            whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="text-primary font-medium"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t("badge")}
            </motion.span>
          </motion.div>

          {/* Headline with staggered animation */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-4.5xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t("title")}
            <br />
            <motion.span
              className="text-primary inline-block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {t("titleHighlight")}
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {t("description")}
          </motion.p>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            {t("comingSoon")}
          </motion.div>

          {/* App Store Buttons with enhanced animations */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-3 lg:gap-4 xl:gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            {/* App Store */}
            <motion.div className="flex items-center gap-3 bg-foreground text-background rounded-xl px-5 py-3 cursor-not-allowed relative overflow-hidden opacity-70">
              <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <p className="text-xs opacity-70">{t("downloadOn")}</p>
                <p className="font-semibold">{t("appStore")}</p>
              </div>
            </motion.div>

            {/* Google Play */}
            <motion.div className="flex items-center gap-3 bg-foreground text-background rounded-xl px-5 py-3 cursor-not-allowed relative overflow-hidden opacity-70">
              <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <p className="text-xs opacity-70">{t("getItOn")}</p>
                <p className="font-semibold">{t("googlePlay")}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm text-muted-foreground">{t("rating")}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
