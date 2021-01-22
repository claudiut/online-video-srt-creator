import YTPlayer from 'yt-player';

import IVideoPlayer from './IVideoPlayer';

const parseYoutubeIdFromUrl = (url: string): string => {
  const match: RegExpMatchArray | null = url.match(/v=(\S+)/);
  return match && match[1] ? match[1] : '';
}

export default class YouTubePlayer implements IVideoPlayer {
  private player: YTPlayer;

  constructor(player: YTPlayer, url: string) {
    this.player = player;

    const videoId = parseYoutubeIdFromUrl(url);
    if (videoId) {
      this.player.load(videoId);
    }
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause()
  }

  getCurrentTime(): number {
    return this.player.getCurrentTime();
  }

  // TODO: subscribe to stream
  onTimeUpdate(currentTimeCallback: (currentTime: number) => void): void {
    
  }

  // TODO and unsub ALL from stream
  dispose() {
    this.player.destroy();
  }
}