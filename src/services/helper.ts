import { MutableRefObject } from 'react';
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

const numberWithZeroPadding = (value: number, paddingLength: number = 2): string => {
  return value.toString().padStart(paddingLength, '0');
}

export const getPaddedTimeComponents = (timeInSeconds: number): string[] => {
    const oneHourInSec = 60 * 3600;
    const hours = Math.floor(timeInSeconds / oneHourInSec);
    const minutes = Math.floor((timeInSeconds - hours * oneHourInSec) / 60);
    const seconds = Math.floor(timeInSeconds - hours * oneHourInSec - minutes * 60);
    const miliseconds = Math.round((timeInSeconds - hours * oneHourInSec - minutes * 60 - seconds) * 1000);

    const paddedH = numberWithZeroPadding(hours);
    const paddedM = numberWithZeroPadding(minutes);
    const paddedS = numberWithZeroPadding(seconds);
    const ms = miliseconds ? miliseconds.toString().padEnd(3, '0') : '000';

    return [paddedH, paddedM, paddedS, ms];
}

// get the translation with timing set around the given time
// OR the first that starts at/after the given time
export const getLatestTranslationForTime = (translations: TranslationLine[], time: number): TranslationLine | undefined => {
  return translations.find(t => (
    t.isTimedFor(time) || (t.hasOnlyStart() && t.startsBeforeOrAt(time))
  ));
}

export const sortTranslationsByStartTime = (translations: TranslationLine[]) => (
  translations.slice(0).sort((trA, trB) => {
    const startTime = trA.getStartTime();
    const endTime = trB.getStartTime();
    
    if (startTime === undefined || endTime === undefined) {
      return 0;
    }

    return startTime - endTime;
  })
);

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

export const isElementInViewportOf = (elemToCheck: HTMLElement, viewportElem: HTMLElement) => {
  const viewportRect = viewportElem.getBoundingClientRect();
  const elemRect = elemToCheck.getBoundingClientRect();

  console.log(viewportElem, viewportRect);
  console.log(elemToCheck, elemRect);

  return elemRect.top >= viewportRect.top &&
    elemRect.bottom <= viewportRect.bottom &&
    elemRect.left <= viewportRect.left &&
    elemRect.right <= viewportRect.right;
}

export const scrollIntoView = (itemRef: MutableRefObject<undefined>, scrolledRef: MutableRefObject<HTMLDivElement | null>) => {
  if (!itemRef.current || !scrolledRef.current) {
        return;
    }

    if (!isElementInViewportOf(itemRef.current, scrolledRef.current)) {
        const element = itemRef.current as HTMLElement;
        element.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
}