import {
  AccordionGroupChangeEventDetail,
  AccordionGroupCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";

import "./AccordionMonthInterval.css";
import MonthIntervalPicker from "@/components/FormElements/MonthIntervalPicker";

export default function AccordionMonthInterval({
  onIonChange,
  value,
  idFrom,
  idTo,
  label,
}: {
  onIonChange: ((ev: AccordionGroupCustomEvent) => void) | undefined;
  value: string;
  idFrom: string;
  idTo: string;
  label: string;
}) {
  return (
    <IonAccordionGroup onIonChange={onIonChange}>
      <IonAccordion className="ion-border-radius" value={value}>
        <IonItem slot="header">
          <IonLabel>{label}</IonLabel>
        </IonItem>
        <div
          className={`pt-4 px-2 rounded-t-none w-full`}
          // rounded-b-[var(--ion-border-radius)] border-t-0 border-[var(--ion-background-color-step-300)] border-solid border-1
          slot="content"
        >
          <MonthIntervalPicker idFrom={idFrom} idTo={idTo} />
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
