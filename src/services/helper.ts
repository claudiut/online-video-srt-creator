import { Observable } from 'rxjs';

import TranslationLine from './Translation/TranslationLine';
import IVideoPlayer from './VideoPlayer/IVideoPlayer';

export const splitLines = (content: string): string[] => {
  return content.split(/[\n\r]+/);
}

export const splitParagraphs = (content: string): string[] => {
  return content.split(/[\n\r]{2,}/);
}

// get the translation that starts and ends around that time OR at first that starts before
export const getLatestTranslationForTime = (translations: TranslationLine[], time: number): TranslationLine | undefined => {
  return translations.find(t => (
    t.isTimedFor(time)
    || (t.getStartTime() !== undefined && t.getEndTime() === undefined && time >= (t.getStartTime() as number))
  ));
}

export const createVideoPlayerCurrentTimeObservable = (player: IVideoPlayer): Observable<number> => (
  new Observable<number>(subscriber => {
    const intervalId = setInterval(() => {
      subscriber.next(player.getCurrentTime());
    }, 250);

    return {
      unsubscribe() {
        clearInterval(intervalId);
      }
    }
  })
);

export const replaceWrongCharacters = (text: string): string => text.trim().replaceAll('ã', 'ă');

export const BYPASS_SHORTCUTS_CLASS = 'bypass-global-shortcuts';

export const SPLIT_CONTENT_TYPES = {
  NONE: 'none',
  LINE: 'line',
  PARAGRAPH: 'paragraph',
}