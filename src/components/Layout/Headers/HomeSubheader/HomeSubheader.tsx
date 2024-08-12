import {
  IonButton,
  IonButtons,
  IonChip,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function HomeSubheader() {
  return (
    <div className="top-0 bg-transparent">
      <IonButtons slot="start" className="gap-2 px-2 py-2 ">
        {/* <button className="subheader-btn subheader-btn-activated">
          Locations
        </button> */}
        <IonChip
          color={"primary"}
          className="subheader-btn subheader-btn-activated"
        >
          Locations
        </IonChip>

        <IonChip color={"dark"} className="subheader-btn">
          Events
        </IonChip>

        <IonChip color={"dark"} className="subheader-btn">
          Trips
        </IonChip>

        {/* <button className="subheader-btn">Events</button> */}
      </IonButtons>
    </div>
  );
}
