"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Loader2, X } from "lucide-react";
import { useMapbox } from "./MapboxProvider";
import { cn } from "@/lib/utils";

interface MapboxFeature {
  id: string;
  place_name: string;
  text: string;
  center: [number, number]; // [lng, lat]
  context?: Array<{
    id: string;
    text: string;
  }>;
}

interface GeocoderResponse {
  features: MapboxFeature[];
}

export interface PlaceResult {
  address: string;
  coordinates: { lat: number; lng: number };
}

interface GeocoderInputProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: PlaceResult) => void;
  placeholder: string;
  type: "pickup" | "dropoff";
  className?: string;
}

// Paris / Île-de-France bounding box for search
const PARIS_BBOX = "1.4,48.1,3.6,49.3"; // minLng,minLat,maxLng,maxLat

export function GeocoderInput({
  value,
  onChange,
  onPlaceSelect,
  placeholder,
  type,
  className,
}: GeocoderInputProps) {
  const { accessToken } = useMapbox();
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions from Mapbox Geocoding API - limited to Paris region
  useEffect(() => {
    if (!accessToken || value.length < 3) {
      setSuggestions([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const encodedQuery = encodeURIComponent(value);
        // Limit search to Paris/Île-de-France using bbox and proximity
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${accessToken}&country=fr&bbox=${PARIS_BBOX}&proximity=2.3522,48.8566&types=address,poi,place,locality&limit=5&language=fr`;

        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error("Geocoding failed");
        }

        const data: GeocoderResponse = await response.json();
        setSuggestions(data.features);
        setIsOpen(data.features.length > 0);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Geocoding error:", error);
        }
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [value, accessToken]);

  const handleSelect = (feature: MapboxFeature) => {
    onChange(feature.place_name);
    onPlaceSelect({
      address: feature.place_name,
      coordinates: {
        lng: feature.center[0],
        lat: feature.center[1],
      },
    });
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleClear = () => {
    onChange("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Extract secondary text from context
  const getSecondaryText = (feature: MapboxFeature): string => {
    if (feature.context && feature.context.length > 0) {
      return feature.context.map((c) => c.text).join(", ");
    }
    // Fallback: extract from place_name after the main text
    const parts = feature.place_name.split(", ");
    return parts.slice(1).join(", ");
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <motion.div
        className="relative"
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          {type === "pickup" ? (
            <motion.div
              className="w-3 h-3 rounded-full bg-primary"
              animate={isFocused ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <Navigation className="w-4 h-4 text-destructive fill-destructive" />
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (suggestions.length > 0) setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "flex h-14 w-full rounded-xl border border-input bg-background pl-12 pr-12 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            isFocused && "border-primary/50 shadow-lg shadow-primary/5"
          )}
        />

        {/* Loading / Clear button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
              </motion.div>
            ) : value ? (
              <motion.button
                key="clear"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClear}
                className="p-1.5 rounded-full hover:bg-muted transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute left-0 right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {suggestions.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(feature)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-primary/5 transition-colors group",
                  index !== suggestions.length - 1 && "border-b border-border"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary mt-0.5 shrink-0 transition-colors" />
                </motion.div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {feature.text}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {getSecondaryText(feature)}
                  </p>
                </div>
              </motion.button>
            ))}

            {/* Paris region indicator */}
            <div className="px-4 py-2 bg-muted/50 border-t border-border">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                Paris & Île-de-France only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
