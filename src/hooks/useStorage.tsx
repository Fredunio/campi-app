import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";

export function useStorage() {
  const [store, setStore] = useState<Storage | undefined>(undefined);

  useEffect(() => {
    const initStore = async () => {
      const newStore = new Storage();
      const store = await newStore.create();
      setStore(store);
    };
    initStore();
  }, []);

  return store;
}
