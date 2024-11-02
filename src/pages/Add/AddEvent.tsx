import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import GoBackHeader from "../../components/Layout/Headers/GoBackHeader/GoBackHeader";

const AddEvent: React.FC = () => {
  return (
    <IonPage>
      <GoBackHeader title="Add Event" />

      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default AddEvent;
