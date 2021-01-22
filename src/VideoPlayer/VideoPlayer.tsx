import React, { useEffect } from 'react';
import YTPlayer from 'yt-player';

import IVideoPlayer from '../services/VideoPlayer/IVideoPlayer';
import YouTubePlayer from '../services/VideoPlayer/YoutubePlayer';

type Props = {
    url: string;
    setPlayer: (player: IVideoPlayer) => void
}

const containerId = 'video-player';

const VideoPlayer = ({ url, setPlayer }: Props) => {
    useEffect(() => {
        setPlayer(new YouTubePlayer(new YTPlayer(`#${containerId}`), url));
    }, [url, setPlayer]);
    
    return <div id={containerId}></div>
};

export default VideoPlayer;