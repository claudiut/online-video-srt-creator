import { Observable } from 'rxjs';

import TranslationLine from './Translation/TranslationLine';
import IVideoPlayer from './VideoPlayer/IVideoPlayer';

export const splitMultipleLines = (content: string): string[] => {
  return content.split(/[\n\r]+/);
}

export const getTranslationForTime = (translations: TranslationLine[], time: number): TranslationLine | undefined => {
  return translations.find((t) => t.isTimedFor(time))
}

export const createVideoPlayerCurrentTimeObservable = (player: IVideoPlayer): Observable<number> => (
  new Observable<number>(subscriber => {
    const intervalId = setInterval(() => {
      if (player.isPlaying()) {
        subscriber.next(player.getCurrentTime());
      }
    }, 250);

    return {
      unsubscribe() {
        clearInterval(intervalId);
      }
    }
  })
);