import {
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import DashboardHeader from "../../components/Layout/Headers/DashboardHeader/DashboardHeader";
import HomeHeader from "../../components/Layout/Headers/HomeHeader/HomeHeader";
import { Route } from "react-router";
import DashboardHome from "./DashboardHome";
import DashboardSettings from "./DashboardSettings";
import DashboardAccount from "./DashboardAccount";
import DashboardNotifications from "./DashboardNotifications";

const DashboardOutlet: React.FC = () => {
  return (
    <IonPage>
      <DashboardHeader />

      <IonMenu
        swipeGesture={true}
        type="overlay"
        contentId="dashboard-router-outlet"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonMenu>

      <IonContent>
        <IonRouterOutlet id="dashboard-router-outlet">
          <Route exact path="/dashboard" component={DashboardHome} />
          <Route path="/dashboard/settings" component={DashboardSettings} />
          <Route path="/dashboard/account" component={DashboardAccount} />
          <Route
            path="/dashboard/notifications"
            component={DashboardNotifications}
          />
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default DashboardOutlet;
