import React, { memo, useEffect } from 'react';
import YTPlayer from 'yt-player';
import { setPlayer } from '../AppState/Actions';
import useKeyboardShortcutsEffect from '../hooks/useKeyboardShortcutsEffect';

import YouTubePlayer from '../services/VideoPlayer/YoutubePlayer';

const containerId = 'video-player';

interface Props { url: string }

const VideoPlayer = ({ url }: Props) => {
    useKeyboardShortcutsEffect();

    useEffect(() => {
        if (!url) {
            setPlayer(undefined);
            return;
        }

        const playerInstance = new YouTubePlayer(new YTPlayer(`#${containerId}`), url);
        setPlayer(playerInstance);

        return () => {
            playerInstance.dispose();
        }
    }, [url]);

    return (
        <div id="player-wrapper">
            <div id={containerId}></div>
        </div>
    );
};

export default memo(VideoPlayer);