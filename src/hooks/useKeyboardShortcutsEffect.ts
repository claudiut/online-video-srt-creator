import { useEffect } from "react";

import IVideoPlayer from "../services/VideoPlayer/IVideoPlayer";
import { BYPASS_SHORTCUTS_CLASS } from "../services/helper";
import TranslationLine from "../services/Translation/TranslationLine";

const shortcutBypassed = (event: KeyboardEvent) => {
  const className = (event.target as HTMLElement).className;
  return className && className.includes(BYPASS_SHORTCUTS_CLASS);
}

const firstUntimedTranslationIndex = (translations: TranslationLine[]): number => (
  translations.findIndex((t) => !t.isTimed())
);

// if start time is very close to the previrous translation's end time,
// join them for smooth transitions
const normalizeStartTimeBasedOnPrevious = (
  translations: TranslationLine[],
  currentTrIndex: number
): TranslationLine | undefined => {
  if (currentTrIndex === 0) {
    return;
  }

  const currentTr = translations[currentTrIndex];
  const prevTr = translations[currentTrIndex - 1];
  if (
    currentTr.getStartTime()
    && prevTr.getEndTime()
    && ((currentTr.getStartTime() as number) - (prevTr.getEndTime() as number) < 0.5)
  ) {
    currentTr.setStartTime(prevTr.getEndTime() as number);
  }
};

const useKeyboardShortcutsEffect = (
  player: IVideoPlayer | null,
  translations: TranslationLine[],
  setTranslations: (trs: TranslationLine[]) => void
) => {
  useEffect(() => {
    if (!player) {
      return;
    }

    const listeners = {
        space: (event: KeyboardEvent) => {
          if (!shortcutBypassed(event) && event.key === ' ') {
            event.preventDefault();
            player.togglePlay();
          }
        },
        leftArrow: (event: KeyboardEvent) => {
          if (!shortcutBypassed(event) && event.key === 'ArrowLeft') {
            event.preventDefault();
            player.seekPrevious();
          }
        },
        rightArrow: (event: KeyboardEvent) => {
          if (!shortcutBypassed(event) && event.key === 'ArrowRight') {
            event.preventDefault();
            player.seekNext();
          }
        },
        enter: (event: KeyboardEvent) => {
          if (!shortcutBypassed(event) && event.key === 'Enter') {
            const playerCurrentTime = player.getCurrentTime();
            event.preventDefault();

            const firstUntimedIndex = firstUntimedTranslationIndex(translations);
            if (firstUntimedIndex === -1) {
              return;
            }
            const firstUntimed = translations[firstUntimedIndex];
            if (firstUntimed.getStartTime() === undefined) {
              firstUntimed.setStartTime(playerCurrentTime);
              normalizeStartTimeBasedOnPrevious(translations, firstUntimedIndex);
            } else if (firstUntimed.getEndTime() === undefined) {
              firstUntimed.setEndTime(playerCurrentTime);
            }

            setTranslations([...translations])
          }
        }
      };
      const listenerOptions = {capture: true};

      Object.values(listeners).forEach((listener) => {
        document.addEventListener('keydown', listener, listenerOptions);
      });

      return () => {
        Object.values(listeners).forEach((listener) => {
          document.removeEventListener('keydown', listener, listenerOptions);
        })
      };
  }, [player, translations, setTranslations]);
}

export default useKeyboardShortcutsEffect;