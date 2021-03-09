import React, { useState } from 'react';

import './App.scss';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import Translations from './Translations/Translations';
import TranslationPreview from './TranslationPreview';
import useKeyboardShortcutsEffect from './hooks/useKeyboardShortcutsEffect';
import { previewedTranslation$, url$ } from './AppState/Observables';
import Subscribe from './Subscribe';
import { setUrl } from './AppState/Actions';

// TODO: use DI to be able to easily mock services
function App() {
    useKeyboardShortcutsEffect();

    return (
        <div className="flex justify-center h-100">
            <div className="w-100 w-70-m flex flex-column">
                <div>
                    <input
                        type="text"
                        placeholder="Video URL"
                        className="w-100"
                        onChange={(e) => setUrl((e.target.value || '').trim()) }
                    />
                </div>
                <div className="flex h-100">
                    <Subscribe observable$={url$}>
                        {(url) => {
                            if (!url) {
                                return (
                                    <div className="flex justify-center items-center tc pa2">
                                        Please enter a video URL in the text field above
                                    </div>
                                );
                            }

                            return (
                                <div>
                                    <VideoPlayer url={url} />
                                    <Subscribe observable$={previewedTranslation$}>
                                        {(previewedTr) => 
                                            previewedTr && <TranslationPreview previewedTranslation={previewedTr} />
                                        }
                                    </Subscribe>
                                </div>
                            );
                    }}
                    </Subscribe>
                    <Translations />
                </div>
            </div>
        </div>
  );
}

export default App;
