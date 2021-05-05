import { player$, translations$, url$ } from "./Observables";
import TranslationLine from "../services/Translation/TranslationLine";
import IVideoPlayer from "../services/VideoPlayer/IVideoPlayer";

export const setTranslations = (translations: TranslationLine[]) => translations$.next(translations);

// replace the old translation with the new one, finding it by instance equality
export const replaceTranslation = (newTranslation: TranslationLine) => {
  const translations = translations$.getValue();
  setTranslations(translations.map(tr => tr === newTranslation ? newTranslation : tr));
};

export const removeTranslation = (translation: TranslationLine) => {
  const translations = translations$.getValue();
  setTranslations(translations.filter(tr => tr !== translation));
};

export const setUrl = (url: string) => url$.next(url);

export const setPlayer = (player: IVideoPlayer|undefined) => player$.next(player);
