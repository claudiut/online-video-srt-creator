import React from 'react';
import IVideoPlayer from '../services/VideoPlayer/IVideoPlayer';

export default React.createContext<IVideoPlayer | null>(null);