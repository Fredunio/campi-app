import { Geolocation, Position } from "@capacitor/geolocation";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { EditControl } from "react-leaflet-draw";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { arrowBackOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { mapTileProvider } from "../../../lib/map";
import InvalidateMapSize from "../../helpers/InvalidateMapSize/InvalidateMapSize";
import { LatLng, Layer } from "leaflet";
import * as turf from "@turf/turf";

// For accessing the _leaflet_id internal property
declare module "leaflet" {
  interface Layer {
    _leaflet_id: number; // Assuming it's a number, adjust if needed
  }
}

function isShape(layerOptions: Layer["options"]) {
  return (
    Object.keys(layerOptions).includes("stroke") &&
    Object.keys(layerOptions).includes("fill") &&
    Object.keys(layerOptions).includes("fillColor")
  );
}

const defaultPosition: Position = {
  coords: {
    latitude: 52.237049,
    longitude: 21.017532,
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  },
  timestamp: 0,
};

// TODO: add area size limit, e.g. 1000000m2
// TODO: show selcted areas after re-opening the modal
export default function SelectLocationModal({
  modalId,
  onDismiss,
  onConfirm,
}: {
  modalId: string;
  onDismiss: () => void;
  onConfirm: (
    selectedArea: typeof turf.geojsonType | null,
    selectedPosition: LatLng | null
  ) => void;
}) {
  const modal = useRef<HTMLIonModalElement>(null);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(
    defaultPosition
  );

  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [selectedArea, setSelectedArea] = useState<
    typeof turf.geojsonType | null
  >(null);

  const [areaSize, setAreaSize] = useState<number | null>(null);
  const [areaSizeError, setAreaSizeError] = useState<boolean | string>(false);

  const [blockSelectPosition, setBlockSelectPosition] = useState(false);

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      onConfirm(ev.detail.data.selectedArea, ev.detail.data.selectedPosition);
    }
    console.log("onWillDismiss ev", ev);
    // onDismiss();
  }

  function LocationMarker() {
    const mapEv = useMapEvents({
      click(e) {
        console.log("click start");
        if (blockSelectPosition) {
          return;
        }

        if (selectedArea) {
          setSelectedArea(null);
          mapEv.eachLayer((layer) => {
            if (isShape(layer.options)) {
              mapEv.removeLayer(layer);
            }
          });
        }
        const coords = e.latlng;
        setSelectedPosition(e.latlng);
        console.log("e.latlng: ", e.latlng);
        console.log("click end");
      },
    });
    return selectedPosition ? (
      <Marker position={selectedPosition}></Marker>
    ) : null;
  }

  function RemovePreviousPolygons() {
    const map = useMap();
    // delete the previous selected area on created
    map.on("draw:created", (e) => {
      if (selectedPosition) {
        setSelectedPosition(null);
      }
      map.eachLayer((layer) => {
        if (
          isShape(layer.options) &&
          layer._leaflet_id !== e.layer._leaflet_id
        ) {
          map.removeLayer(layer);
        }
      });
    });
    return null;
  }

  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then((position) => {
        setCurrentPosition(position);
      })
      .catch((error) => {
        console.error("Error getting position", error);
      });
  }, []);

  return (
    <IonModal
      ref={modal}
      trigger={modalId}
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              onClick={() => {
                modal.current?.dismiss(
                  {
                    selectedArea,
                    selectedPosition,
                  },
                  "confirm"
                );
              }}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <MapContainer
          center={[
            currentPosition?.coords.latitude || defaultPosition.coords.latitude,
            currentPosition?.coords.longitude ||
              defaultPosition.coords.longitude,
          ]}
          zoom={currentPosition ? 13 : 16}
          markerZoomAnimation={true}
          scrollWheelZoom={true}
          className="h-full"
        >
          <TileLayer
            attribution={mapTileProvider.attribution}
            url={mapTileProvider.url}
          />
          <InvalidateMapSize />
          <FeatureGroup>
            <EditControl
              onDrawStart={(e) => {
                setSelectedPosition(null);
                setBlockSelectPosition(true);
                setSelectedArea(null);
              }}
              position="topright"
              onDeleted={(e) => {
                // Handle area deletion (polygon, circle)

                setSelectedArea(null);
                setBlockSelectPosition(false);
              }}
              onEdited={(e) => {
                // Handle area edition (polygon, circle)
                setSelectedArea(e.layers.toGeoJSON());
              }}
              onCreated={(e) => {
                // Handle area selection (polygon, circle)
                const area = e.layer.toGeoJSON();
                let areaSize = 0;
                // calculate area size
                if (e.layerType === "circle") {
                  const radius = e.layer.getRadius();
                  areaSize = Math.PI * radius * radius;
                  console.log("circle area", areaSize);
                } else if (e.layerType === "polygon") {
                  areaSize = turf.area(e.layer.toGeoJSON());
                  console.log("polygon area", areaSize);
                }

                setSelectedArea(area);
                console.log("area", area);

                // Has to set timeout, because when last vertex of polygon is clicked,
                //  after created event is triggered, the click event is triggered also, and it cancels the selected area
                setTimeout(() => {
                  setBlockSelectPosition(false);
                }, 100);
              }}
              draw={{
                polygon: true,
                circle: true,
                // rectangle has a bug
                rectangle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}
            />
          </FeatureGroup>
          <LocationMarker />
          <RemovePreviousPolygons />
        </MapContainer>
      </IonContent>
    </IonModal>
  );
}
