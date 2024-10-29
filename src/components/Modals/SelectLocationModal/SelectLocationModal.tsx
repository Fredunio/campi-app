import { Position } from "@capacitor/geolocation";
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
import { useRef, useState } from "react";
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
import { Circle, DrawEvents, LatLng, Layer, Polygon } from "leaflet";
import { defaultPosition } from "../../../lib/variables";
import { area, centroid } from "@turf/turf";
import { DrawSelectedPolygonsOnMount } from "../../helpers/DrawSelectedPolygonsOnMount/DrawSelectedPolygonsOnMount";
import { isCircle, isPolygon, TSelectedArea } from "../../../utils/types";

// For accessing the _leaflet_id internal property
declare module "leaflet" {
  interface Layer {
    _leaflet_id: number;
    _latlng: LatLng;
    _mRadius: number;
  }
}

function isShape(layerOptions: Layer["options"]) {
  return (
    Object.keys(layerOptions).includes("stroke") &&
    Object.keys(layerOptions).includes("fill") &&
    Object.keys(layerOptions).includes("fillColor")
  );
}

// TODO: add area size limit, e.g. 1000000m2
// TODO: show selcted areas after re-opening the modal
// FIXME: fix the bug when drawing circle, it creates a marker in the center
// FIXME: fix the bug when creating a marker, the previous selected position marker is not removed
// MAYBE: add search bar for location search map
export default function SelectLocationModal({
  modalId,
  currentPosition,
  selectedPosition,
  selectedArea,
  setSelectedArea,
  setSelectedPosition,
  onDismiss,
  onConfirm,
}: {
  modalId: string;
  currentPosition: Position | null;
  selectedPosition: LatLng | null;
  // selectedArea: GeoJSON.GeoJSON | null;
  selectedArea: TSelectedArea | null;
  // setSelectedArea: (selectedArea: GeoJSON.GeoJSON | null) => void;
  setSelectedArea: (selectedArea: TSelectedArea | null) => void;
  setSelectedPosition: (selectedPosition: LatLng | null) => void;
  onDismiss: () => void;
  onConfirm: (
    selectedArea: TSelectedArea | null,
    selectedPosition: LatLng | null
  ) => void;
}) {
  const modal = useRef<HTMLIonModalElement>(null);

  const [areaSize, setAreaSize] = useState<number | null>(null);
  const [areaSizeError, setAreaSizeError] = useState<boolean | string>(false);

  const [blockSelectPosition, setBlockSelectPosition] = useState(false);

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      // console.log("ev.detail.role === confirm", ev);
      onConfirm(ev.detail.data.selectedArea, ev.detail.data.selectedPosition);
    }
    // console.log("onWillDismiss ev", ev);
    // onDismiss();
  }

  function LocationMarker() {
    const mapEv = useMapEvents({
      click(e) {
        if (blockSelectPosition) {
          return;
        }
        console.log("click marker");

        if (selectedArea) {
          setSelectedArea(null);
          mapEv.eachLayer((layer) => {
            if (isShape(layer.options)) {
              mapEv.removeLayer(layer);
            }
          });
        }
        setSelectedPosition(e.latlng);
      },
    });

    console.log("selectedPosition", selectedPosition);
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
          // TODO: tidy this up/extract somewhere
          center={
            selectedPosition
              ? [selectedPosition.lat, selectedPosition.lng]
              : selectedArea && isPolygon(selectedArea)
                ? [
                    centroid(selectedArea.toGeoJSON()).geometry.coordinates[1],
                    centroid(selectedArea.toGeoJSON()).geometry.coordinates[0],
                  ]
                : selectedArea && isCircle(selectedArea)
                  ? [
                      centroid(selectedArea.toGeoJSON()).geometry
                        .coordinates[1],
                      centroid(selectedArea.toGeoJSON()).geometry
                        .coordinates[0],
                    ]
                  : currentPosition
                    ? [
                        currentPosition.coords.latitude,
                        currentPosition.coords.longitude,
                      ]
                    : [
                        defaultPosition.coords.latitude,
                        defaultPosition.coords.longitude,
                      ]
          }
          zoom={currentPosition ? 13 : 12}
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
              onEdited={(e: DrawEvents.Edited) => {
                // Handle area edition (polygon, circle)
                console.log("draw edited", e);
                setSelectedArea(e.layer);
              }}
              onCreated={(e: DrawEvents.Created) => {
                // Handle area selection (polygon, circle)
                const shapeLayer = e.layer;
                console.log("draw created", shapeLayer);

                const layerType = e.layerType;
                // calculate area size
                if (layerType === "circle") {
                  const radius = e.layer._mRadius;
                  setAreaSize(Math.PI * radius * radius);
                } else if (layerType === "polygon") {
                  // TODO: calculate area size for polygon
                  setAreaSize(area(e.layer.toGeoJSON()));
                  // console.log("polygon area", area(e.layer.toGeoJSON()));
                }

                if (isCircle(shapeLayer) || isPolygon(shapeLayer)) {
                  setSelectedArea(shapeLayer);
                }

                setSelectedPosition(null);

                console.log(
                  "instance of shapeLayer",
                  shapeLayer instanceof Circle || shapeLayer instanceof Polygon
                );
                // Has to set timeout, because when last vertex of polygon is clicked,
                //  after created event is triggered, the click event is triggered also, and it cancels the selected area
                setTimeout(() => {
                  setBlockSelectPosition(false);
                }, 200);
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
          <DrawSelectedPolygonsOnMount selectedArea={selectedArea} />
          <RemovePreviousPolygons />
        </MapContainer>
      </IonContent>
    </IonModal>
  );
}
