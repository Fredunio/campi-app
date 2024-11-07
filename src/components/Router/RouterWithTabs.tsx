import {
  IonAvatar,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import Home from "../../pages/Home";
import Journal from "../../pages/Journal";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import {
  homeOutline,
  journalOutline,
  mapOutline,
  newspaperOutline,
  readerOutline,
  searchCircleOutline,
  searchOutline,
} from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Map from "../../pages/Map";
import DashboardOutlet from "../../pages/Dashboard/DashboardOutlet";
import AddOutlet from "../../pages/Add/AddOutlet";
import Search from "../../pages/Search";
import { Capacitor } from "@capacitor/core";
import ProtectedAuthRoute from "@/components/Router/ProtectedAuthRoute";
import Avatar from "boring-avatars";
import UserAvatar from "@/components/Avatars/UserAvatar/UserAvatar";
import useAuth from "@/hooks/useAuth/useAuth";

const isNative = Capacitor.isNativePlatform();

const tabs = [
  {
    title: "Home",
    icon: newspaperOutline,
    id: "home-tab",
    href: "/home",
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
  {
    title: "search",
    icon: searchOutline,
    id: "search-tab",
    href: "/search",
  },
];

export default function RouterWithTabs() {
  const { loading, user } = useAuth();

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="/home" />
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.
          
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          {/* <Route path="/dashboard" render={() => <DashboardOutlet />} /> */}
          <ProtectedAuthRoute path="/dashboard" component={DashboardOutlet} />
          <Route path="/map" render={() => <Map />} />
          <ProtectedAuthRoute path="/add" component={AddOutlet} />
          <Route path="/search" render={() => <Search />} />
          <Route path="/journal" render={() => <Journal />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/signup" render={() => <SignUp />} />
        </IonRouterOutlet>

        {/* FIXME: fix home tab is always styled active (probable because there is a '/' route, and it picks up all other routes )*/}
        <IonTabBar slot="bottom">
          {tabs.map((tab) => (
            <IonTabButton
              // selected={url === tab.href}
              key={tab.id}
              tab={tab.id}
              href={tab.href}
            >
              <IonIcon aria-hidden="true" icon={tab.icon} />
              <IonLabel>{tab.title}</IonLabel>
            </IonTabButton>
          ))}
          <IonTabButton tab="dashboard" href={user ? "/dashboard" : "/login"}>
            <UserAvatar
              colors={null}
              variant="beam"
              name={user?.email || ""}
              size={40}
            />

            {/* <IonAvatar className="w-12 h-12">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar> */}
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
