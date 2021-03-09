import React, { memo, useEffect } from 'react';
import YTPlayer from 'yt-player';
import { setPlayer } from '../AppState/Actions';

import YouTubePlayer from '../services/VideoPlayer/YoutubePlayer';

const containerId = 'video-player';

interface Props { url: string }

const VideoPlayer = ({ url }: Props) => {
    useEffect(() => {
        const playerInstance = new YouTubePlayer(new YTPlayer(`#${containerId}`), url);
        setPlayer(playerInstance);
    });
    
    return (
        <div id="player-wrapper">
            <div id={containerId}></div>
        </div>
    );
};

export default memo(VideoPlayer);