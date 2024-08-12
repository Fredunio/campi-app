import { IonText } from "@ionic/react";

export default function FormErrorText({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!children) {
    return null;
  }
  return (
    // <div className="input-bottom sc-ion-input-md">
    //   <div className="helper-text sc-ion-input-md">
    //     <div className="error-text sc-ion-input-md">{children}</div>
    //   </div>
    // </div>
    <IonText color="danger">
      <p className="px-4 m-0 -mt-1 text-xs">{children}</p>
    </IonText>
  );
}
