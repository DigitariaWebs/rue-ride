"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Map, { Marker, Source, Layer, NavigationControl, type ViewStateChangeEvent, type MapRef, type LayerProps } from "react-map-gl/mapbox";
import { motion } from "framer-motion";
import { useMapbox } from "./MapboxProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Loader2, Navigation, MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

// Paris center coordinates
const PARIS_CENTER = { latitude: 48.8566, longitude: 2.3522 };

// Paris / Île-de-France bounds (limits map to this area)
const PARIS_BOUNDS: [[number, number], [number, number]] = [
  [1.4, 48.1], // Southwest coordinates [lng, lat]
  [3.6, 49.3], // Northeast coordinates [lng, lat]
];

interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteInfo {
  distance: string;
  duration: string;
  distanceValue: number;
  durationValue: number;
}

interface DirectionsRoute {
  geometry: {
    coordinates: [number, number][];
  };
  distance: number;
  duration: number;
}

interface DirectionsResponse {
  routes: DirectionsRoute[];
}

interface MapboxRouteMapProps {
  pickupLocation: Coordinates | null;
  dropoffLocation: Coordinates | null;
  onRouteCalculated?: (routeInfo: RouteInfo) => void;
}

const routeLayerStyle: LayerProps = {
  id: "route",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#22c55e",
    "line-width": 6,
    "line-opacity": 0.85,
  },
};

const routeOutlineStyle: LayerProps = {
  id: "route-outline",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#16a34a",
    "line-width": 10,
    "line-opacity": 0.3,
  },
};

// Map styles for light and dark modes
const MAP_STYLES = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
};

export function MapboxRouteMap({
  pickupLocation,
  dropoffLocation,
  onRouteCalculated,
}: MapboxRouteMapProps) {
  const { accessToken } = useMapbox();
  const { theme } = useTheme();
  const mapRef = useRef<MapRef>(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState<GeoJSON.Feature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewState, setViewState] = useState({
    ...PARIS_CENTER,
    zoom: 11,
  });

  // Fetch route from Mapbox Directions API
  useEffect(() => {
    if (!accessToken || !pickupLocation || !dropoffLocation) {
      setRouteGeoJSON(null);
      return;
    }

    const fetchRoute = async () => {
      try {
        const coordinates = `${pickupLocation.lng},${pickupLocation.lat};${dropoffLocation.lng},${dropoffLocation.lat}`;
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&overview=full&access_token=${accessToken}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Directions request failed");

        const data: DirectionsResponse = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];

          // Create GeoJSON for the route
          const geojson: GeoJSON.Feature = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route.geometry.coordinates,
            },
          };
          setRouteGeoJSON(geojson);

          // Calculate distance and duration
          const distanceKm = route.distance / 1000;
          const durationMin = route.duration / 60;

          onRouteCalculated?.({
            distance: `${distanceKm.toFixed(1)} km`,
            duration: `${Math.round(durationMin)} min`,
            distanceValue: distanceKm,
            durationValue: durationMin,
          });
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        setRouteGeoJSON(null);
      }
    };

    void fetchRoute();
  }, [accessToken, pickupLocation, dropoffLocation, onRouteCalculated]);

  // Fit bounds when locations change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (pickupLocation && dropoffLocation) {
      const bounds: [[number, number], [number, number]] = [
        [
          Math.min(pickupLocation.lng, dropoffLocation.lng),
          Math.min(pickupLocation.lat, dropoffLocation.lat),
        ],
        [
          Math.max(pickupLocation.lng, dropoffLocation.lng),
          Math.max(pickupLocation.lat, dropoffLocation.lat),
        ],
      ];

      map.fitBounds(bounds, {
        padding: { top: 100, bottom: 100, left: 100, right: 100 },
        duration: 1200,
        maxZoom: 15,
      });
    } else if (pickupLocation) {
      map.flyTo({
        center: [pickupLocation.lng, pickupLocation.lat],
        zoom: 14,
        duration: 1200,
      });
    } else if (dropoffLocation) {
      map.flyTo({
        center: [dropoffLocation.lng, dropoffLocation.lat],
        zoom: 14,
        duration: 1200,
      });
    }
  }, [pickupLocation, dropoffLocation]);

  const onMapLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (!accessToken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-3xl">
        <p className="text-destructive">Mapbox token not configured</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative group"
    >
      {/* Loading overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 flex flex-col items-center justify-center bg-muted z-10 ${
          isLoading ? "" : "pointer-events-none"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-primary" />
        </motion.div>
        <p className="mt-3 text-sm text-muted-foreground">Loading map...</p>
      </motion.div>

      {/* Paris region label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 10 : 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center gap-2"
      >
        <MapPin className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium">Paris & Île-de-France</span>
      </motion.div>

      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        onLoad={onMapLoad}
        mapboxAccessToken={accessToken}
        mapStyle={MAP_STYLES[theme]}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        maxBounds={PARIS_BOUNDS}
        minZoom={9}
        maxZoom={18}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {/* Route line with glow effect */}
        {routeGeoJSON && (
          <>
            <Source id="route-outline" type="geojson" data={routeGeoJSON}>
              <Layer {...routeOutlineStyle} />
            </Source>
            <Source id="route" type="geojson" data={routeGeoJSON}>
              <Layer {...routeLayerStyle} />
            </Source>
          </>
        )}

        {/* Pickup Marker */}
        {pickupLocation && (
          <Marker
            longitude={pickupLocation.lng}
            latitude={pickupLocation.lat}
            anchor="center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative"
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 w-10 h-10 -m-2 rounded-full bg-primary/30"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Main marker */}
              <div className="w-6 h-6 rounded-full bg-primary border-[3px] border-white shadow-xl flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </motion.div>
          </Marker>
        )}

        {/* Dropoff Marker */}
        {dropoffLocation && (
          <Marker
            longitude={dropoffLocation.lng}
            latitude={dropoffLocation.lat}
            anchor="bottom"
          >
            <motion.div
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-full bg-destructive border-[3px] border-white shadow-xl flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-white fill-white" />
                </div>
                {/* Pin tip */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-destructive" />
              </motion.div>
            </motion.div>
          </Marker>
        )}
      </Map>

      {/* Empty state overlay when no locations */}
      {!pickupLocation && !dropoffLocation && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px] z-5"
        >
          <motion.div
            className="text-center p-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MapPin className="w-12 h-12 mx-auto mb-3 text-primary/50" />
            <p className="text-muted-foreground text-sm">
              Enter locations to see the route
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
