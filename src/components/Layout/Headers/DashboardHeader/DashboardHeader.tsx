import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonIcon,
  IonLabel,
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

export default function DashboardHeader() {
  return (
    <IonHeader>
      <IonToolbar className="px-4">
        <div className="flex items-center">
          <IonAvatar className="w-8 h-8">
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <IonTitle className="pl-4">John Doe</IonTitle>

          <IonButton
            fill="clear"
            color={"dark"}
            shape="round"
            id="open-search-modal"
          >
            <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>
          </IonButton>

          <IonButton
            fill="clear"
            color={"dark"}
            shape="round"
            id="open-messages-modal"
          >
            <IonIcon slot="icon-only" icon={chatboxEllipsesOutline}></IonIcon>
          </IonButton>

          <IonButton fill="clear" color={"dark"} shape="round">
            <IonIcon slot="icon-only" icon={settingsOutline}></IonIcon>
          </IonButton>
        </div>
      </IonToolbar>
      <IonToolbar>
        <IonSegment value="all">
          <IonSegmentButton value="all">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="favorites">
            <IonLabel>Favorites</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>
  );
}
