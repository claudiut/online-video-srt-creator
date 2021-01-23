import React, { ChangeEvent, useState } from 'react';

import './App.scss';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import IVideoPlayer from './services/VideoPlayer/IVideoPlayer';
import Translations from './Translations/Translations';
import TranslationPreview from './TranslationPreview';
import TranslationLine from './services/Translation/TranslationLine';
import { splitLines, splitParagraphs, SPLIT_CONTENT_TYPES } from './services/helper';
import useKeyboardShortcutsEffect from './hooks/useKeyboardShortcutsEffect';
import usePersistentStorageEffect from './hooks/usePersistentStorageEffect';

// TODO: use DI to be able to easily mock services
function App() {
    const [player, setPlayer] = useState<IVideoPlayer | null>(null);
    const [url, setUrl] = useState('');
    // TODO: avoid prop drilling for translations in Translations component;
    //       use streams for untimed translations, etc?
    const [translations, setTranslations] = useState<TranslationLine[]>([]);
    useKeyboardShortcutsEffect(player, translations, setTranslations);
    usePersistentStorageEffect(url, translations, setTranslations);

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (player) {
            player.dispose();
        }
        const newUrl = (event.target.value || '').trim();
        setUrl(newUrl);
    }

    const handleCreateTranslation = (content: string, splitType: string) => {
        if (splitType === SPLIT_CONTENT_TYPES.NONE) {
            setTranslations([...translations, new TranslationLine(content)]);
            return;
        }

        const splitFn = splitType === SPLIT_CONTENT_TYPES.LINE ? splitLines : splitParagraphs;

        const trs = splitFn(content).map((trContent) => new TranslationLine(trContent));
        setTranslations([...translations, ...trs]);
    };

    const handleRemoveTranslation = (t: TranslationLine) => {
        setTranslations(translations.filter(tr => tr !== t));
    };

    const handleUpdateTranslation = (t: TranslationLine) => {
        setTranslations(translations.map(tr => tr === t ? t : tr));
    };

    return (
        <div className="flex justify-center">
            <div className="w-70">
                <div>
                    <input type="text" placeholder="Video URL" className="w-100" onChange={handleUrlChange} />
                </div>
                <div className="flex">
                    {
                        url
                        ?  <div>
                                <VideoPlayer url={url} setPlayer={setPlayer} />
                                <TranslationPreview player={player} translations={translations} />
                        </div>
                        : <div className="flex justify-center items-center tc pa2">
                            Please enter a video URL in the text field above
                        </div>
                    }
                    <div className="w-100 pa2">
                        <Translations
                            translations={translations}
                            onAddTranslation={handleCreateTranslation}
                            onRemoveTranslation={handleRemoveTranslation}
                            onUpdateTranslation={handleUpdateTranslation}
                        />
                    </div>
                </div>
            </div>
        </div>
  );
}

export default App;
