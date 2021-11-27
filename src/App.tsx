import { useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom'

import './App.scss';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import Translations from './Translations/Translations';
import TranslationPreview from './TranslationPreview';
import { url$ } from './AppState/Observables';
import UrlInput from './component/UrlInput';
import { setUrl } from './AppState/Actions';
import useObservedValue from './hooks/useObservedValue';

const App = () => {
    // first time init from url param
    const [searchParams] = useSearchParams();
    const urlParam = searchParams.get('url') ?? '';
    useEffect(() => {
        setUrl(urlParam)
    }, [urlParam])

    const url = useObservedValue(url$);

    const RouteElement = (
        <div className="h-100 w-100 w-70-m flex flex-column">
            <div className="mb2">
                <UrlInput url={url} />
            </div>
            <div className="flex h-100 flex-auto mx2">
                {url && (
                    <div className="mr2">
                        <VideoPlayer url={url} />
                        <TranslationPreview />
                    </div>
                )}
                <Translations />
            </div>
        </div>
    );

    return (
        <Routes>
            <Route path="*" element={RouteElement} />
        </Routes>
    );
};

export default App;
