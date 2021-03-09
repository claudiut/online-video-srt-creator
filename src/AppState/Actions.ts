import { player$, translations$, url$ } from "./Observables";
import TranslationLine from "../services/Translation/TranslationLine";
import IVideoPlayer from "../services/VideoPlayer/IVideoPlayer";

export const setTranslations = (translations: TranslationLine[]) => translations$.next(translations);

export const setUrl = (url: string) => url$.next(url);

export const setPlayer = (player: IVideoPlayer|undefined) => player$.next(player);