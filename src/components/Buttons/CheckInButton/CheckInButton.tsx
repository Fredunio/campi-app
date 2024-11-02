import { IonButton, IonIcon, IonSpinner } from "@ionic/react";
import { location } from "ionicons/icons";

import "./CheckInButton.css";

export default function CheckInButton({
  handleCheckIn,
  checkedIn,
  loading = false,
}: {
  handleCheckIn: () => void;
  checkedIn: boolean | undefined;
  loading: boolean;
}) {
  console.log("loading", loading);

  return (
    <IonButton
      color={checkedIn ? "success" : "dark"}
      shape="round"
      fill="solid"
      size="small"
      className="whitespace-nowrap"
      onClick={handleCheckIn}
      disabled={loading}
    >
      {checkedIn ? "Checked" : "Check In"}
      {loading ? (
        <IonSpinner className="ml-2" slot="end" />
      ) : (
        <IonIcon slot="end" icon={location} />
      )}
    </IonButton>
  );
}
