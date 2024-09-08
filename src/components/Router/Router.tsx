import {
  IonAvatar,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import { Route } from "react-router";
import Home from "../../pages/Home";
import AddLocation from "../../pages/AddLocation";
import AddEvent from "../../pages/AddEvent";
import Dashboard from "../../pages/Dashboard";
import Journal from "../../pages/Journal";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import { homeOutline, journalOutline, mapOutline } from "ionicons/icons";
import useAuth from "../../hooks/useAuth/useAuth";
import { IonReactRouter } from "@ionic/react-router";
import Add from "../../pages/Add";
import Map from "../../pages/Map";

const tabs = [
  {
    title: "Home",
    icon: homeOutline,
    id: "home-tab",
    href: "/",
  },
  {
    title: "Map",
    icon: mapOutline,
    id: "map-tab",
    href: "/map",
  },
  {
    title: "Journal",
    icon: journalOutline,
    id: "journal-tab",
    href: "/journal",
  },
];

export default function Router() {
  const { loading, user } = useAuth();

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/add">
            <Add />
          </Route>
          <Route path="/add_location" component={AddLocation} />
          <Route path="/add_event" component={AddEvent} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/map" component={Map} />

          <Route path="/journal" component={Journal} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </IonRouterOutlet>
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
      </IonTabs>
    </IonReactRouter>
  );
}
