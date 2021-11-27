import React, { memo, useEffect, useState } from 'react';
import YTPlayer from 'yt-player';

import { setPlayer } from '../AppState/Actions';
import useKeyboardShortcutsEffect from '../hooks/useKeyboardShortcutsEffect';
import IVideoPlayer from '../services/VideoPlayer/IVideoPlayer';

import YouTubePlayer from '../services/VideoPlayer/YoutubePlayer';

const containerId = 'video-player';

interface Props { url: string }

const VideoPlayer = ({ url }: Props) => {
    useKeyboardShortcutsEffect();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!url) {
            setPlayer(undefined);
            return;
        }

        let playerInstance: IVideoPlayer;
        try {
            playerInstance = new YouTubePlayer(new YTPlayer(`#${containerId}`), url);
            setPlayer(playerInstance);
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log('Player error:', e);
                setError('Error while loading video. Internet connection issue?');
            }
        }


        return () => {
            if (playerInstance) {
                playerInstance.dispose();
            }
        }
    }, [url]);

    return (
        <div id="player-wrapper">
            <div id={containerId}>
                {error ? <i>{error}</i> : <div className="tc pa4">Loading video...</div>}
            </div>
        </div>
    );
};

export default memo(VideoPlayer);