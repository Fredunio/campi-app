import { IonContent, IonPage } from "@ionic/react";
import HomeHeader from "../components/Layout/Headers/HomeHeader/HomeHeader";

const Journal: React.FC = () => {
  return (
    <IonPage>
      <HomeHeader />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Journal;
