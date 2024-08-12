import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function SignupHeader() {
  return (
    <IonHeader>
      <IonToolbar className="">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/"></IonBackButton>
        </IonButtons>
        <IonTitle className="">Signup</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
