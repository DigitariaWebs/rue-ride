"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpDown,
  Euro,
  Clock,
  Route,
  ArrowRight,
  ArrowLeft,
  Car,
  Zap,
  Users,
  Sparkles,
  MapPin,
  Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MapboxProvider } from "@/components/calculator/MapboxProvider";
import {
  GeocoderInput,
  type PlaceResult,
} from "@/components/calculator/GeocoderInput";
import { MapboxRouteMap } from "@/components/calculator/MapboxRouteMap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

interface Location {
  address: string;
  coordinates: { lat: number; lng: number } | null;
}

interface RouteInfo {
  distance: string;
  duration: string;
  distanceValue: number;
  durationValue: number;
}

interface RideOption {
  id: string;
  name: string;
  icon: typeof Car;
  multiplier: number;
  description: string;
  eta: string;
  color: string;
}

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

// Base fare calculation (Paris pricing)
const BASE_FARE = 2.6;
const PER_KM_RATE = 1.05;
const PER_MIN_RATE = 0.35;
const MINIMUM_FARE = 7.0;

function calculateFare(
  distanceKm: number,
  durationMin: number,
  multiplier: number = 1,
): number {
  const fare =
    BASE_FARE + distanceKm * PER_KM_RATE + durationMin * PER_MIN_RATE;
  return Math.max(fare * multiplier, MINIMUM_FARE);
}

