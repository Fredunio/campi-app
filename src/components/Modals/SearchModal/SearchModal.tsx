import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { arrowBackOutline, searchOutline } from "ionicons/icons";
import React, { useRef, useState } from "react";

export default function SearchModal() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  const [message, setMessage] = useState(
    "This modal uses triggers to automatically open a modal when the button is clicked."
  );

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonModal
      ref={modal}
      trigger="open-search-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar className="">
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar className="">
          <IonSearchbar showClearButton="always"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <IonInput className="" fill="outline" placeholder="Search on Campi">
          <IonIcon
            slot="start"
            icon={searchOutline}
            aria-hidden="true"
          ></IonIcon>
        </IonInput> */}
        <div className="w-4 h-[0.2rem]  bg-white rounded-[0.07rem] mx-auto"></div>
      </IonContent>
    </IonModal>
  );
}
