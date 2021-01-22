import { Observable } from "rxjs";

export default interface IVideoPlayer {
  currentTime$: Observable<number>;
  play: () => void;
  isPlaying: () => boolean
  pause: () => void;
  getCurrentTime: () => number;
  dispose: () => void;
}