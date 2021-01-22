import React, { useEffect, useRef, useState } from "react";
import TranslationLine from "../services/Translation/TranslationLine";
import TranslationForm from "./TranslationForm";
import TranslationList from "./TranslationList";

type Props = {
    translations: TranslationLine[];
    onAddTranslation: (content: string, multiple?: boolean) => void;
}

const Translations = ({ translations, onAddTranslation }: Props) => {
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const addInputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => addInputRef.current?.focus(), [showAddForm, translations]);

    const handleClickAddTranslation = () => {
        setShowAddForm(!showAddForm);
    };

    return (
        <div>
            <TranslationList translations={translations} />
            {showAddForm && (
                <TranslationForm
                    onSave={onAddTranslation}
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
                    <li>Press Space to play/pause the video</li>
                    <li>Press Enter to set the start/end time of translation to current video position</li>
                </ol>
            </div>
        </div>
    )
};

export default Translations;