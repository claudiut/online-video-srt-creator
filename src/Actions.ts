import { player$, translations$, url$ } from "./services/BehaviourSubjects";
import TranslationLine from "./services/Translation/TranslationLine";
import IVideoPlayer from "./services/VideoPlayer/IVideoPlayer";

export const setTranslations = (translations: TranslationLine[]) => translations$.next(translations);

export const setUrl = (url: string) => url$.next(url);

export const setPlayer = (player: IVideoPlayer) => player$.next(player);
