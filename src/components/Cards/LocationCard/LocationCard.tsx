import {
  IonButton,
  IonButtons,
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
  footballOutline,
  heartOutline,
  pawOutline,
  planetOutline,
  restaurantOutline,
  shareSocialOutline,
  skullOutline,
  snowOutline,
  starOutline,
  telescopeOutline,
  thunderstormOutline,
  today,
  todayOutline,
  wifiOutline,
} from "ionicons/icons";

export default function LocationCard() {
  return (
    <IonCard className="mx-0">
      <div className="relative">
        <img
          alt="Silhouette of mountains"
          src="https://ionicframework.com/docs/img/demos/card-media.png"
        />
        <div className="absolute right-0 px-1 bottom-1">
          <IonButton color={"dark"} shape="round" fill="clear" slot="start">
            <IonIcon slot="icon-only" icon={shareSocialOutline} />
          </IonButton>
          <IonButton color={"dark"} shape="round" fill="clear">
            <IonIcon slot="icon-only" icon={heartOutline} />
          </IonButton>
        </div>
      </div>

      <IonCardHeader>
        <IonCardTitle color={"dark"} className="font-semibold">
          A Cool Camping Spot Near You
        </IonCardTitle>
        <IonCardSubtitle>
          <div className="flex flex-wrap items-center -mx-2 -mt-1">
            {/* icons that show what event/location */}
            {/* TODO: make it so when it is more than X, it shows X icons and says e.g +4 */}
            <IonButton shape="round" size="small" fill="default" className="">
              <IonIcon slot="icon-only" icon={bicycleOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={bonfireOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={cameraOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={earOutline}></IonIcon>
            </IonButton>

            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={fishOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={footballOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={pawOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={planetOutline}></IonIcon>
            </IonButton>

            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={restaurantOutline}></IonIcon>
            </IonButton>

            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={snowOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={skullOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={telescopeOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={thunderstormOutline}></IonIcon>
            </IonButton>
            <IonButton shape="round" size="small" fill="default">
              <IonIcon slot="icon-only" icon={wifiOutline}></IonIcon>
            </IonButton>
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
    </IonCard>
  );
}
