import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

import HeaderActionButtons from "../HeaderActionButtons/HeaderActionButtons";

export default function JournalHeader() {
  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonTitle className="font-semibold" size="large">
          Journal 📒
        </IonTitle>
        <HeaderActionButtons />
      </IonToolbar>
    </IonHeader>
  );
}
