import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function LoginHeader() {
  return (
    <IonHeader>
      <IonToolbar className="">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/"></IonBackButton>
        </IonButtons>
        <IonTitle className="">Login</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
