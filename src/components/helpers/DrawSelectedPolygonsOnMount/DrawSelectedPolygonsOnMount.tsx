import { circle, geoJSON } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { isCircle, isPolygon, TSelectedArea } from "../../../utils/types";

export function DrawSelectedPolygonsOnMount({
  selectedArea,
}: {
  selectedArea: TSelectedArea | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (!selectedArea) {
      return;
    }

    if (isCircle(selectedArea) || isPolygon(selectedArea)) {
      selectedArea.addTo(map);
    }

    // if (selectedArea) {
    //   if (selectedArea.type === "Feature") {
    //     console.log("selectedArea type", selectedArea.geometry.type);
    //     if (isPolygon(selectedArea)) {
    //       const polygon = geoJSON(selectedArea);
    //       polygon.addTo(map);
    //     } else if (selectedArea.geometry.type === "Point") {
    //       const [lng, lat] = selectedArea.geometry.coordinates;

    //       const circleShape = circle([lat, lng], {
    //         radius: 100, // Set your desired radius here in meters
    //         color: "blue",
    //       });

    //       circleShape.addTo(map);
    //     }
    //   }
    // }
  }, []);
  return null;
}
