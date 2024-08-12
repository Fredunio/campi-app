import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Event: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Event</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Event;
