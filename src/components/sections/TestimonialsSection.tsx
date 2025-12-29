"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

function TestimonialCard({
  index,
  quote,
  name,
  location,
}: {
  index: number;
  quote: string;
  name: string;
  location: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rX = (e.clientY - centerY) / 20;
    const rY = (centerX - e.clientX) / 20;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseEnter = () => {
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="perspective-1000"
    >
      <Card className="relative p-6 md:p-5 lg:p-6 xl:p-6 h-full border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl transition-all duration-300 group overflow-hidden">
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          whileHover={{ translateX: "200%" }}
          transition={{ duration: 0.7 }}
        />

        {/* Stars with staggered animation */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star, starIndex) => (
            <motion.div
              key={star}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3 + index * 0.15 + starIndex * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            >
              <Star className="w-4 h-4 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>

        {/* Animated quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4 + index * 0.1,
            type: "spring",
            stiffness: 200,
          }}
          className="mb-3"
        >
          <Quote className="w-6 h-6 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" />
        </motion.div>

        {/* Quote text with character animation would be too heavy, use simpler approach */}
        <motion.p
          className="text-muted-foreground mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
        >
          &ldquo;{quote}&rdquo;
        </motion.p>

        {/* Author info with slide animation */}
        <motion.div
          className="flex items-center gap-3 pt-4 border-t border-border"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {name.charAt(0)}
          </motion.div>
          <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
        </motion.div>

        {/* Decorative corner gradient */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 blur-2xl" />
      </Card>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-20 md:py-24 lg:py-26 xl:py-28 relative overflow-hidden">
      {/* Background with animation */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/30 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Floating decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl"
            style={{
              left: `${i * 30}%`,
              top: `${20 + (i % 2) * 50}%`,
            }}
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
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
            <motion.span
              className="text-primary font-medium"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t("badge")}
            </motion.span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-4.5xl xl:text-5xl font-bold mb-4"
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 lg:gap-6 xl:gap-6">
          {[1, 2, 3].map((testimonial, index) => (
            <TestimonialCard
              key={testimonial}
              index={index}
              quote={t(`review${testimonial}.quote`)}
              name={t(`review${testimonial}.name`)}
              location={t(`review${testimonial}.location`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
