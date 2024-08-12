import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { arrowBackOutline } from "ionicons/icons";
import { useRef, useState } from "react";

export default function MessagesModal() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  // function confirm() {
  //   modal.current?.dismiss(input.current?.value, "confirm");
  // }

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
      trigger="open-messages-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Messages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <IonList class="">
          {Array.from({ length: 5 }).map((_, i) => (
            <IonItem key={i} className="mt-2">
              <IonAvatar className="w-12 h-12" slot="start">
                <img
                  src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
                  alt="avatar"
                />
              </IonAvatar>

              <div className="pb-2">
                <h6 className="mt-0 mb-1 font-semibold">Name {i + 1}</h6>
                <IonNote className="leading-5 font-extralight line-clamp-2">
                  Hi, I'm a message! I'm a message! I'm a message! I'm a
                  message! I'm a message! I'm a message! I'm a message! I'm a
                  message!
                </IonNote>
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
}
