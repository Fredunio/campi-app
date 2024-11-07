import { createContext, useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

// https://github.com/ionic-team/ionic-storage

export const AuthContext = createContext<{
  store: Storage | null;
}>({
  store: null,
});

const StoreProvider = function ({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<Storage | null>(null);

  useEffect(() => {
    const initStore = async () => {
      const newStore = new Storage({
        name: "__campi_db",
        driverOrder: [
          CordovaSQLiteDriver._driver,
          Drivers.IndexedDB,
          Drivers.LocalStorage,
        ],
      });
      await newStore.defineDriver(CordovaSQLiteDriver);
      const store = await newStore.create();
      setStore(store);
    };
    initStore();
  }, []);

  return (
    <AuthContext.Provider value={{ store }}>{children}</AuthContext.Provider>
  );
};

export default StoreProvider;
