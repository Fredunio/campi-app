import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// TODO: once comercialized, use google maps https://ionicframework.com/docs/native/google-maps

const Map: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        {/* leaflet map has prob z-index: 1000 */}
        <header className="absolute z-[1001] bg-purple-600 w-full flex items-center">
          <IonInput placeholder="Search" />
        </header>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default Map;
