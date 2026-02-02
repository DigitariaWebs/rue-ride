"use client";

import { useTranslations } from "next-intl";
import { Facebook, Twitter, Instagram, Linkedin, MapPin } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

export function Footer() {
  const t = useTranslations("footer");
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: t("rides"), href: "#" },
      { label: t("ridesPlus"), href: "#" },
      { label: t("business"), href: "#" },
      { label: t("delivery"), href: "#" },
    ],
    company: [
      { label: t("aboutUs"), href: "#" },
      { label: t("careers"), href: "#" },
      { label: t("press"), href: "#" },
      { label: t("blog"), href: "#" },
    ],
    support: [
      { label: t("helpCenter"), href: "#" },
      { label: t("safety"), href: "#" },
      { label: t("terms"), href: "#" },
      { label: t("privacy"), href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 md:py-18 lg:py-20 xl:py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12 xl:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <Image
                src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                alt="VTC Ride"
                width={180}
                height={64}
                className="h-16 w-auto"
              />
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-4">{t("tagline")}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t("location")}</span>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-muted-foreground">
              {t("services")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-muted-foreground">
              {t("company")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Support */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-muted-foreground">
              {t("social")}
            </h4>
            <div className="flex gap-2 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>

            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-muted-foreground">
              {t("support")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.slice(0, 2).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 md:py-5 lg:py-6 xl:py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t("copyright", { year: currentYear })}</p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("privacy")}
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
