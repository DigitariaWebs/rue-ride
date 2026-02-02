"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  number: string;
  title: string;
  description: string;
  align?: "left" | "right";
  className?: string;
}

export function BentoCard({
  number,
  title,
  description,
  align = "left",
  className,
}: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "right" && "items-end text-right")}>
        {/* Number Badge */}
        <span className="text-primary font-semibold text-lg">{number}</span>

        {/* Title */}
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Decorative gradient */}
      <div
        className={cn(
          "absolute w-24 h-24 rounded-full bg-primary/5 blur-2xl -z-10",
          align === "left" ? "-top-4 -left-4" : "-top-4 -right-4",
        )}
      />
    </motion.div>
  );
}
