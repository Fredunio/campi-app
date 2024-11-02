import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  chatboxEllipsesOutline,
  searchOutline,
  settings,
  settingsOutline,
} from "ionicons/icons";
import React from "react";
import HeaderActionButtons from "../HeaderActionButtons/HeaderActionButtons";

export default function DashboardHeader() {
  return (
    <IonHeader>
      <IonToolbar className="pl-1">
        <div className="flex items-center">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonAvatar className="w-8 h-8">
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <IonTitle className="pl-2 font-bold">John Doe</IonTitle>
        </div>
        <HeaderActionButtons />
      </IonToolbar>
    </IonHeader>
  );
}
