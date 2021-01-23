import React, { useEffect, useRef, useState } from "react";
import TranslationLine from "../services/Translation/TranslationLine";
import TranslationLineSerializer from "../services/Translation/TranslationLineSerializer";
import TranslationForm from "./TranslationForm";
import TranslationList from "./TranslationList";

type Props = {
    translations: TranslationLine[];
    onAddTranslation: (content: string, splitType: string) => void;
    onRemoveTranslation: (t: TranslationLine) => void;
    onUpdateTranslation: (t: TranslationLine) => void;
}

const Translations = ({ translations, onAddTranslation, onRemoveTranslation, onUpdateTranslation }: Props) => {
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const addInputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => addInputRef.current?.focus(), [showAddForm, translations]);

    const handleClickAddTranslation = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSave = (content: string, splitType: string) => {
        onAddTranslation(content, splitType);
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
            <TranslationList
                translations={translations}
                onRemove={onRemoveTranslation}
                onUpdate={onUpdateTranslation}
            />
            {showAddForm && (
                <TranslationForm
                    onSave={handleSave}
                    onCancel={() => setShowAddForm(false)}
                    ref={addInputRef}
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
            <div>
                {translations.length > 0 && <button onClick={handleDownload}>DOWNLOAD</button>}
            </div>
        </div>
    )
};

export default Translations;