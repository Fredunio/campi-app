import { Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, journalOutline, mapOutline } from "ionicons/icons";
import Dashboard from "./pages/Dashboard";
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
import AddLocation from "./pages/AddLocation";
import AddEvent from "./pages/AddEvent";
import Journal from "./pages/Journal";
import AuthProvider from "./providers/AuthProvider";
import NavTabs from "./components/Layout/NavTabs/NavTabs";
import Router from "./components/Router/Router";

const queryClient = new QueryClient();

setupIonicReact();

const App: React.FC = function () {
  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          {/* <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/add_location">
                  <AddLocation />
                </Route>
                <Route exact path="/add_event">
                  <AddEvent />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/journal">
                  <Journal />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <SignUp />;
                </Route>
              </IonRouterOutlet>
              <NavTabs />
            </IonTabs>
          </IonReactRouter> */}
        </AuthProvider>
      </QueryClientProvider>
    </IonApp>
  );
};

export default App;
