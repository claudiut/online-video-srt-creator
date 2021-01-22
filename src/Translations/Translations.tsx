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
        </div>
    )
};

export default Translations;