import React, { ChangeEvent, useState } from 'react';

import './App.scss';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoPlayerContext from './VideoPlayer/VideoPlayerContext';
import IVideoPlayer from './services/VideoPlayer/IVideoPlayer';
import Translations from './Translations/Translations';
import TranslationPreview from './TranslationPreview';
import TranslationLine from './services/Translation/TranslationLine';
import { splitMultipleLines } from './services/helper';

function App() {
    const [player, setPlayer] = useState<IVideoPlayer | null>(null);
    const [url, setUrl] = useState('');
    // TODO: avoid prop drilling for translations in Translations component
    const [translations, setTranslations] = useState<TranslationLine[]>([]);

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (player) {
            player.dispose();
        }
        setUrl(event.target.value);
    }

    const handleAddTranslation = (content: string, multiple = false) => {
        if (multiple) {
            const trs = splitMultipleLines(content).map(
                (line) => new TranslationLine(line)
            );
            setTranslations([...translations, ...trs]);
            return;
        }
        setTranslations([...translations, new TranslationLine(content)]);
    };

    return (
        <div className="flex justify-center">
            <div className="w-70">
                <div>
                    <input type="text" placeholder="Video URL" className="w-100" onChange={handleUrlChange} />
                </div>
                <div className="flex">
                    <div className="w-50">
                        {url && <VideoPlayer url={url} setPlayer={setPlayer} />}
                        <TranslationPreview player={player} translations={translations} />
                    </div>
                    <div className="w-50">
                        <VideoPlayerContext.Provider value={player}>
                            <Translations translations={translations} onAddTranslation={handleAddTranslation} />
                        </VideoPlayerContext.Provider>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default App;
