import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import DashboardHeader from "../../components/Layout/Headers/DashboardHeader/DashboardHeader";
import HomeHeader from "../../components/Layout/Headers/HomeHeader/HomeHeader";
import { Route, useHistory } from "react-router";
import DashboardHome from "./DashboardHome";
import DashboardSettings from "./DashboardSettings";
import DashboardAccount from "./DashboardAccount";
import DashboardNotifications from "./DashboardNotifications";
import useSupabaseBrowser from "@/database/client";
import { useCallback } from "react";
import { signOut } from "@/lib/auth";

const DashboardOutlet: React.FC = () => {
  const history = useHistory();
  const supabase = useSupabaseBrowser();
  const handleLogout = useCallback(async () => {
    try {
      console.log("Logging out");

      // await signOut(supabase);
      const { error } = await supabase.auth.signOut();
      console.log("signOut", { error });
      history.push("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  }, [supabase]);

  return (
    <IonPage>
      <DashboardHeader />

      {/* Dashboard Menu */}
      <IonMenu
        swipeGesture={true}
        type="overlay"
        contentId="dashboard-router-outlet"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
          <IonList>
            <IonItem
              onClick={() => {
                console.log("Logging out");
                // const token = supabase.auth.getSession().then((session) => {
                //   return session.data.session?.access_token;
                // });
                supabase.auth.signOut({ scope: "global" }).then(() => {
                  console.log("Logged out");
                  history.push("/login");
                });
              }}
              //  onClick={handleLogout}
              button={true}
            >
              Logout
            </IonItem>
          </IonList>
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
