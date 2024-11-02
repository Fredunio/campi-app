import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

export default function AddPage() {
  return (
    <>
      <IonHeader className="shadow-none">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Add New Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="h-full p-0 m-0">
          <IonRow className="h-1/2">
            <IonCol className="p-0 m-0 ">
              <IonCard
                style={{ borderRadius: `0px` }}
                className="flex items-center justify-center h-full p-0 m-0 bg-cover shadow-none bg-location-button "
              >
                <div className="absolute w-full h-full border-b-2 border-[var(--ion-text-color)] border-solid bg-black/40" />
                <IonButton
                  color={"dark"}
                  size="large"
                  fill="clear"
                  className="w-full h-full text-3xl font-black bg-cover rounded-none bg-location-button"
                >
                  <div className="flex items-center justify-center h-full p-0 m-0">
                    Location
                  </div>
                </IonButton>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="h-1/2">
            <IonCol className="p-0 m-0">
              <IonCard
                style={{ borderRadius: `0px` }}
                className="flex items-center justify-center w-full h-full p-0 m-0 shadow-none"
              >
                <div className="absolute w-full h-full border-[var(--ion-text-color)] border-t-1  border-solid bg-black/40" />
                <IonButton
                  color={"dark"}
                  size="large"
                  fill="clear"
                  className="w-full h-full text-3xl font-black bg-cover rounded-none bg-event-button"
                >
                  <div className="flex items-center justify-center h-full p-0 m-0">
                    Event
                  </div>
                </IonButton>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}
