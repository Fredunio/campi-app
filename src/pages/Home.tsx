import {
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRow,
} from "@ionic/react";
import LocationCard from "../components/Cards/LocationCard/LocationCard";
import HomeHeader from "../components/Layout/Headers/HomeHeader/HomeHeader";
import SearchModal from "../components/Modals/SearchModal/SearchModal";
import MessagesModal from "../components/Modals/MessagesModal/MessagesModal";
import NotificationsModal from "../components/Modals/NotificationsModal/NotificationsModal";
import { add } from "ionicons/icons";

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
  return (
    <IonPage id="main-content">
      <HomeHeader />
      <IonContent fixedSlotPlacement="before">
        <SearchModal />
        <MessagesModal />
        <NotificationsModal />
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

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
