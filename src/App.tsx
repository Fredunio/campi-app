import { Route } from "react-router-dom";
import {
  IonApp,
  IonAvatar,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  mapOutline,
  peopleOutline,
  personCircleOutline,
} from "ionicons/icons";
import NewLocation from "./pages/NewLocation";
import Dashboard from "./pages/Dashboard";
import PageWithMainSidebarMenu from "./components/Layout/PageWithSidebarMenu/PageWithSidebarMenu";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./styles/variables.css";

/* Tailwind CSS */
import "./styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";

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
    title: "Groups",
    icon: peopleOutline,
    id: "groups-tab",
    href: "/groups",
  },
];

const queryClient = new QueryClient();

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <QueryClientProvider client={queryClient}>
      <IonReactRouter>
        {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Header Title</IonTitle>
        </IonToolbar>
      </IonHeader> */}
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route exact path="/search">
              <Search />
            </Route> */}
            <Route exact path="/new">
              <PageWithMainSidebarMenu children={<NewLocation />} />;
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />;
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {tabs.map((tab) => (
              <IonTabButton key={tab.id} tab={tab.id} href={tab.href}>
                <IonIcon aria-hidden="true" icon={tab.icon} />
                <IonLabel>{tab.title}</IonLabel>
              </IonTabButton>
            ))}

            <IonTabButton tab="tab2" href="/dashboard">
              <IonAvatar className="w-12 h-12">
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
              {/* <IonIcon aria-hidden="true" icon={ellipse} /> */}
              {/* <IonLabel>Dashboard</IonLabel> */}
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </QueryClientProvider>
  </IonApp>
);

export default App;
