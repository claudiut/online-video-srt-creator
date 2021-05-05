import { Observable } from "rxjs";

export default interface IVideoPlayer {
  currentTime$: Observable<number>;
  isPlaying: () => boolean
  togglePlay: () => void;
  seekPrevious: () => void;
  seekNext: () => void;
  getCurrentTime: () => number;
  setCurrentTime: (time: number) => void;
  dispose: () => void;
}