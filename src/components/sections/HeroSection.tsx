"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  Star,
  Car,
  Users,
  Accessibility,
  UtensilsCrossed,
  Package,
  PawPrint,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useTheme } from "@/components/ThemeProvider";

const quickServices = [
  { key: "rides", icon: Car },
  { key: "ridesPlus", icon: Users },
  { key: "ebike", icon: Accessibility },
  { key: "cityToCity", icon: UtensilsCrossed },
  { key: "send", icon: Package },
  { key: "food", icon: PawPrint },
];

export function HeroSection() {
  const t = useTranslations("hero");
  const tServices = useTranslations("services");
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useMousePosition(sectionRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for background elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Smooth mouse following
  const mouseX = useSpring(mouse.normalizedX * 20, {
    stiffness: 100,
    damping: 30,
  });
  const mouseY = useSpring(mouse.normalizedY * 20, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative pt-32 md:pt-36 lg:pt-40 xl:pt-40 pb-16 md:pb-18 lg:pb-16 xl:pb-16 overflow-hidden"
    >
      {/* Animated Background decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y: bgY1, scale: bgScale, x: mouseX }}
          className="absolute top-0 right-0 w-150 h-150 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgY2, x: mouseY }}
          className="absolute bottom-0 left-0 w-100 h-100 bg-accent/5 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-14 lg:gap-16 xl:gap-16 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-8"
          >
            {/* Hero Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <Image
                src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                alt="VTC Ride"
                width={280}
                height={100}
                className="h-20 sm:h-24 lg:h-28 w-auto"
                priority
              />
            </motion.div>

            {/* Mobile App Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              {t("mobileAppSoon")}
            </motion.div>

            {/* Top Badge with subtle animation */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm mb-6"
              whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-muted-foreground">{t("tagline")}</span>
              <motion.span
                className="text-primary font-medium flex items-center gap-1"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {t("explore")} <ArrowRight className="w-3 h-3" />
              </motion.span>
            </motion.div>

            {/* Headline with staggered animation */}
            <h1 className="text-4xl sm:text-5xl md:text-5.5xl lg:text-6xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="italic inline-block"
              >
                {t("headlinePart1")}
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="inline-block"
              >
                {t("headlinePart2")}
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-block"
              >
                {t("headlinePart3")}
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              {t("description")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link href="/calculator">
                <Button
                  size="lg"
                  className="rounded-full px-8 group relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-primary-foreground/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {t("downloadApp")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <motion.div
                    key={star}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 1.1 + index * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                  >
                    <Star className="w-5 h-5 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {t("reviews", { count: "100" })}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Services Grid + Phone */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Services Card with hover effects */}
            <motion.div
              className="bg-card rounded-3xl border border-border p-6 md:p-5 lg:p-6 xl:p-6 mb-6 shadow-lg"
              whileHover={{
                y: -4,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h3 className="font-semibold mb-2">{t("servicesTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("servicesSubtitle")}
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-2 lg:gap-3 xl:gap-3">
                {quickServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors cursor-pointer group"
                    >
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-background flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                      <span className="text-xs font-medium text-center">
                        {tServices(`${service.key}.title`)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Phone + Captain Status */}
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <PhoneMockup />
              </div>

              {/* Floating Status Card with enhanced animation */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="hidden lg:block absolute -right-4 top-[60%]"
              >
                <motion.div
                  className="bg-card rounded-2xl p-4 shadow-xl border border-border"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-primary"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("captainOnWay")}</p>
                      <p className="text-xs text-muted-foreground">
                        🚗 • 3 min
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
