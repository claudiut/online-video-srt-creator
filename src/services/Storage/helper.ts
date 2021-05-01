import { setTranslations } from "../../AppState/Actions";
import { translations$ } from "../../AppState/Observables"
import IStorage from "./IStorage";

export const bindPersistentStorage = (storage: IStorage) => {
  setTranslations(storage.get());
  // save translations in storage when they update
  translations$.subscribe((translations) => {
    storage.set(translations)
  });
}