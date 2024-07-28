import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  chatboxEllipsesOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

export default function HomeHeader() {
  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonTitle size="large">Home</IonTitle>
        <IonButtons slot="end">
          <IonButton shape="round" id="open-search-modal">
            <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>
          </IonButton>

          <IonButton shape="round" id="open-messages-modal">
            <IonIcon slot="icon-only" icon={chatboxEllipsesOutline}></IonIcon>
          </IonButton>

          <IonButton shape="round" id="open-notifications-modal">
            <IonIcon slot="icon-only" icon={notificationsOutline}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
