"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Car,
  Users,
  Accessibility,
  Package,
  UtensilsCrossed,
  PawPrint,
} from "lucide-react";
import { useRef } from "react";

const services = [
  {
    key: "rides",
    icon: Car,
    color: "bg-emerald-500/10 text-emerald-500",
    hoverColor: "group-hover:bg-emerald-500/20",
  },
  {
    key: "ridesPlus",
    icon: Users,
    color: "bg-amber-500/10 text-amber-500",
    hoverColor: "group-hover:bg-amber-500/20",
  },
  {
    key: "ebike",
    icon: Accessibility,
    color: "bg-blue-500/10 text-blue-500",
    hoverColor: "group-hover:bg-blue-500/20",
  },
  {
    key: "cityToCity",
    icon: UtensilsCrossed,
    color: "bg-purple-500/10 text-purple-500",
    hoverColor: "group-hover:bg-purple-500/20",
  },
  {
    key: "send",
    icon: Package,
    color: "bg-rose-500/10 text-rose-500",
    hoverColor: "group-hover:bg-rose-500/20",
  },
  {
    key: "food",
    icon: PawPrint,
    color: "bg-orange-500/10 text-orange-500",
    hoverColor: "group-hover:bg-orange-500/20",
  },
];

function MagneticCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) * 0.1;
    const moveY = (e.clientY - centerY) * 0.1;
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ExploreSection() {
  const t = useTranslations("explore");
  const tServices = useTranslations("services");

  return (
    <section className="py-20 md:py-24 lg:py-26 xl:py-28 relative overflow-hidden">
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
          className="text-center mb-16 md:mb-14 lg:mb-16 xl:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm mb-6"
            whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
          >
            <span className="text-primary font-medium">{t("badge")}</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-4.5xl xl:text-5xl font-bold mb-4"
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <MagneticCard>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group relative p-8 md:p-6 lg:p-8 xl:p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer h-full"
                  >
                    {/* Icon with animations */}
                    <motion.div
                      className={`w-14 h-14 rounded-2xl ${service.color} ${service.hoverColor} flex items-center justify-center mb-4 transition-colors duration-300`}
                      whileHover={{
                        rotate: [0, -10, 10, -5, 5, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>
                    </motion.div>

                    {/* Label */}
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                      {tServices(`${service.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {tServices(`${service.key}.description`)}
                    </p>

                    {/* Hover gradient */}
                    <motion.div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl overflow-hidden"
                      initial={false}
                    >
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                        whileHover={{
                          translateX: "200%",
                          transition: { duration: 0.6, ease: "easeInOut" },
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </MagneticCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
