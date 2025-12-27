"use client";

import { createContext, useContext, type ReactNode } from "react";

interface MapboxContextValue {
  accessToken: string;
}

const MapboxContext = createContext<MapboxContextValue>({
  accessToken: "",
});

export function useMapbox() {
  return useContext(MapboxContext);
}

interface MapboxProviderProps {
  children: ReactNode;
  accessToken: string;
}

export function MapboxProvider({ children, accessToken }: MapboxProviderProps) {
  return (
    <MapboxContext.Provider value={{ accessToken }}>
      {children}
    </MapboxContext.Provider>
  );
}
