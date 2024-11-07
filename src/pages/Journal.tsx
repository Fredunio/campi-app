import { IonContent, IonPage } from "@ionic/react";
import JournalHeader from "@/components/Layout/Headers/JournalHeader/JournalHeader";

const Journal: React.FC = () => {
  return (
    <IonPage>
      <JournalHeader />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Journal;
