import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonProgressBar,
  IonSearchbar,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { arrowBackOutline, filterCircleOutline } from "ionicons/icons";
import { useCallback, useRef, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { useParams } from "react-router";

// useHistory,
// useLocation,
// useParams,
// useRouteMatch,
const fruitsData = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Kiwi",
  "Lemon",
  "Mango",
  "Orange",
  "Peach",
  "Pear",
  "Pineapple",
  "Strawberry",
  "Watermelon",
  "Avocado",
  "Blackberry",
  "Blueberry",
  "Coconut",
  "Cranberry",
  "Grapefruit",
  "Guava",
  "Lime",
  "Lychee",
  "Papaya",
  "Passion Fruit",
  "Pomegranate",
  "Raspberry",
  "Starfruit",
  "Tangerine",
];

const vegetablesData = [
  "Tomato",
  "Carrot",
  "Celery",
  "Cucumber",
  "Eggplant",
  "Garlic",
  "Green Pepper",
  "Lettuce",
  "Mushroom",
  "Onion",
  "Potato",
  "Pumpkin",
  "Red Pepper",
  "Spinach",
  "Sweet Potato",
  "Tomato",
  "Zucchini",
  "Artichoke",
  "Asparagus",
  "Broccoli",
  "Cabbage",
  "Cauliflower",
  "Corn",
  "Green Bean",
  "Green Peas",
  "Lima Bean",
  "Mushroom",
  "Onion",
  "Potato",
  "Pumpkin",
  "Red Pepper",
  "Spinach",
  "Sweet Potato",
];

const dummyData = [
  ...fruitsData.map((item) => {
    return {
      id: Math.random().toString(36),
      title: item,
      type: "Fruit",
    };
  }),
  ...vegetablesData.map((item) => {
    return {
      id: Math.random().toString(36),
      title: item,
      type: "Vegetable",
    };
  }),
];

export default function Search() {
  const searchInput = useRef<HTMLIonSearchbarElement>(null);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((ev: Event) => {
    setIsSearching(true);

    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    const emptyValue =
      target.value?.trim() === "" || target.value === "" || !target.value;

    if (emptyValue) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setTimeout(() => {
      if (target && target.value && !emptyValue) {
        query = target.value.toLowerCase();
        setSearchResults(
          dummyData.filter((d) => d.title.toLowerCase().indexOf(query) > -1)
        );
      }
      setIsSearching(false);
    }, 1000);
  }, []);

  useIonViewDidEnter(() => {
    searchInput.current?.setFocus();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="flex items-center">
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                history.back();
              }}
              fill="clear"
              shape="round"
            >
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>

          <IonTitle className="font-bold" role="heading" aria-level={1}>
            Search
          </IonTitle>
        </IonToolbar>
        <IonToolbar className="">
          <div className="flex gap-0">
            <IonSearchbar
              onIonFocus={() => setIsSearchInputFocused(true)}
              onIonBlur={() => setIsSearchInputFocused(false)}
              onIonClear={() => {
                setSearchResults([]);
              }}
              ref={searchInput}
              debounce={300}
              onIonInput={(ev) => {
                handleSearch(ev);
              }}
              minlength={2}
              inputMode="search"
              enterkeyhint="search"
              showClearButton="always"
              type="search"
            />
            <IonButton className="" shape="round" fill="clear">
              <IonIcon
                size="large"
                slot="icon-only"
                color="dark"
                icon={filterCircleOutline}
              />
            </IonButton>
          </div>

          {isSearchInputFocused && (
            <div className="w-full h-[200px] flex items-center justify-center border-1 border-lime-300 border-solid">
              <p>test</p>
            </div>
            // <IonPopover trigger="trigger-button">
            //   <IonContent className="ion-padding">
            //     Hello Styled World!
            //   </IonContent>
            // </IonPopover>
          )}

          {isSearching && (
            <IonProgressBar type="indeterminate"></IonProgressBar>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <div className="w-4 h-[0.2rem] ion-margin bg-white rounded-[0.07rem] mx-auto" />
        {searchResults.length > 0 && (
          <>
            {searchResults.some((result) => result.type === "Fruit") && (
              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel>Fruits</IonLabel>
                </IonItemDivider>
                {searchResults
                  .filter((result) => result.type === "Fruit")
                  .map((result) => (
                    <SearchItem key={result.id} title={result.title} />
                    // <IonItem key={result.id}>
                    //   <IonLabel>{result.title}</IonLabel>
                    // </IonItem>
                  ))}
              </IonItemGroup>
            )}

            {searchResults.some((result) => result.type === "Vegetable") && (
              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel>Vegetables</IonLabel>
                </IonItemDivider>
                {searchResults
                  .filter((result) => result.type === "Vegetable")
                  .map((result) => (
                    <SearchItem key={result.id} title={result.title} />
                  ))}
              </IonItemGroup>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

function SearchItem({ title }: { title: string }) {
  return (
    <IonItem routerLink={`/search/${title}`}>
      <IonThumbnail slot="start">
        <img
          alt="Silhouette of mountains"
          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
        />
      </IonThumbnail>
      <IonLabel>
        <h2>{title}</h2>
        <p>Keep close to Nature's heart...</p>
      </IonLabel>
    </IonItem>
  );
}
