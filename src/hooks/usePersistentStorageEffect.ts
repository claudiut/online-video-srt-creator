import { useEffect } from "react";
import IStorage from "../services/Storage/IStorage";
import LocalStorage from "../services/Storage/LocalStorage";
import TranslationLine from "../services/Translation/TranslationLine";

const makePersistentStorageEffect = (storage: IStorage) => (
  (
    url: string,
    translations: TranslationLine[],
    setTranslations: (trs: TranslationLine[]) => void,
  ) => {
    useEffect(() => {
      if (url) {
        setTranslations(storage.get(url));
      }
    }, [url, setTranslations]);

    useEffect(() => {
      if (url) {
        storage.set(url, translations)
      }
    }, [url, translations]);
  }
);

export default makePersistentStorageEffect(new LocalStorage());