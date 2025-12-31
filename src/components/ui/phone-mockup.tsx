"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Navigation, Car } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

export function PhoneMockup() {
  const t = useTranslations("phone");
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set((e.clientY - centerY) / 30);
    rotateY.set((centerX - e.clientX) / 30);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative perspective-1000"
    >
      {/* Phone Frame */}
      <motion.div
        className="relative w-[280px] sm:w-[320px]"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Phone outer frame with gradient border */}
        <div className="relative bg-foreground rounded-[3rem] p-3 shadow-2xl">
          {/* Gradient overlay on frame */}
          <motion.div
            className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Phone screen */}
          <div className="bg-background rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <motion.div
              className="flex justify-between items-center px-6 py-3 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-medium">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-muted-foreground rounded-sm relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0.5 bg-primary rounded-sm"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* App Header */}
            <motion.div
              className="px-5 pb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <Image
                  src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                  alt="VTC Ride"
                  width={100}
                  height={36}
                  className="h-8 w-auto"
                />
              </div>
            </motion.div>

            {/* Map Area */}
            <motion.div
              className="mx-4 rounded-2xl bg-muted/50 h-48 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              {/* Simplified map visualization */}
              <div className="absolute inset-0">
                {/* Grid pattern */}
                <svg className="w-full h-full opacity-30" viewBox="0 0 200 150">
                  {[...Array(8)].map((_, i) => (
                    <g key={i}>
                      <line
                        x1={i * 25}
                        y1="0"
                        x2={i * 25}
                        y2="150"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-muted-foreground"
                      />
                      <line
                        x1="0"
                        y1={i * 20}
                        x2="200"
                        y2={i * 20}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-muted-foreground"
                      />
                    </g>
                  ))}
                  {/* Animated Route line */}
                  <motion.path
                    d="M40 120 Q80 100 100 80 T160 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-primary"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              {/* Location Label */}
              <motion.div
                className="absolute top-3 left-3 right-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="bg-card rounded-xl px-3 py-2 shadow-sm border border-border text-xs">
                  <span className="text-muted-foreground">
                    {t("locationLabel")}
                  </span>
                </div>
              </motion.div>

              {/* Pickup marker with pulse */}
              <motion.div
                className="absolute left-[20%] bottom-[20%]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30"
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
              </motion.div>

              {/* Dropoff marker */}
              <motion.div
                className="absolute right-[20%] top-[25%]"
                initial={{ scale: 0, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MapPin className="w-5 h-5 text-destructive fill-destructive" />
                </motion.div>
              </motion.div>

              {/* Info badge */}
              <motion.div
                className="absolute bottom-3 right-3 bg-card rounded-lg px-2 py-1 shadow-sm border border-border"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-muted-foreground">
                    {t("pickupPoint")}
                  </span>
                  <span className="font-medium">• {t("minutes")}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Location inputs */}
            <motion.div
              className="p-4 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card"
                whileHover={{ borderColor: "hsl(var(--primary) / 0.5)" }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-muted-foreground">
                  {t("addressPlaceholder")}
                </span>
              </motion.div>
            </motion.div>

            {/* Ride Details */}
            <motion.div
              className="px-4 pb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="rounded-2xl border border-border bg-card p-4"
                whileHover={{
                  borderColor: "hsl(var(--primary) / 0.3)",
                  scale: 1.01,
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">
                    {t("rideDetails")}
                  </span>
                  <motion.span
                    className="text-xs text-primary cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {t("view")}
                  </motion.span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Car className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-sm">{t("comfort")}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("comfortDesc")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.p
                      className="font-semibold"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {t("priceRange")}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom safe area */}
            <div className="h-6" />
          </div>
        </div>

        {/* Floating elements with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="absolute -left-16 top-1/4 hidden lg:block"
        >
          <motion.div
            className="bg-card rounded-2xl p-3 shadow-xl border border-border"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Navigation className="w-4 h-4 text-primary" />
              </motion.div>
              <div>
                <p className="text-xs text-muted-foreground">{t("eta")}</p>
                <p className="text-sm font-semibold">{t("etaValue")}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
          className="absolute -right-12 bottom-1/3 hidden lg:block"
        >
          <motion.div
            className="bg-card rounded-2xl p-3 shadow-xl border border-border"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <motion.span
                className="text-lg"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.span>
              <div>
                <p className="text-sm font-bold">4.9</p>
                <p className="text-xs text-muted-foreground">{t("rating")}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
