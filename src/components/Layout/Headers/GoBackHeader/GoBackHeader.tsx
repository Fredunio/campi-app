import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

export default function GoBackHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <IonHeader>
      <IonToolbar className="">
        <IonButtons slot="start">
          <IonBackButton defaultHref={href ? href : "/"}></IonBackButton>
        </IonButtons>
        <IonTitle className="">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
