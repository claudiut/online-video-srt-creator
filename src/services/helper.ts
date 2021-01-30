import { Observable } from 'rxjs';

import TranslationLine from './Translation/TranslationLine';
import IVideoPlayer from './VideoPlayer/IVideoPlayer';

export const splitLines = (content: string): string[] => {
  return content.split(/[\n\r]+/);
}

export const splitParagraphs = (content: string): string[] => {
  return content.split(/[\n\r]{2,}/);
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const replacements = [
  ['ã', 'ă'],
  ['þ', 'ț'],
  ['­', '-'],
  [/\bcaci\b/g, 'căci'],
  [/\bCaci\b/g, 'Căci']
];
export const normalizeText = (text: string): string => {
  let str = text.trim();
  Object.values(replacements).forEach(([key, value]) => str = str.replaceAll(key, value as string));

  const capitalized = splitLines(str).map(strLine => capitalize(strLine.trim())).join('\n');

  return capitalized;
};

// get the translation with timing set around the given time
// OR the first that starts at/after the given time
export const getLatestTranslationForTime = (translations: TranslationLine[], time: number): TranslationLine | undefined => {
  return translations.find(t => (
    t.isTimedFor(time)
    || (t.getStartTime() !== undefined && t.getEndTime() === undefined && time >= (t.getStartTime() as number))
  ));
}

export const createVideoPlayerCurrentTimeObservable = (player: IVideoPlayer): Observable<number> => (
  new Observable<number>(subscriber => {
    let lastPlayerTime: number;
    const intervalId = setInterval(() => {
      const playerTime = player.getCurrentTime();
      // prevent observer notification for same time value
      if (playerTime !== lastPlayerTime) {
        subscriber.next(playerTime);
        lastPlayerTime = playerTime;
      }
    }, 250);

    return {
      unsubscribe() {
        clearInterval(intervalId);
      }
    }
  })
);

export const BYPASS_SHORTCUTS_CLASS = 'bypass-global-shortcuts';

export const SPLIT_CONTENT_TYPES = {
  NONE: 'none',
  LINE: 'line',
  PARAGRAPH: 'paragraph',
}