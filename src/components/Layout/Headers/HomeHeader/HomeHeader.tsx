import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  chatboxEllipsesOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

export default function HomeHeader() {
  const router = useIonRouter();

  // starts with /dashboard
  const inHome = router.routeInfo.pathname === "/";
  const inDashboard = router.routeInfo.pathname.includes("/dashboard");
  const inJournal = router.routeInfo.pathname.includes("/journal");

  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        {inDashboard ? (
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
          <IonTitle size="large">Campi 🏕️</IonTitle>
        )}

        {/* <IonTitle size="large">Campi 🏕️</IonTitle> */}

        <IonButtons slot="end">
          <IonButton shape="round" id="open-search-modal">
            <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>
          </IonButton>

          <IonButton shape="round" id="open-messages-modal">
            <IonIcon slot="icon-only" icon={chatboxEllipsesOutline}></IonIcon>
          </IonButton>

          <IonButton shape="round" id="open-notifications-modal">
            <IonIcon slot="icon-only" icon={notificationsOutline}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
