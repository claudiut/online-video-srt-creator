import React, { useState } from "react";
import { setTranslations } from "../AppState/Actions";
import { splitLines, splitParagraphs, SPLIT_CONTENT_TYPES } from "../services/helper";
import TranslationLine from "../services/Translation/TranslationLine";

import TranslationLineSerializer from "../services/Translation/TranslationLineSerializer";
import TranslationForm from "./TranslationForm";

interface Props {
    translations: TranslationLine[],
}

const addTranslation = (content: string, splitType: string, translations: TranslationLine[]) => {
    content = content.trim();

    if (splitType === SPLIT_CONTENT_TYPES.NONE) {
        setTranslations([...translations, new TranslationLine(content)])
        return;
    }

    const splitFn = splitType === SPLIT_CONTENT_TYPES.LINE ? splitLines : splitParagraphs;

    const trs = splitFn(content).map((trContent) => new TranslationLine(trContent));
    setTranslations([...translations, ...trs]);
};

const TranslationFooter = ({ translations }: Props) => {
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const handleClickAddTranslation = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSave = (content: string, splitType: string) => {
        addTranslation(content, splitType, translations);
        setShowAddForm(false);
    };

    const handleDownload = () => {
        const elem = document.createElement('a');
        const srt = TranslationLineSerializer.toSrt(translations);
        elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(srt));
        const filename = `${translations[0].getContent().split('\n')[0]}.srt`;
        elem.setAttribute('download', filename);
        elem.style.display = 'none';
        document.body.appendChild(elem);

        elem.click();
        document.body.removeChild(elem);
    }

    return (
        <div>
            {showAddForm && (
                <TranslationForm
                    onSave={handleSave}
                    onCancel={() => setShowAddForm(false)}
                />
            )}
            <div>
                <button
                    onClick={handleClickAddTranslation}
                    style={{visibility: showAddForm ? 'hidden' : 'visible'}}
                >
                    Add Translation
                </button>
            </div>
            <div className="pa3">
                <div>Help</div>
                <ol>
                    <li>Press Space to play/pause the video and left/right arrow to jump back/forward</li>
                    <li>Press Enter to set the start/end time of translation to current video position</li>
                </ol>
            </div>
            <div className="tc">
                {translations.length > 0 && <button onClick={handleDownload}>Download<br />⬇</button>}
            </div>
        </div>
    )
};

export default TranslationFooter;