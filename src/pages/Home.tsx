import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  RefresherEventDetail,
} from "@ionic/react";
import LocationCard from "../components/Cards/LocationCard/LocationCard";
import HomeHeader from "../components/Layout/Headers/HomeHeader/HomeHeader";
import SearchModal from "../components/Modals/SearchModal/SearchModal";
import MessagesModal from "../components/Modals/MessagesModal/MessagesModal";
import NotificationsModal from "../components/Modals/NotificationsModal/NotificationsModal";
import { add, bonfire, location, pin, pinOutline } from "ionicons/icons";
import HomeSubheader from "../components/Layout/Headers/HomeSubheader/HomeSubheader";
import { useCallback, useRef, useState } from "react";

const dummyData = [
  {
    id: 1,
    title: "First Post",
    content: "This is the first post",
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the second post",
  },
  {
    id: 3,
    title: "Third Post",
    content: "This is the third post",
  },
  {
    id: 4,
    title: "Fourth Post",
    content: "This is the fourth post",
  },
  {
    id: 5,
    title: "Fifth Post",
    content: "This is the fifth post",
  },
  {
    id: 6,
    title: "Sixth Post",
    content: "This is the sixth post",
  },
  {
    id: 7,
    title: "Seventh Post",
    content: "This is the seventh post",
  },
  {
    id: 8,
    title: "Eighth Post",
    content: "This is the eighth post",
  },
  {
    id: 9,
    title: "Ninth Post",
    content: "This is the ninth post",
  },
  {
    id: 10,
    title: "Tenth Post",
    content: "This is the tenth post",
  },
];

const Home: React.FC = () => {
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  // state needed to refresh component, so that the fab activated property can change
  const fabRef = useRef<HTMLIonFabElement>(null);
  const [fabOpen, setFabOpen] = useState(
    fabRef.current?.activated === true ? true : false
  );
  const closeFab = useCallback(() => {
    fabRef.current?.close();
    setFabOpen(false);
  }, [fabRef]);

  const fabActivated = fabRef.current?.activated;

  return (
    <IonPage id="main-content">
      <HomeHeader />
      {fabActivated && (
        <div
          onClick={closeFab}
          className="absolute z-10 w-full h-screen bg-black/70"
        ></div>
      )}
      <IonContent fixedSlotPlacement="before">
        <SearchModal />
        <MessagesModal />
        <NotificationsModal />
        <IonFab
          onClick={() => setFabOpen(!fabOpen)}
          ref={fabRef}
          slot="fixed"
          vertical="bottom"
          horizontal="end"
        >
          <IonFabButton aria-label="Add New Content">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList
            side="top"
            // className="right-0 items-end justify-items-stretch"
          >
            {/* <IonButton fill="outline" color={"dark"}>
              Location
            </IonButton>
            <IonButton fill="outline" color={"dark"}>
              Event
            </IonButton> */}
            <IonFabButton href="/add_event" color={"medium"}>
              <IonIcon icon={bonfire}></IonIcon>
            </IonFabButton>
            <IonFabButton href="/add_location" color={"medium"}>
              <IonIcon icon={location}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

        <HomeSubheader />

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonGrid className="p-0 m-0">
          <div className="">
            {Array.from({ length: 10 }).map((_, i) => (
              <IonRow class="p-0 m-0" key={i}>
                <LocationCard key={i} />
              </IonRow>
            ))}
          </div>
        </IonGrid>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Home;
