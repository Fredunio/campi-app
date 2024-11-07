import {
  IonAvatar,
  IonHeader,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import HeaderActionButtons from "../HeaderActionButtons/HeaderActionButtons";
import SearchModal from "../../../Modals/SearchModal/SearchModal";
import MessagesModal from "../../../Modals/MessagesModal/MessagesModal";
import NotificationsModal from "../../../Modals/NotificationsModal/NotificationsModal";

// TODO: extract to different header components, like DashboardHeader, JournalHeader, etc.
export default function HomeHeader() {
  // const router = useIonRouter();
  // const inHome = router.routeInfo.pathname === "/";

  return (
    <IonHeader translucent={true}>
      <MessagesModal />
      <NotificationsModal />
      <IonToolbar>
        {/* {inDashboard ? (
          <div className="flex items-center">
            <IonAvatar className="w-8 h-8 ml-4">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonTitle className="font-bold">John Doe</IonTitle>
          </div>
        ) : inJournal ? (
          <IonTitle className="font-semibold" size="large">
            Journal 📒
          </IonTitle>
        ) : (
        )} */}
        <IonTitle className="font-bold" size="large">
          Campi 🏕️
        </IonTitle>
        <HeaderActionButtons />
      </IonToolbar>
    </IonHeader>
  );
}
