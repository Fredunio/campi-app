import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import HeaderActionButtons from "../HeaderActionButtons/HeaderActionButtons";
import useAuth from "@/hooks/useAuth/useAuth";
import UserAvatar from "@/components/Avatars/UserAvatar/UserAvatar";

export default function DashboardHeader() {
  const { loading, user, userProfile } = useAuth();
  const displayName =
    userProfile?.username ||
    (userProfile?.first_name && userProfile?.last_name) ||
    userProfile?.first_name + " " + userProfile?.last_name ||
    user?.email;

  return (
    <IonHeader>
      <IonToolbar className="pl-1">
        <div className="flex items-center">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          {/* UserAvatar should be based on email, so it looks the same */}
          {/* If based on username - different looks if the user changes it */}
          {/* <UserAvatar name={user?.email} size={40} /> */}
          <IonTitle className="pl-2 font-bold">{user?.email}</IonTitle>
        </div>
        <HeaderActionButtons />
      </IonToolbar>
    </IonHeader>
  );
}
