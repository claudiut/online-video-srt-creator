import { setTranslations } from "../../AppState/Actions";
import { translations$, url$ } from "../../AppState/Observables"
import IStorage from "./IStorage";

export const bindPersistentStorage = (storage: IStorage) => {
  // save translations in storage when they update
  translations$.subscribe((translations) => {
    const url = url$.getValue();
      if (url) {
        storage.set(url, translations)
      }
  });

  // load translations from storage when video url changes
  url$.subscribe((url) => {
    if (url) {
      setTranslations(storage.get(url));
    }
  });
}