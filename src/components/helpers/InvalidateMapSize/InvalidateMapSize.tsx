import { useEffect } from "react";
import { useMap } from "react-leaflet";

// This component is used to invalidate the map, so when map is displayed in a mobile size, the tiles load correctly

export default function InvalidateMapSize() {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
      console.log("Map size invalidated");
    }, 0);
    return () => clearTimeout(timeout);
  }, [map]);

  return null;
}
