import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import {
  chatboxEllipsesOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";
import React from "react";

export default function HeaderActionButtons() {
  return (
    <IonButtons slot="end" className="self-stretch">
      {/* id is important for opening search modal */}
      {/*<IonButton color="dark" shape="round" id="open-search-modal">*/}
      {/*  <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>*/}
      {/*</IonButton>*/}

      <IonButton shape="round" id="open-messages-modal">
        <IonIcon
          color="dark"
          slot="icon-only"
          icon={chatboxEllipsesOutline}
        ></IonIcon>
      </IonButton>

      <IonButton shape="round" id="open-notifications-modal">
        <IonIcon
          color="dark"
          slot="icon-only"
          icon={notificationsOutline}
        ></IonIcon>
      </IonButton>
    </IonButtons>
  );
}
