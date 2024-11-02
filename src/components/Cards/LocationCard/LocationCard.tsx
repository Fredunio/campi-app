import {
  IonActionSheet,
  IonAvatar,
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
  logoFacebook,
  logoTwitter,
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
import {
  ActionSheet,
  ActionSheetButton,
  ActionSheetButtonStyle,
} from "@capacitor/action-sheet";
import { showNativeActionSheet } from "@/lib/functions/showNativeActionSheet";
import { shareNative } from "@/lib/functions/shareNative";
import { Share } from "@capacitor/share";

// FIXME: fix icons not showing
// FIXME: fix ActionSheetButtonStyle.Cancel not working
// NOTE: think about switching to https://ionicframework.com/docs/api/action-sheet#controller-action-sheets

const actionButtons: ActionSheetButton[] = [
  {
    title: "Facebook",
    icon: logoFacebook,
  },

  {
    title: "Twitter",
    icon: logoTwitter,
  },
  {
    title: "Copy Link",
    icon: arrowForwardOutline,
  },
  {
    title: "Email",
    icon: todayOutline,
  },
  {
    title: "SMS",
    icon: today,
  },

  {
    title: "Cancel",
    style: ActionSheetButtonStyle.Cancel,
  },
];

const showShareActions = () =>
  showNativeActionSheet({
    title: "Share",
    message: "Share this location with your friends",
    options: {
      options: actionButtons,
    },
  });

const onClickShare = async () => {
  const { value: canShare } = await Share.canShare();
  console.log("canShare", canShare);
  if (canShare) {
    await Share.share({
      title: "Share",
      text: "Share this location with your friends",
      url: "https://ionicframework.com/docs/components",
    });
  } else {
    showShareActions();
  }
};

export default function LocationCard({ id }: { id: string }) {
  const shareActionSheetId = `open-share-action-sheet-${id}`;
  return (
    // card className is used to select it in the css
    <>
      <IonCard
        // routerLink="/location/1"
        className="mx-0 rounded-none card"
      >
        <IonCardHeader className="px-4">
          <IonCardTitle color={"dark"} className="text-xl">
            <div className="flex items-center gap-4">
              <IonAvatar className="flex-shrink-0 w-12 h-12 select-none">
                <img
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  alt="Avatar"
                  className="pointer-events-none select-none"
                />
              </IonAvatar>
              <div>
                <h4 className="m-0">A Cool Camping Spot Near You</h4>
                <h5 className="m-0 text-sm font-light text-opacity-50">
                  John Doe, 24 August 2024
                </h5>
              </div>
            </div>
          </IonCardTitle>
          {/* <IonCardSubtitle>
            <div className="flex flex-wrap items-center -mx-2 -mt-1">
            </div>
          </IonCardSubtitle> */}
        </IonCardHeader>
        <div className="relative">
          <img
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/card-media.png"
            className="pointer-events-none select-none"
          />
          <div className="absolute right-0 px-1 bottom-1">
            <IonButton
              // id={shareActionSheetId}
              // onClick={showActions}
              onClick={onClickShare}
              color={"dark"}
              shape="round"
              fill="clear"
              slot="start"
            >
              <IonIcon slot="icon-only" icon={shareSocialOutline} />
            </IonButton>
            <IonButton color={"dark"} shape="round" fill="clear">
              <IonIcon slot="icon-only" icon={heartOutline} />
            </IonButton>
          </div>
        </div>
        <IonCardHeader>
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

      {/* Action sheet for sharing content */}

      {/* <IonActionSheet
        trigger={shareActionSheetId}
        header="Share"
        subHeader="Share this location with your friends"
        buttons={[
          {
            text: "Facebook",
            icon: logoFacebook,
            role: "selected",
            data: {
              action: "facebook",
            },
          },

          {
            text: "Twitter",
            icon: logoTwitter,
            role: "selected",
            data: {
              action: "twitter",
            },
          },
          {
            text: "Copy Link",
            icon: arrowForwardOutline,
            role: "selected",
            data: {
              action: "copy",
            },
          },
          {
            text: "Email",
            icon: todayOutline,
            role: "selected",
            data: {
              action: "email",
            },
          },
          {
            text: "SMS",
            icon: today,
            role: "selected",
            data: {
              action: "sms",
            },
          },

          {
            text: "Cancel",
            role: "cancel",
            data: {
              action: "cancel",
            },
          },
        ]}
        onDidDismiss={({ detail }) => console.log(detail)}
      /> */}
    </>
  );
}
