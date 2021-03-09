import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { getLatestTranslationForTime } from '../services/helper';

import TranslationLine from "../services/Translation/TranslationLine";
import IVideoPlayer from "../services/VideoPlayer/IVideoPlayer";

export const url$ = new BehaviorSubject<string>('');

export const player$ = new BehaviorSubject<IVideoPlayer|undefined>(undefined);

export const translations$ = new BehaviorSubject<TranslationLine[]>([]);

export const currentTime$: Observable<number|undefined> = player$.pipe(
  map(player => player ? player.currentTime$ : of(undefined)),
).pipe(mergeAll());

export const previewedTranslation$: Observable<TranslationLine|undefined> = (
  combineLatest([translations$, currentTime$]).pipe(
    map(([translations, currentTime]) => currentTime
      ? getLatestTranslationForTime(translations, currentTime)
      : undefined
    ),
  )
);
