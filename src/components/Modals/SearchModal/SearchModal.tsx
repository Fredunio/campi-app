import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonProgressBar,
  IonSearchbar,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { arrowBackOutline, searchOutline } from "ionicons/icons";
import React, { useCallback, useRef, useState } from "react";

const dummyData = [
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
  "Tomato",
];

export default function SearchModal({
  handleInput,
}: {
  handleInput?: (ev: Event) => void;
}) {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    "This modal uses triggers to automatically open a modal when the button is clicked."
  );

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // https://ionicframework.com/docs/api/modal
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
    if (ev.detail.role === "cancel") {
      setMessage("You didn't enter a name.");
    }
  }

  const confirm = useCallback(() => {
    // dissmises the modal with a value, and a role of type string, e.g. "confirm", "cancel" etc.
    modal.current?.dismiss("any type of value", "confirm");
  }, []);

  const cancel = useCallback(() => {
    modal.current?.dismiss(undefined, "cancel");
  }, []);

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
          dummyData.filter((d) => d.toLowerCase().indexOf(query) > -1)
        );
      }
      setIsSearching(false);
    }, 1000);
  }, []);

  return (
    <IonModal
      ref={modal}
      trigger="open-search-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar className="">
          <IonSearchbar
            debounce={300}
            onIonInput={(ev) => {
              if (handleInput) {
                handleInput(ev);
              } else {
                handleSearch(ev);
              }
            }}
            inputMode="search"
            enterkeyhint="search"
            showClearButton="always"
          ></IonSearchbar>
          {isSearching && (
            <IonProgressBar type="indeterminate"></IonProgressBar>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <div className="w-4 h-[0.2rem] ion-margin bg-white rounded-[0.07rem] mx-auto" />
        {searchResults.length > 0 && (
          <IonList>
            {searchResults.map((result) => (
              <IonItem key={result} button>
                <IonThumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                  />
                </IonThumbnail>
                {result}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
}
