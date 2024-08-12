import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import DashboardHeader from "../components/Layout/Headers/DashboardHeader/DashboardHeader";
import HomeHeader from "../components/Layout/Headers/HomeHeader/HomeHeader";

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        {/* <DashboardHeader /> */}
        <HomeHeader />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
