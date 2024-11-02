import {
  DatetimeChangeEventDetail,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from "@ionic/react";
import { IonDatetimeCustomEvent } from "@ionic/core";

import "./MonthPickerButton.css";

function MonthPickerButton({
  idName,
  disabled,
  onChange,
}: {
  idName: string;
  disabled?: boolean;
  onChange?:
    | ((event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) => void)
    | undefined;
}) {
  return (
    <>
      {/* https://ionicframework.com/docs/api/datetime-button */}
      <IonDatetimeButton disabled={disabled} datetime={idName} />

      <IonModal keepContentsMounted={true}>
        {/* https://ionicframework.com/docs/api/datetime */}
        <IonDatetime
          onIonChange={(e) => {
            const value = e.detail.value;
            console.log(value);
          }}
          presentation="month"
          id={idName}
        />
      </IonModal>
    </>
  );
}
export default MonthPickerButton;
