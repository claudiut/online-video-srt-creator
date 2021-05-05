import { Observable } from 'rxjs';
import YTPlayer from 'yt-player';
import { createVideoPlayerCurrentTimeObservable } from '../helper';

import IVideoPlayer from './IVideoPlayer';

const parseYoutubeIdFromUrl = (url: string): string => {
  const match: RegExpMatchArray | null = url.match(/v=(\S+)/);
  return match && match[1] ? match[1] : '';
}

export default class YouTubePlayer implements IVideoPlayer {
  public currentTime$: Observable<number>;

  private player: YTPlayer;

  constructor(player: YTPlayer, url: string) {
    this.player = player;

    const videoId = parseYoutubeIdFromUrl(url);
    if (videoId) {
      this.player.load(videoId);
    }

    this.currentTime$ = createVideoPlayerCurrentTimeObservable(this);
  }

  isPlaying() {
    return this.player.getState() === 'playing';
  }

  togglePlay() {
    this.isPlaying() ? this.player.pause() : this.player.play();
  }

  seekPrevious() {
    this.player.seek(this.player.getCurrentTime() - 5);
  }

  seekNext() {
    this.player.seek(this.player.getCurrentTime() + 5);
  }

  setCurrentTime(time: number) {
    if (this.player.getState() !== 'cued') {
      this.player.seek(time);
      return;
    }

    // If the video has not been started yet but we seek, start it (to load), pause it and then seek
    // otherise it will not seek
    const subscription = this.currentTime$.subscribe((currentTime) => {
      if (currentTime > 0) {
        this.player.pause();
        subscription.unsubscribe();
        this.player.seek(time);
      }
    });
    this.player.play();
  }

  getCurrentTime(): number {
    return this.player.getCurrentTime();
  }

  dispose() {
    this.player.destroy();
  }
}