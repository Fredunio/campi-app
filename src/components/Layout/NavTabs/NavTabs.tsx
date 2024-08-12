import {
  IonAvatar,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
} from "@ionic/react";
import { homeOutline, journalOutline, mapOutline } from "ionicons/icons";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";

const tabs = [
  {
    title: "Home",
    icon: homeOutline,
    id: "home-tab",
    href: "/",
  },
  {
    title: "Maps",
    icon: mapOutline,
    id: "map-tab",
    href: "/maps",
  },
  {
    title: "Journal",
    icon: journalOutline,
    id: "journal-tab",
    href: "/journal",
  },
];

export default function NavTabs() {
  const { loading, user } = useAuth();

  return (
    <IonTabBar slot="bottom">
      {tabs.map((tab) => (
        <IonTabButton key={tab.id} tab={tab.id} href={tab.href}>
          <IonIcon aria-hidden="true" icon={tab.icon} />
          <IonLabel>{tab.title}</IonLabel>
        </IonTabButton>
      ))}
      <IonTabButton tab="dashboard" href={user ? "/dashboard" : "/login"}>
        <IonAvatar className="w-12 h-12">
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
      </IonTabButton>
    </IonTabBar>
  );
}
