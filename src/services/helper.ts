import { Observable } from 'rxjs';

import TranslationLine from './Translation/TranslationLine';
import IVideoPlayer from './VideoPlayer/IVideoPlayer';

export const splitLines = (content: string): string[] => {
  return content.split(/[\n\r]+/);
}

export const splitParagraphs = (content: string): string[] => {
  return content.split(/[\n\r]{2,}/);
}

const replacements = [
  ['ã', 'ă'],
  ['þ', 'ț'],
  ['­', '-'],
  [/\s+/g, ' '],
  [/-{2,}/g, '-'],
  [/\bcaci\b/g, 'căci'],
  [/\bCaci\b/g, 'Căci']
];
export const normalizeText = (text: string): string => {
  Object.values(replacements).forEach(([key, value]) => text = text.replaceAll(key, value as string));

  return splitLines(text).map(textLine => textLine.trim()).join('\n');
};

// get the translation with timing set around the given time
// OR the first that starts at/after the given time
export const getLatestTranslationForTime = (translations: TranslationLine[], time: number): TranslationLine | undefined => {
  return translations.find(t => (
    t.isTimedFor(time) || (t.hasOnlyStart() && t.startsBeforeOrAt(time))
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
    }, 5);

    return {
      unsubscribe() {
        clearInterval(intervalId);
      }
    }
  })
);

export const removeLeftZeroPadding = (string: string) => {
  if (string[0] === '0' && string.length > 1) {
    return /^[0]+$/.test(string) ? '0' : string.replace(/^[0]+/, '');
  }

  return string;
};

export const computeParsedToSeconds = (h: number, m: number, s: number, ms: number): number => {
  return h * 3600 + m * 60 + s + ms / 1000;
}

export const BYPASS_SHORTCUTS_CLASS = 'bypass-global-shortcuts';

export const SPLIT_CONTENT_TYPES = {
  NONE: 'none',
  LINE: 'line',
  PARAGRAPH: 'paragraph',
}