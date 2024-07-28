import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import {
  arrowForwardOutline,
  bicycleOutline,
  bonfireOutline,
  calendarOutline,
  cameraOutline,
  earOutline,
  fishOutline,
  heartOutline,
  shareSocialOutline,
  starOutline,
  today,
  todayOutline,
} from "ionicons/icons";

export default function EventCard() {
  return (
    <IonCard className="mx-0">
      <img
        alt="Silhouette of mountains"
        src="https://ionicframework.com/docs/img/demos/card-media.png"
      />
      <IonCardHeader>
        <IonCardTitle color={"dark"} className="font-semibold">
          Card Title
        </IonCardTitle>
        <IonCardSubtitle>
          {/* icons that show what event/location */}
          <div className="flex items-center gap-2">
            <IonIcon className="" slot="" icon={bicycleOutline}></IonIcon>
            <IonIcon className="" slot="" icon={bonfireOutline}></IonIcon>
            <IonIcon className="" slot="" icon={cameraOutline}></IonIcon>
            <IonIcon className="" slot="" icon={earOutline}></IonIcon>
            <IonIcon className="" slot="" icon={fishOutline}></IonIcon>
          </div>
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <p>
          Here's a small text description for the card content. Nothing more,
          nothing less.
        </p>
        {/* TODO: add more information like members, date, location, etc.
         */}

        <div className="flex items-center justify-start ">
          {Array.from({ length: 3 }).map((_, i) => (
            <IonButton
              size="small"
              shape="round"
              className="mx-0 lowercase font-extralight"
              fill="clear"
              color={"dark"}
              key={i}
            >
              #tag{i}
            </IonButton>
          ))}
        </div>
      </IonCardContent>
      <IonToolbar className="px-2">
        <IonButton shape="round" fill="default" slot="start">
          <IonIcon slot="icon-only" icon={shareSocialOutline} />
        </IonButton>
        <IonButton shape="round" fill="default" slot="start">
          <IonIcon slot="icon-only" icon={heartOutline} />
        </IonButton>

        <IonButton
          className="normal-case"
          shape="round"
          fill="solid"
          slot="end"
          color={"primary"}
          size="small"
          strong={true}
        >
          31/08/2024
          <IonIcon className="ml-4" icon={today} />
        </IonButton>
      </IonToolbar>
    </IonCard>
  );
}
