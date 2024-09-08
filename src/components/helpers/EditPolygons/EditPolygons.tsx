import { useMap } from "react-leaflet";

// layer.options:
// Object { stroke: true, color: "#3388ff", weight: 4, opacity: 0.5, fill: true, fillColor: null, fillOpacity: 0.2, clickable: true }

function isShape(layerOptions: any) {
  return (
    Object.keys(layerOptions).includes("stroke") &&
    Object.keys(layerOptions).includes("fill") &&
    Object.keys(layerOptions).includes("fillColor")
  );
}

export default function EditPolygons() {
  const map = useMap();
  map.eachLayer((layer) => {
    const layerOptions = layer.options;
    console.log("layer: ", layer.options);
    const isPolygon = isShape(layerOptions);
  });
  return null;
}
