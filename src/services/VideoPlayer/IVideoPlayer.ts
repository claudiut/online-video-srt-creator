export default interface IVideoPlayer {
  play: () => void;
  pause: () => void;
  getCurrentTime: () => number;
  onTimeUpdate: (currentTimeCallback: (currentTime: number) => void) => void;
  dispose: () => void;
}