import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Add: React.FC = () => {
  return (
    <IonPage>
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
                <div className="absolute w-full h-full border-8 border-b-4 border-white border-solid bg-black/40" />

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
                <div className="absolute w-full h-full border-8 border-t-4 border-white border-solid bg-black/40" />

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
    </IonPage>
  );
};

export default Add;
