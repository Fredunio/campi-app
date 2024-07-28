import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

// TODO: create header component with or without menu button

export default function MainHeader() {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle size="large">Main Header</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
