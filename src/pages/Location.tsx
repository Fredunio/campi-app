import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Location: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Location</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Location;
