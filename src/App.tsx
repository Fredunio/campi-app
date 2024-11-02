import { IonApp, setupIonicReact } from "@ionic/react";

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
import "./styles/theme/variables.css";

/* Tailwind CSS */
import "./styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import React, { useState } from "react";
import RouterWithTabs from "./components/Router/RouterWithTabs";

// const queryClient = new QueryClient();

setupIonicReact({
  // https://github.com/WICG/close-watcher
  // https://ionicframework.com/docs/developing/hardware-back-button#hardware-back-button-in-a-browser-or-a-pwa
  experimentalCloseWatcher: true,
  // https://ionicframework.com/docs/developing/managing-focus#assistive-technology-focus-management
  // focusManagerPriority: ["heading", "content", "banner"],
  mode: "md", // default mode
});

const App: React.FC = function () {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 minute
          },
        },
      })
  );

  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* Nav buttons in Router Component */}
          <RouterWithTabs />
        </AuthProvider>
      </QueryClientProvider>
    </IonApp>
  );
};

export default App;
