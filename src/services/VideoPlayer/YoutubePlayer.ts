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

  play() {
    this.player.play();
  }

  isPlaying() {
    return this.player.getState() === 'playing';
  }

  pause() {
    this.player.pause()
  }

  getCurrentTime(): number {
    return this.player.getCurrentTime();
  }

  dispose() {
    this.player.destroy();
  }
}