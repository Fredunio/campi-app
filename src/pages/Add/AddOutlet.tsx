import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import AddPage from "./AddPage";
import AddEvent from "./AddEvent";
import AddLocation from "./AddLocation";

const AddOutlet: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path="/add" component={AddPage} />
        <Route path="/add/location" component={AddLocation} />
        <Route path="/add/event" component={AddEvent} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default AddOutlet;
