import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { arrowBackOutline } from "ionicons/icons";
import { useRef, useState } from "react";

export default function NotificationsModal() {
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
      trigger="open-notifications-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <IonList class="">
          {Array.from({ length: 5 }).map((_, i) => (
            <IonItem key={i} className="">
              <IonThumbnail slot="start">
                <img
                  alt="Silhouette of mountains"
                  src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                />
              </IonThumbnail>

              {/* <IonImg
                  className="h-full w-[4rem] object-cover"
                  slot="start"
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGV2ZW50fGVufDB8fDB8fHww"
                  alt="avatar"
                ></IonImg> */}
              {/* <div className="flex items-center h-[4rem] m-0 gap-4">
                <h6 className="mt-0 font-semibold">Name {i + 1}</h6>
              </div> */}
              <IonLabel className="">Name</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
}