function CalculatorContent() {
  const t = useTranslations("calculatorPage");
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const [pickup, setPickup] = useState<Location>({
    address: "",
    coordinates: null,
  });
  const [dropoff, setDropoff] = useState<Location>({
    address: "",
    coordinates: null,
  });
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [selectedRide, setSelectedRide] = useState<string>("standard");
  const [showInputs, setShowInputs] = useState(false);
  const [showRideOptions, setShowRideOptions] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const rideOptions: RideOption[] = [
    {
      id: "standard",
      name: t("rides.standard"),
      icon: Car,
      multiplier: 1,
      description: t("rides.standardDesc"),
      eta: "3-5 min",
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      id: "plus",
      name: t("rides.plus"),
      icon: Sparkles,
      multiplier: 1.5,
      description: t("rides.plusDesc"),
      eta: "5-8 min",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      id: "xl",
      name: t("rides.xl"),
      icon: Users,
      multiplier: 1.8,
      description: t("rides.xlDesc"),
      eta: "6-10 min",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      id: "electric",
      name: t("rides.electric"),
      icon: Zap,
      multiplier: 1.2,
      description: t("rides.electricDesc"),
      eta: "4-7 min",
      color: "bg-blue-500/10 text-blue-500",
    },
  ];

  const handleSwap = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  const handlePickupSelect = (place: PlaceResult) => {
    setPickup({
      address: place.address,
      coordinates: place.coordinates,
    });
  };

  const handleRideSelect = (rideId: string) => {
    setSelectedRide(rideId);
    setShowRideOptions(false);
  };

  const handleDropoffSelect = (place: PlaceResult) => {
    setDropoff({
      address: place.address,
      coordinates: place.coordinates,
    });
  };

  const handleRouteCalculated = useCallback((info: RouteInfo) => {
    setRouteInfo(info);
  }, []);

  const selectedOption = rideOptions.find((opt) => opt.id === selectedRide);
  const estimatedFare = routeInfo
    ? calculateFare(
        routeInfo.distanceValue,
        routeInfo.durationValue,
        selectedOption?.multiplier,
      )
    : null;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background relative overflow-hidden text-sm md:text-base"
    >
      {/* Background decorations like landing page */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${20 + i * 20}%`,
              top: `${15 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-6 xl:gap-6">
        {/* Left Panel - Calculator Form */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-card/90 backdrop-blur-sm text-xs sm:text-sm md:text-base lg:text-base xl:text-base md:static md:bg-transparent md:backdrop-blur-none md:text-base md:transform-none md:translate-x-0 md:w-1/2 xl:w-1/3 md:max-h-screen md:overflow-y-scroll space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-4 p-1 md:p-2 lg:p-3 xl:p-3">
          {/* Mini Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <motion.div
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{t("backHome")}</span>
                </motion.div>
              </Link>
              <div className="h-4 w-px bg-border" />
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Image
                    src={
                      theme === "dark" ? "/logo-dark.png" : "/logo-light.png"
                    }
                    alt="VTC Ride"
                    width={100}
                    height={35}
                    className="h-6 w-auto"
                    priority
                  />
                </motion.div>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium text-xs sm:text-sm">
                {t("title")}
              </span>
              <button
                onClick={() => setShowInputs(!showInputs)}
                className="md:hidden p-1 rounded hover:bg-muted transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Location Inputs Card */}
          <AnimatePresence mode="wait">
            {(showInputs || isDesktop) && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-2 md:p-3 lg:p-4 xl:p-5 shadow-xl border-border/50 bg-card/80 backdrop-blur-sm">
                  <motion.h2
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-semibold mb-4 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Route className="w-5 h-5 text-primary" />
                    {t("whereToGo")}
                  </motion.h2>

                  <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                    {/* Pickup */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="text-xs sm:text-sm text-muted-foreground mb-1 block font-medium">
                        {t("pickup")}
                      </label>
                      <GeocoderInput
                        value={pickup.address}
                        onChange={(value) =>
                          setPickup({
                            ...pickup,
                            address: value,
                            coordinates: null,
                          })
                        }
                        onPlaceSelect={handlePickupSelect}
                        placeholder={t("pickupPlaceholder")}
                        type="pickup"
                      />
                    </motion.div>

                    {/* Swap Button */}
                    <motion.div
                      className="flex justify-center relative z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.button
                        onClick={handleSwap}
                        className="w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all group"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ArrowUpDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.button>
                    </motion.div>

                    {/* Dropoff */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="text-xs sm:text-sm text-muted-foreground mb-1 block font-medium">
                        {t("dropoff")}
                      </label>
                      <GeocoderInput
                        value={dropoff.address}
                        onChange={(value) =>
                          setDropoff({
                            ...dropoff,
                            address: value,
                            coordinates: null,
                          })
                        }
                        onPlaceSelect={handleDropoffSelect}
                        placeholder={t("dropoffPlaceholder")}
                        type="dropoff"
                      />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Route Info */}
          <AnimatePresence mode="wait">
            {routeInfo && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card className="p-2 md:p-3 lg:p-4 xl:p-4 shadow-lg border-primary/20 bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Route className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {t("distance")}
                        </p>
                        <motion.p
                          className="font-bold text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {routeInfo.distance}
                        </motion.p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <motion.div
                        className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("duration")}
                        </p>
                        <motion.p
                          className="font-bold text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25 }}
                        >
                          {routeInfo.duration}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ride Options - Desktop only */}
          <AnimatePresence mode="wait">
            {routeInfo && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="hidden md:block"
              >
                <Card className="p-4 md:p-4 lg:p-5 xl:p-5 shadow-xl border-border/50 bg-card/80 backdrop-blur-sm">
                  <h3 className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-semibold mb-3 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    {t("chooseRide")}
                  </h3>
                  <div className="space-y-3">
                    {rideOptions.map((option, index) => {
                      const Icon = option.icon;
                      const fare = calculateFare(
                        routeInfo.distanceValue,
                        routeInfo.durationValue,
                        option.multiplier,
                      );
                      const isSelected = selectedRide === option.id;

                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => setSelectedRide(option.id)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + index * 0.08 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                              : "border-transparent bg-muted/50 hover:bg-muted hover:border-border",
                          )}
                        >
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                            whileHover={{ translateX: "200%" }}
                            transition={{ duration: 0.6 }}
                          />

                          <motion.div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                              isSelected ? option.color : "bg-muted",
                            )}
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.4 }}
                          >
                            <Icon
                              className={cn(
                                "w-5 h-5 transition-colors duration-300",
                                isSelected ? "" : "text-muted-foreground",
                              )}
                            />
                          </motion.div>
                          <div className="flex-1 text-left relative z-10">
                            <div className="flex items-center justify-between">
                              <p
                                className={cn(
                                  "font-semibold",
                                  isSelected && "text-primary",
                                )}
                              >
                                {option.name}
                              </p>
                              <motion.p
                                className="font-bold text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl"
                                animate={
                                  isSelected ? { scale: [1, 1.05, 1] } : {}
                                }
                                transition={{ duration: 0.3 }}
                              >
                                €{fare.toFixed(2)}
                              </motion.p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm sm:text-base text-muted-foreground">
                                {option.description}
                              </p>
                              <p className="text-sm sm:text-base text-muted-foreground">
                                {option.eta}
                              </p>
                            </div>
                          </div>

                          {/* Selection indicator */}
                          {isSelected && (
                            <motion.div
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                              }}
                            >
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Book Button - Desktop */}
          <AnimatePresence mode="wait">
            {estimatedFare && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="hidden md:block"
              >
                <Card className="p-4 md:p-4 lg:p-5 xl:p-5 shadow-2xl border-0 bg-foreground text-background relative overflow-hidden">
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-background/70 text-sm sm:text-base">
                        {t("estimatedFare")}
                      </span>
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Euro className="w-4 h-4" />
                        <motion.span
                          className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-bold"
                          key={estimatedFare}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {estimatedFare.toFixed(2)}
                        </motion.span>
                      </motion.div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group h-9 text-xs sm:text-sm rounded-lg relative overflow-hidden"
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative flex items-center gap-2">
                        {t("bookNow")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                    <p className="text-sm sm:text-base text-background/50 text-center mt-2">
                      {t("priceNote")}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ride Options and Book Button at Bottom on Mobile */}
        <div className="fixed bottom-0 left-0 right-0 z-20 md:hidden p-1">
          {/* Ride Options */}
          <AnimatePresence mode="wait">
            {routeInfo && showRideOptions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="mb-2"
              >
                <Card className="p-1.5 shadow-xl border-border/50 bg-card/90 backdrop-blur-sm">
                  <h3 className="text-xs sm:text-sm font-semibold mb-1.5 flex items-center gap-1">
                    <Car className="w-3 h-3 text-primary" />
                    {t("chooseRide")}
                  </h3>
                  <div className="grid grid-cols-1 gap-1">
                    {rideOptions.map((option, index) => {
                      const Icon = option.icon;
                      const fare = calculateFare(
                        routeInfo.distanceValue,
                        routeInfo.durationValue,
                        option.multiplier,
                      );
                      const isSelected = selectedRide === option.id;

                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => handleRideSelect(option.id)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 + index * 0.05 }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={cn(
                            "w-full flex items-center gap-1.5 p-1.5 rounded-lg border transition-all duration-200 relative overflow-hidden",
                            isSelected
                              ? "border-primary bg-primary/10 shadow-sm"
                              : "border-transparent bg-muted/30 hover:bg-muted/50",
                          )}
                        >
                          <motion.div
                            className={cn(
                              "w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-200",
                              isSelected ? option.color : "bg-muted",
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-2.5 h-2.5 transition-colors duration-200",
                                isSelected ? "" : "text-muted-foreground",
                              )}
                            />
                          </motion.div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <p
                                className={cn(
                                  "text-xs sm:text-sm font-medium",
                                  isSelected && "text-primary",
                                )}
                              >
                                {option.name}
                              </p>
                              <p className="text-xs sm:text-sm font-bold">
                                €{fare.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {option.description}
                              </p>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {option.eta}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            )}
            {routeInfo && !showRideOptions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="mb-2"
              >
                <Card className="p-1.5 shadow-xl border-border/50 bg-card/90 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="w-3 h-3 text-primary" />
                      <span className="text-sm sm:text-base font-medium">
                        {selectedOption?.name}
                      </span>
                    </div>
                    <Button
                      onClick={() => setShowRideOptions(true)}
                      size="sm"
                      variant="outline"
                      className="text-xs sm:text-sm"
                    >
                      {t("change")}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Book Button */}
          <AnimatePresence mode="wait">
            {estimatedFare && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                <Card className="p-1.5 shadow-2xl border-0 bg-foreground text-background relative overflow-hidden">
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-background/70 text-xs sm:text-sm">
                        {t("estimatedFare")}
                      </span>
                      <motion.div
                        className="flex items-center gap-1"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Euro className="w-3 h-3" />
                        <motion.span
                          className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-bold"
                          key={estimatedFare}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {estimatedFare.toFixed(2)}
                        </motion.span>
                      </motion.div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group h-7 text-xs sm:text-sm rounded-lg relative overflow-hidden"
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative flex items-center gap-1">
                        {t("bookNow")}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                    <p className="text-xs sm:text-sm text-background/50 text-center mt-1">
                      {t("priceNote")}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="fixed inset-0 md:relative md:inset-auto md:flex-1 md:h-auto overflow-hidden shadow-2xl border-0 md:border border-border/50 z-0"
        >
          <div className="h-full">
            <MapboxRouteMap
              pickupLocation={pickup.coordinates}
              dropoffLocation={dropoff.coordinates}
              onRouteCalculated={handleRouteCalculated}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  if (!MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 max-w-sm text-center shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
            <motion.div
              className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-6 h-6 text-primary" />
            </motion.div>
            <h2 className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-semibold mb-2">
              Configuration Required
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3">
              Please add your Mapbox access token to the environment variables.
            </p>
            <code className="block bg-muted p-3 rounded-xl text-xs sm:text-sm font-mono">
              NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token
            </code>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3">
              Get your token at{" "}
              <a
                href="https://account.mapbox.com/access-tokens/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <MapboxProvider accessToken={MAPBOX_ACCESS_TOKEN}>
      <CalculatorContent />
    </MapboxProvider>
  );
}
